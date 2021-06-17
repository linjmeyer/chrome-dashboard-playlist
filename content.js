// Runs in every page/tab
chrome.runtime.onMessage.addListener(function(msg) {
  if(msg.cmd == "navigateToUrl") {
    console.log("Navigating to page: " + msg.url)
    window.location.replace(msg.url);
  }
});

