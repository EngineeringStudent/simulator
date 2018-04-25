function replaceGetMessagesHtml() {
    var divId = 0;
    com.echat.shared.messages.Utils.getMessageHtml = function(message) {
        var userUuid = message.userUuid;
        var username = message.username;
        var avatarUrl = com.echat.shared.GlobalUtils.getAvatarUrl(userUuid);
        var messageBody = message.messageBody;
        var timestamp = message.timestamp;

        var populatedMessageBody = com.echat.shared.emoticons.Controller.parseEmotinconsFromPatterns(messageBody);
        var populatedMessageBody = com.echat.shared.emoticons.Controller.parseEmotinconsFromPatterns(messageBody);

        var selfClassWrapperStyle = userUuid === com.echat.shared.context.Account.UserContext.userUuid ?
            'echat-shared-chat-message-wrapper-self' : '';

        var onClickString = 'com.echat.shared.popup.user.Controller.openMessagePopup(event, this,\'' +
            userUuid +
            '\');';

        var isModerator = message.isModerator;
        var moderatorIconHtml = isModerator === true ?
            '<img class="echat-shared-chat-moderator-icon" src="/Resources/Icons/Misc/ModeratorStar.png"/>' : '';

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
        var messageHtml = '<div class="echat-shared-chat-message-wrapper ' +
            selfClassWrapperStyle +
            '">' +
            '<img class="echat-shared-chat-message-avatar" src="' +
            avatarUrl +
            '" onclick="' +
            onClickString +
            '"/>' +
            '<div class="echat-shared-chat-message-top-wrapper">' +
            '<div class="echat-shared-chat-message-username" onclick="' +
            onClickString +
            '">' +
            username +
            '</div>' +
            moderatorIconHtml +
            '<div class="echat-shared-chat-message-time">' +
            timeText +
            '</div>' +
            '</div>' +
            '<div class="echat-shared-chat-message-body">' +
            populatedMessageBody +
            "<div id='" + divId + "'style='box-sizing:border-box;border:1px solid black;float:right;position:static;height:26px;width:auto;'><img style='height:100%;' src='" + imageJudge + "'></img></div>" +
            '</div>' +
            '</div>';
			new (function(divId, userinfo) {
				new Task(function() {
					var div = document.getElementById(divId);
					new HoverAndClick(div, function() {
							div.style.border = '2px solid black';
						}, function() {
							div.style.border = '1px solid black';
						},
						function() {

                    window.postMessage({
                        type: 'showMenuJudge',
                        data:userinfo,
						divId:divId
                    }, "*");
						});
				}).run();
			})(divId, {
				userUuid: message.userUuid,
				username: message.username,
				avatarUrl: com.echat.shared.GlobalUtils.getAvatarUrl(userUuid),
				messageBody: message.messageBody
			});
        divId++;
        return messageHtml;
    };
}