
function Iterator(array)
{
    var index=0;
    var length=array.length;
    this.next=function()
    {
        var next=array[index];
        index++;
        return next;
    };
    this.hasNext=function()
    {
      return index<length;
    };
    this.remove=function()
    {
        array.splice(index-1, 1);
        index--;
        length--;
    };
}

var Cursors={grab:'url('+window.thePageUrl+'cursors/hand_move_grab.png)11 0, auto', hand:'url('+window.thePageUrl+'cursors/hand_move_no_grab.png)14 0, auto', pointer:'pointer'};

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "\\&quot;")
         .replace(/'/g, "\\&#039;");
 }

function decodeHTMLEntities (str) {
    if(str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');var element = document.createElement('div');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }

    return str;
  }

function addStyle(str){
	var s =document.createElement('style');
	s.innerHTML=str;
	document.body.appendChild(s);
}


	function Timer(funct, delayMs, times)
{
    var self = this;
    var timesCount = 0;
    if (times == undefined)
    {
        times = -1;
    }
    if (delayMs == undefined)
    {
        delayMs = 10;
    }
    function tick()
    {
        if (times >= 0)
        {
            timesCount++;
            if (timesCount >= times)
            {
                self.stop();
            }
        }
        try
        {
            funct();
        }
        catch (ex)
        {
            console.log(ex);
        }
    }
        var interval;
        function setInterval()
        {
            interval = window.setInterval(tick, delayMs);
        }
        function cancelInterval()
        {
            if (interval)
            {
                clearInterval(interval);
            }
        }
        this.stop = function ()
        {
            cancelInterval();
        };
        this.reset = function ()
        {
            timesCount = 0;
            cancelInterval();
            setInterval();
        };
		this.setDelay=function(delay)
		{
			self.stop();
			delayMs = delay;
			self.reset();
		};
    setInterval();
}


function Settings(settingsName, callbackReset)
{
	if(!Settings.instances)
		Settings.instances=[];
    this.get = function (name)
    {
        try
        {
			return JSON.parse(localStorage.getItem(settingsName + '_' + name));
		}
		catch(ex)
		{
			return undefined;
		}
    };
    this.set = function (name, obj)
    {
        try
        {
        localStorage.setItem(settingsName + '_' + name, JSON.stringify(obj));
		}
	   catch(ex)
	   {
		   console.log(ex);
	   }
    };
    this.remove = function (name)
    {
        try
        {
			localStorage.removeItem(settingsName + '_' + name);
		}
		catch(ex)
		{
		    console.log(ex);
		}
    };
    this.reset=callbackReset;
    Settings.instances.push(this);
}
Settings.getAll=function(){
    return localStorage;
};
Settings.addRange=function(obj)
{
    for(var key in obj)
    {
        localStorage.setItem(key, JSON.stringify(obj[key]));
    }
};
Settings.resetAll = function ()
{
    
};


 function Task(callback, done)
{
        this.run = function (c)
        {
    setTimeout(function() {
        try
        {
        callback();
        }catch(ex)
        {
         console.log(ex);
        }
                    if(done)
                    {
                        try
                        {
                     done();       
                        }
                        catch(ex)
                        {
         console.log(ex);
                        }
                    }
                    if(c)
                    {
                        try
                        {
                     c();       
                        }
                        catch(ex)
                        {
         console.log(ex);
                        }
                    }
    }, 0);

       };
}

function CurrentConversation(){
var oldOpenConversation = com.echat.shared.conversation.Controller.openConversation;
com.echat.shared.conversation.Controller.openConversation=function(userUuid){
oldOpenConversation(userUuid);
self.currentUserUuid = userUuid;
};
var oldFocusChatroom = com.echat.shared.chatroom.Controller.focusChatroom;
com.echat.shared.chatroom.Controller.focusChatroom=function(){
	self.currentUserUuid = undefined;
	oldFocusChatroom();
};
this.sendMessage = function(messageBody){
if(self.currentUserUuid)
{
		com.echat.shared.cometd.stream.outgoing.conversation.Controller.sendConversationMessage(self.currentUserUuid, messageBody);
}
else
{
	com.echat.shared.cometd.stream.outgoing.Chatrooms.sendMessage(messageBody);
}
};
this.getConversationUserUuid=function(){return self.currentUserUuid;};

this.appendMessageHtml=function(messageHtml, userUuid){
	if(!self.currentUserUuid)
	{
		if(com.echat.widget)
        {
            if(com.echat.widget.column)
            {
                com.echat.widget.column.display.Chatroom.displayMessage(messageHtml);
            }
            else if(com.echat.widget.full)
            {
                com.echat.widget.full.display.Chatroom.displayMessage(messageHtml);
            }
		}
		else
		{
				com.echat.website.display.Chatroom.displayMessage(messageHtml);
		}
	}
	else
	{
		var isUserTheSender = userUuid === com.echat.shared.context.Account.UserContext.userUuid;
		com.echat.shared.display.Conversation.displayConversationMessage(self.currentUserUuid,
		messageHtml, isUserTheSender);
	}
};
}


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Hover(element, callbackEnter, callbackLeave)
{
    var previousStyle;
    
    element.addEventListener('mouseenter', function(e){
        
                            if (!e) var e = window.event;
                             callbackEnter(e);
                        });
    element.addEventListener('mouseleave', function(e){
        
                            if (!e) var e = window.event;
                            if(callbackLeave){callbackLeave(e);}
                        });
}
function HoverAndClick(element, callbackEnter, callbackLeave, callbackMousedown, callbackMouseUp)
{
    var previousStyle;
    element.addEventListener('mouseenter', function(e){
        
                            if (!e) var e = window.event;
                            enter(e);
                        });
    element.addEventListener('mouseleave', function(e){
        
                            if (!e) var e = window.event;
                            leave(e);
                        });
    element.addEventListener('mousedown', function(e){
        
                            if (!e) var e = window.event;
                            if(callbackMousedown){leave(e);callbackMousedown(e);enter(e);}
                        });
    element.addEventListener('mouseup', function(e){
        
                            if (!e) var e = window.event;
                            if(callbackMouseUp){callbackMouseUp(e);}
                        });
    function enter(e)

    {
        previousStyle=element.style.cssText; if(callbackEnter)callbackEnter(e);
    }
    function leave(e)
    {
    element.style.cssText=previousStyle; if(callbackLeave){callbackLeave(e);}
    }
}

function AudioPlayer(){
this.play = function(url){
	try{
	new Audio(url).play();
	}
	catch(e){
		console.log(e);
	}
};
}

function UserInterface(){ 

}

function unmaskPm(){
	var classes = ['ConversationPermissionCenteredLayer', 'ConversationPermissionLayerBlackBackground'];
	for(var i=0; i<classes.length; i++){
		var c=classes[i];
		console.log(i);
		var elements = document.getElementsByClassName(c);
		while(elements.length>0)
		{
			var e = elements[0];
			console.log(e);
			e.parentNode.removeChild(e);
		}
	}
}

function replaceAll(str, search, replacement) {
    return str.split(search).join(replacement);
};


	function loadUserInfo(username, callback){
		
		$.ajax({
			url:'http://e-chat.co/search/users',
			type : 'POST',	
			data : {
				targetUsername : username
			},
			success : function(msg) {
				try {
					console.log(msg);
					var searchResultArray = $.parseJSON(msg);
					if (searchResultArray.length > 0) {
						for(var i=0; i<searchResultArray.length; i++){
							var jObject=searchResultArray[i].data;
							console.log(jObject);
							var found=true;
							console.log();
							console.log(username);
							var other=decodeHTMLEntities(jObject.username);
							var found=true;
							if(other.length==username.length){
								for(var s=0; s<username.length; s++)
								{
									if(!(username[s]==other[s]  ||  other[s]=='?')){
										found=false;
										break;
									}
								}
								if(found)
								{
									console.log('found');
									jObject.username = username;
									callback(jObject);
									return;
								}
							}
						}
					}
					console.log('could not get data for username: '+username);
				} catch (ex) {
					console.log('search failed for username: '+username);
					console.log(ex.stack);
				}
				callback();
			},
			error : function(msg) {
				console.log('search failed for username: '+username);
				callback();
			},
			complete : function(msg) {
				callback();
			}
		});
	}

function setOnline(username){
	var elements = document.getElementsByClassName('PrivateTab');
	for(var i=0;i<elements.length; i++){
		var element = elements[i];
		var usernames = element.getElementsByClassName('TabUsername');
		if(usernames.length>0)
		{
			var elementUsername = usernames[0];
			
			if(elementUsername.innerHTML==username)
			{
				var elementOnline=element.getElementsByClassName('TabOnlineIcon')[0];
				elementOnline.src='/Resources/Icons/Misc/UserOnline.png'; 
			}
		}
	}
}

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

function menuInjections() {
    var script = document.createElement('script');
	function _MenuInjections(){
		console.log('a');
            window.addEventListener("message", function(event) {
                if (event.source != window)
                    return;
				var message=event.data;
				switch(message.type){
					case 'iconUrls':
					iconUrls = message.iconUrls;
					break;
				}
            }, false);
			
			
			$.cometd.addListener('/service/user/context/self/complete',
				function(cometdMessage){
					console.log(cometdMessage.data.chatroomContext.data);
			});
			$.cometd.addListener('/chatroom/user/joined/*', function(cometdMessage){
				var a = cometdMessage.data;
				simulatedUsers.set(a.userUuid, a.username);
			});
			com.echat.website.display.Utils.getUsersListRecordHtml = function(userContext)
			{
				var userUuid = userContext.userUuid;
				var username = userContext.username;
				var avatar = com.echat.shared.GlobalUtils.getAvatarUrl(userUuid);

				var onlineIconSrc = userContext.isOnline === true||simulatedUsers.isBeingSimulated(userUuid) ? '/Resources/Icons/Misc/UserOnline.png'
					: '/Resources/Icons/Misc/UserOffline.png';

				var extraCssStyle = userUuid === com.echat.shared.context.Account.UserContext.userUuid
					? 'UsersListUserWrapperSelf' : '';

				var isModerator = userContext.isModerator;
				var moderatorIconHtml = isModerator === true
					? '<img class="UsersListStarIcon" src="/Resources/Icons/Misc/ModeratorStar.png"/>' : '';

				var onClickScriptString = 'com.echat.shared.popup.user.Controller.openUserPopup(event, this, \''
					+ userUuid
					+ '\');';

				var userRecordHtml = '<div class="UsersListUserWrapper '
					+ extraCssStyle
					+ '" onclick="'
					+ onClickScriptString
					+ '">'
					+ '<img class="UsersListAvatar" src="'
					+ avatar
					+ '" alt=""/>'
					+ '<div class="UsersListUsername">'
					+ username
					+ '</div>'
					+ '<img class="UsersListOnlineIcon" src="'
					+ onlineIconSrc
					+ '"/>'
					+ moderatorIconHtml
					+ '</div>';

				return userRecordHtml;
			};
			var messageUniqueId=0;
			com.echat.shared.messages.Utils.getMessageHtml=function(message, simulated)
			{
				var uniqueIdString="to_append_"+String(messageUniqueId++);
				message.uniqueId=uniqueIdString;
				var userUuid = message.userUuid;
				console.log(message);
				console.log(simulated);
				var username = message.username;
				if((!simulated)&&simulatedUsers.isBeingSimulated(username)) return;
				var avatarUrl = com.echat.shared.GlobalUtils.getAvatarUrl(userUuid);
				var messageBody = simulated?com.echat.shared.emoticons.Controller.parseToCommonPatterns(message.messageBody):message.messageBody;
				var timestamp = new Date();
//addNewMessageToConversation

				var populatedMessageBody = com.echat.shared.emoticons.Controller.parseEmotinconsFromPatterns(messageBody);
				var selfClassWrapperStyle = userUuid === com.echat.shared.context.Account.UserContext.userUuid
					? 'echat-shared-chat-message-wrapper-self' : '';

				var onClickString = 'com.echat.shared.popup.user.Controller.openMessagePopup(event, this,\''
					+ userUuid
					+ '\');';

				var isModerator = message.isModerator;
				var moderatorIconHtml = isModerator === true
					? '<img class="echat-shared-chat-moderator-icon" src="/Resources/Icons/Misc/ModeratorStar.png"/>' : '';

				var date = new Date(timestamp);
				var hours = date.getHours();
				var minutes = date.getMinutes();

				var minutesText = minutes.toString();
				if (minutes < 10)
					minutesText = '0' + minutes;

				var hoursText = hours.toString();
				if (hours < 10)
					hoursText = '0' + hours;

				var timePrependString = com.echat.shared.messages.Utils.getMessageTime(timestamp);
				var timeText = '(' + timePrependString + hoursText + ':' + minutesText + ')';

				var messageHtml = '<div class="echat-shared-chat-message-wrapper '
					+ selfClassWrapperStyle
					+ '", id="'+uniqueIdString+'">'
					+ '<img class="echat-shared-chat-message-avatar" src="'
					+ avatarUrl
					+ '" onclick="'
					+ onClickString
					+ '"/>'
					+ '<div class="echat-shared-chat-message-top-wrapper">'
					+ '<div class="echat-shared-chat-message-username" onclick="'
					+ onClickString
					+ '">'
					+ username
					+ '</div>'
					+ moderatorIconHtml
					+ '<div class="echat-shared-chat-message-time">'
					+ timeText
					+ '</div>'
					+ '</div>'
					+ '<div class="echat-shared-chat-message-body">'
					+ populatedMessageBody
					+ '</div>'
					+ '</div>';

				return messageHtml;
			};
			       
    com.echat.shared.chatroom.Controller.getUsersList= function()
    {
        return $.extend(simulatedUsers.getUsersObj(), com.echat.shared.chatroom.Controller.getChatroomContext().users);
    };
	/*function changeUsername(name, captcha)
	{
		var url = '/authentication/guest';
		var params =
			{
				u: name,
				g: captcha 
			};
		$.ajax(
		{
			url: url,
			method: 'POST',
			data: params,
			success: function(jsonReply)
			{
				var reply = JSON.parse(jsonReply);		
				console.log(reply);
			},
			complete: function()
			{
				streamOpened = true;
				if (!reloading)
				{
					grecaptcha.reset();
				}
			},
			error: displayGenericError
		});
	}
	}*/
}
console.log('injecting injecting');
	var strs =[String(Iterator),
	'var Cursors = '+JSON.stringify(Cursors)+';',
	String(escapeHtml),
	String(decodeHTMLEntities),
	String(addStyle), 
	String(Timer),
	String(Settings),
	String(Task),
	String(CurrentConversation),
	String(HoverAndClick),
	String(AudioPlayer),
	String(UserInterface),
	String(unmaskPm),
	String(replaceAll),
	String(loadUserInfo),
	String(setOnline),          
	String(SimulatedUsers),
	String.raw`var iconUrls={};
	var currentConversation = new CurrentConversation(); var simulatedUsers = new SimulatedUsers (currentConversation);`,
	String(_MenuInjections),
    String.raw`_MenuInjections();`];
	var str = '';
	for(var i=0; i<strs.length; i++){
		str+=strs[i];
	}
    script.innerHTML = str;
    document.body.appendChild(script);

}

console.log("injecting into echat");

		
window.addEventListener("message", function(event) {
	if (event.source != window)
	return;
	var message = event.data;
	//console.log(message.type);
	switch(message.type){
		case 'joined':
			joined(message);
		break;
		}
	}, false);
function joined(jObject){
	console.log(jObject);
}
menuInjections();
