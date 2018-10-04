var domain, myNewWebsites, myNewTimers;

var myTimer = window.setInterval(function () {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        if (typeof tabs[0] != "undefined") {
            var url = new URL(tabs[0].url);
            domain = url.hostname;
        }
    });

    chrome.storage.sync.get(["timers", "websites"], function (myStorage) {
        myNewWebsites = myStorage.websites;
        myNewTimers = myStorage.timers;

        console.log(domain);
        console.log((typeof domain != "undefined"));
        if (typeof domain != "undefined") {
            if (typeof myNewWebsites == "undefined" || typeof myNewTimers == "undefined") {
                myNewWebsites = [];
                myNewTimers = [];
            }
            if (!myNewWebsites.includes(domain)) {
                myNewWebsites.push(domain);
                myNewTimers.push(1);
            } else {
                index = myNewWebsites.indexOf(domain);
                myNewTimers[index] += 1;
                while (index - 1 >= 0 &&
                    myNewTimers[index] >= myNewTimers[index - 1]) {
                    var a = myNewTimers[index];
                    myNewTimers[index] = myNewTimers[index - 1];
                    myNewTimers[index - 1] = a;

                    var b = myNewWebsites[index];
                    myNewWebsites[index] = myNewWebsites[index - 1];
                    myNewWebsites[index - 1] = b;
                    index--;
                }
            }
            chrome.storage.sync.set({ "websites": myNewWebsites });
            chrome.storage.sync.set({ "timers": myNewTimers });
        }
    });
}, 60000);