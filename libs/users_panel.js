function UsersPanel(callback){
	var self = this;
	var div = document.createElement('div');
	div.style.height='auto';
	div.style.maxHeight='100%';
	this.element = div;
	div.style.width='240px';
	div.style.float='left';
	div.style.overflowY='visible';
	div.style.overflowX='hidden';
	var mapUserUuidToEntry = {};
	this.refreshUsers=function(){
		var mapUser = com.echat.shared.chatroom.Controller.getUsersList();
		var users =[];
		for(var i in  mapUser)
			users.push(mapUser[i]);
		users.sort(com.echat.shared.display.Utils.usernameSort);
		for(var i in mapUserUuidToEntry)
		{
			if(!mapUser[i])
			{
				var entry = mapUserUuidToEntry[i];
				entry.dispose();
				delete mapUserUuidToEntry[i];
			}
		}
		for(var i=0; i<users.length; i++)
		{
			var user = users[i];
			if(!mapUserUuidToEntry[user.userUuid]){
				var uE = new UserEntry(user.username, callback);
				mapUserUuidToEntry[user.userUuid] = uE;
				var nextNode = div.childNodes[i+1];
				if(nextNode)
				div.insertBefore(uE.element,nextNode);
			else 
				div.appendChild(uE.element);
			}
		}
	};
	$.cometd.addListener('/service/user/context/self/complete',function(){
		new Task(function(){
			self.refreshUsers();
			self.refreshUsers();
			self.refreshUsers();
		}).run();
	});
}