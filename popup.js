$(function(){
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
            chrome.runtime.sendMessage({ urls: urls, tabId: tab.id, duration: 5000 })          
        }
    })  
    
    $("#stopForm").submit(async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.runtime.sendMessage({ stop: true })     
    });
});