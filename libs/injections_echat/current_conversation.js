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