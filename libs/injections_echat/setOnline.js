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