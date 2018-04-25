function removeEmbeddingPreventation(urls){
var onHeadersReceived = function(details) {
  var iterator = new Iterator(details.responseHeaders);
  while(iterator.hasNext()){
  var header = iterator.next();
    if ('content-security-policy' === header.name.toLowerCase()) {
		console.log('found content security policy');
      details.responseHeaders[i].value = '';
    }
    if ('x-frame-options' === header.name.toLowerCase()) {
      iterator.remove();
    }
  }
details.responseHeaders["Content-Security-Policy"]= "frame-ancestors https://*.google.com:*";
  return {
    responseHeaders: details.responseHeaders
  };
};


var filter = {
  urls: ["*://*/*"],
  types: ["main_frame", "sub_frame"]
};
chrome.webRequest.onHeadersReceived.addListener(onHeadersReceived, filter, ["blocking", "responseHeaders"]);
}
