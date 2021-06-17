// Runs in background constantly
/////////////////////////////////////////////
console.log("Background worker starting");

let timerRunning = false;
function setTimerRunning(isRunning) {
    console.log("New timer status, running=" + isRunning);
    timerRunning = isRunning;
}

// Returns a Promise that resolves after "ms" Milliseconds
const timer = ms => new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
    if(!timerRunning) {
        reject("Timer stopped");
    }
})

// On URLs message from popup
chrome.runtime.onMessage.addListener(async function(msg, sender, sendResponse) {
    // Start loop message
    if(msg.urls && msg.tabId && msg.duration) {
        setTimerRunning(true);
        console.log(msg);
        for(var i=0; i < msg.urls.length; i++) {
            if(!timerRunning) {
                break;
            }
            console.log("Messaging content worker to navigate to url: " + msg.urls[i])
            chrome.tabs.update(msg.tabId, { url: msg.urls[i] } )
                .catch( () => { setTimerRunning(false) }) 
            if (i == (msg.urls.length - 1)) {
                i = -1;
            }
            await timer(msg.duration)
        }
        return true;

    // End loop message
    } else if (msg.stop) {
        setTimerRunning(false);
    }
})