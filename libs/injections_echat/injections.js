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