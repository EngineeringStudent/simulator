function injectionsInterpret(message) {
    switch (message.type) {
        case 'sendMessage':
            com.echat.shared.cometd.stream.outgoing.Chatrooms.sendMessage(message.message);
            break;
        case 'addIgnore':

            $.cometd.publish('/service/ignored/add', {
                userUuid: message.userUuid,
                username: message.username
            });
            userData = com.echat.shared.context.Ignored.populateIgnoredContext({
                userUuid: message.userUuid,
                username: message.username
            });
            com.echat.shared.context.Ignored.IgnoredList[userData.userUuid] = userData;
            com.echat.shared.GlobalUtils.refreshInterface();
            com.echat.shared.popup.user.Controller.refreshPopupOptions(userData.userUuid);
            break;
        case 'removeIgnore':
            $.cometd.publish('/service/ignored/remove', {
                userUuid: message.userUuid
            });
            break;
        case 'signIn':
            com.echat.shared.authentication.Controller.sendAuthenticationRequest('/authentication/guest', message.username);
            console.log("done");
            break;
        case 'signOut':
            com.echat.shared.cometd.Connector.logOut();
            break;
        case 'setup':
            enableFriendJoinedNotificationUrl = message.obj.enableFriendJoinedNotificationUrl;
            dissableFriendJoinedNotificationUrl = message.obj.dissableFriendJoinedNotificationUrl;
            break;
        case 'getIgnoreList':
            window.postMessage({
                type: 'ignoreList',
                list: com.echat.shared.context.Ignored.IgnoredList
            }, "*");
            break;
        case 'getFriendList':
            window.postMessage({
                type: 'friendList',
                list: com.echat.shared.context.Friends.FriendsList
            }, "*");
            break;
        case 'getUsersList':
            window.postMessage({
                type: 'usersList',
                list: com.echat.shared.chatroom.Controller.getUsersList()
            }, "*");
            break;
        case 'closeNotification':
            var notification = notifications[message.tag];
            if (notification)
                notification.close();
            break;
        case 'createNotification':
            if (Notification.permission !== "granted") {
                Notification.requestPermission((new(function(title, obj, tag) {
                    this.create = function() {
                        createNotification(title, obj, tag);
                    };
                })(message.obj.title, message.obj, message.tag)).create);
            } else {
                createNotification(message.obj.title, message.obj, message.tag);
            }
            break;
        case 'friendsToNotifyMeWhenJoin':
            friendsToNotifyMeWhenJoin = message.friendsToNotifyMeWhenJoin;
            break;
        case 'openPm':
            com.echat.shared.conversation.Controller.openConversation(message.userUuid);
            window.parent.focus();
            window.focus(); //just in case, older browsers
            this.close();
            break;
        case 'blockSounds':
            blockSounds = message.blockSounds;
            break;
    }
}