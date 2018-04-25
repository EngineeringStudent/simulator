function chromeTabOpened(callback){

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
	  if(tab.url)
	  {
		  callback(tabId, changeInfo, tab);
	  }
	  }
	  });
}

function chromeTabClosed(callback){
chrome.tabs.onRemoved.addListener(function(tabId, removed) {
callback(tabId, removed);});
}

function GoogleTranslatePage(){
//var iframe = document.createElement('iframe');
//iframe.setAttribute("src", 'https://translate.google.com');
//document.body.appendChild(iframe);
//console.log('GoogleTranslatePage');
var URL = 'https://translate.google.com';
var self = this;
chromeTabOpened(function(tabId, changeInfo, tab){
		  if(/(translate\.google\.)/.test(tab.url))
		  {
			  self.tabId=tabId;
			  console.log('iunjecting ');
			  chrome.tabs.executeScript(tab.id, {file: 'inject_google_translate.js'});
		  }
});
chromeTabClosed(function(tabId, removed) {
	if(self.tabId==tabId)
		window.open(URL);
});
		window.open(URL);
}

function chromeMessageListener(callback){
	chrome.runtime.onMessage.addListener(callback);
}

function isEchat(url){
return /(e-chat\.co)/.test(url)
}

////------------remove embedding preventation------------------------
//removeEmbeddingPreventation(['<all_urls>']);
////------------------------------------------------------------------

var googleTranslatePage = new GoogleTranslatePage();
var tabIdsEChat=[];
chromeMessageListener(function(request, sender){
	switch(request.type){
		
		
			case 'translate':
			case 'play':
		console.log(request);
			request.tabId = sender.tab.id;
					if(googleTranslatePage.tabId!=undefined)
						chrome.tabs.sendMessage(googleTranslatePage.tabId,request);
			break;
			case 'translated':
			        chrome.tabs.sendMessage(request.tabId, request);
			break;
		}
});
chromeTabOpened(function(tabId, changeInfo, tab){
		  console.log(tab.url);
		  if(isEchat(tab.url))
		  {
			  tabIdsEChat.push(tabId);
			  chrome.tabs.executeScript(tab.id, {file: 'inject_echat.js'});
		  }
});
chromeTabClosed(function(tabId, removed) {
	var index = tabIdsEChat.indexOf(tabId);
	if(index>=0)
	{
		tabIdsEChat.splice(index, 1);
	}
});
