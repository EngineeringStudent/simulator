////------------remove embedding preventation------------------------
//removeEmbeddingPreventation(['<all_urls>']);
////------------------------------------------------------------------

chromeTabOpened(function(tabId, changeInfo, tab){
		  console.log(tab.url);
		  if(isEchat(tab.url))
		  {
			  chrome.tabs.executeScript(tab.id, {file: 'inject_echat.js'});
		  }
});