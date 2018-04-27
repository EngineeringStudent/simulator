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

dissableFriendJoinedNotificationUrl:
var iconUrls = {down:chrome.extension.getURL('down.png')
, up:chrome.extension.getURL('up.png')
, remove:chrome.extension.getURL('remove.png')
};
window.postMessage({type:'iconUrls', iconUrls:iconUrls}, '*');