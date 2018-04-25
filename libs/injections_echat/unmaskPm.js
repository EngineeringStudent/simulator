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