function appendUrlInput(url) {
    $("#startForm").prepend(`<div class="form-group"><input type="url" class="form-control" value="${url}" placeholder="Enter a URL like https://www.google.com/"></div>`)
}

$(function(){
    chrome.storage.sync.get(['lastUrls'], function(result) {
        if (Array.isArray(result.lastUrls) && result.lastUrls.length > 0) {
            result.lastUrls.reverse().forEach(i => {
                appendUrlInput(i);
            })
        } else {
            appendUrlInput("");
        }
    });

    $("#addUrl").submit(() => {
        appendUrlInput("");
        return false;
    });

    $("#startForm").submit(async () => {
        var urls = []
        $("#startForm input[type=url]").each(function() {
            var value = $(this).val();
            if(value) {
                urls.push(value);
            }
        });
        
        if(urls.length > 0) {
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            chrome.runtime.sendMessage({ urls: urls, tabId: tab.id, duration: 30 * 1000 }) 
            chrome.storage.sync.set({lastUrls: urls});         
        }
    })  
    
    $("#stopForm").submit(async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.runtime.sendMessage({ stop: true })     
    });
    
});