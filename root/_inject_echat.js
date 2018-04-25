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