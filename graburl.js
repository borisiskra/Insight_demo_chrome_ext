

chrome.tabs.getSelected(null, function(tab) {
	var tabId = tab.id;
	tabUrl = tab.url;

	alert(tab.url);
});
