function sendSetLanguage(language){
	window.postMessage({type: 'setLanguage',language:language},"*");
}