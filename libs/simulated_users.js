function SimulatedUsers(currentConversation){ 
	var self = this;
	var usernames =[];
	var mapUserUuidToObj={};
	var settings = new Settings('SimulatedUsers');	
	this.isBeingSimulated=function(username){
		return usernames.indexOf(username)   >=  0;
	};
	var timerSimulate;
	this.getUsersObj=function(){
		return mapUserUuidToObj;
	};
	
	this.simulate=function(messages, startupDelay){ 
		unmaskPm();
		if(!startupDelay)
			startupDelay=10000;
		if(!check(messages))
			return;
		var missing = getMissing(messages);
		if(missing.length>0)
			loadAllMissingUsers(missing, function(successful){
				console.log('loading missing');
				if(successful)
				_simulate(messages, startupDelay);
			});
		else
			_simulate(messages, startupDelay);
	};
	
	function getMissing(messages)
	{
		var list = [];
		var iterator = new Iterator(messages);
		while(iterator.hasNext()){
			var username = iterator.next().username;
			var userObj = getUserObj(username);
			if(!userObj)
			{
				if(list.indexOf(username)<0)
					list.push(username);
			}
		}
		return list;
	}
	
	function loadAllMissingUsers(missingUsers, callback){
		var count=missingUsers.length;
		var nLoaded=0;
		var canceled=false;
		var iterator = new Iterator(missingUsers);
		while(iterator.hasNext())
		{
			var username = iterator.next();
			(function(username){
			loadUserInfo(username, function(r){
				if(canceled)return;
				if(!r)
				{
					canceled=true;
					callback(false);
					return;
				}
				nLoaded++;
				self.set(r.userUuid, decodeHTMLEntities(r.username));
				if(nLoaded>=count){
					callback(true);
				}
			});
			console.log(username);})(username);
		}
	}
	
	function getMapUserUuidToObj(messages){
		var obj = {};
		var iterator = new Iterator(messages);while(iterator.hasNext()){
			var message = iterator.next();
			var userObj = getUserObj(message.username);
			obj[userObj.userUuid]={userUuid:userObj.userUuid, username:message.username, isOnline:true, isGuest:true};
		}
		return obj;
	}
	
	function _simulate(messages, startupDelay){
		console.log('is simulating');				
		if(!check(messages, true))
			return;
		setAllOnline(messages);
		if(timerSimulate)
			timerSimulate.stop();
		usernames = getUsernames(messages);
		console.log(usernames);
		mapUserUuidToObj=getMapUserUuidToObj(messages);
		refreshUsers();
		var iterator = new Iterator(messages);
		timerSimulate = new Timer(function(){
			if(iterator.hasNext())
			{
				var message = iterator.next();
				
				simulateMessage(message.username, message.message);
				if(message.delay)
					timerSimulate.setDelay(message.delay
				);
			}
			else{
				usernames=[];
				mapUserUuidToObj={};
				timerSimulate.stop();
			}
		}, startupDelay, -1);
	}
	
	this.set=function(userUuid, username){
		var usernames =settings.get('usernames');
		if(!usernames)
			usernames=[];
		settings.set('username_'+username, {userUuid:userUuid, username:username});
		if(usernames.indexOf(username)<0)
			usernames.push(username);
		settings.set('usernames', usernames);
	};
	
	this.clearCache = function(){
		var usernames = settings.get('usernames');
		if(usernames)
		{
			var iterator = new Iterator(usernames);
			while(iterator.hasNext())
			{
				var username = iterator.next();
				settings.remove('username_'+username);
			}
		}
		settings.set('usernames', []);
	};
	
	this.printUsers=function(){
		var usernames = settings.get('usernames');
		if(!usernames){
			console.log('no usernames in settings');
			return;
		}
		var str="";
		var iterator = new Iterator(usernames);
		var first = true;
		while(iterator.hasNext())
		{
			var username = iterator.next();
			var userObj = getUserObj(username);
			if(userObj)
			{
				if(first)first=false; else str+=",";
				str+=JSON.stringify(userObj);
			}
		}
		console.log(str);
	};
	
	
	$.cometd.addListener('/service/user/context/self/complete',function(){
		new Task(function(){
			var users = com.echat.shared.chatroom.Controller.getUsersList();
			for(var i in users)
			{
				self.set(i, users[i].username);
			}
		}).run();
	});
	
	function refreshUsers(){
		
        com.echat.shared.display.Chatroom.refreshUsersList(com.echat.shared.chatroom.Controller.getUsersList());
	}
	
	function setAllOnline(messages)
	{
		var iterator = new Iterator(messages);
		while(iterator. hasNext()){
			var username = iterator.next().username;
			setOnline(username);
		}
	}
	
	function check(messages, checkUserObjExists){
		var nMessage=0;
		var iterator = new Iterator(messages);
		while(iterator.hasNext())
		{
			var message = iterator.next();
			var r = checkMessage(message, checkUserObjExists);
			if(r)
			{
					console.log("failed on message: "+nMessage+": "+r);
					console.log(message);
					return false;
			}
			nMessage++;
		}
		return true;
	}
	
	function checkMessage(message, checkUserObjExists){
		
			if(!message.username)return "No username specified";
			if(!message.message)return "No message";
			var userObj = getUserObj(message.username);
			if((!userObj)&&checkUserObjExists)return "The user \""+message.username+"\" is not in history";
		return;
	}
	
	function getUsernames(messages){
		var users=[];
		var iterator = new Iterator(messages);
		while(iterator.hasNext())
		{ 
			var message = iterator.next();
			if(users.indexOf(message.username)<0)
				users.push(message.username);
			
		}
		return users;
	}
	
	function getUserObj(username){
		return settings.get('username_'+username);
	}
	
	function getTimestamp(){
		return new Date();
	}
	
	function simulateMessage(username, message){
		var userObj = getUserObj(username);
		currentConversation.appendMessageHtml(com.echat.shared.messages.Utils.getMessageHtml({userUuid:userObj.userUuid, messageBody:message, timestamp:getTimestamp(), username:username}, true));
	}
}