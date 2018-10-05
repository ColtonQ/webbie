$(function () {

    chrome.storage.sync.get(["websites", "timers"], function (myStorage) {
        var itemWebsite, itemTimer, itemImage, spaceTag, currentSpaceTag, domain;
        spaceTag = document.getElementById("space");
        currentSpaceTag = document.getElementById("currentSpace");

        chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
            if (typeof tabs[0] != "undefined") {
                var url = new URL(tabs[0].url);
                domain = url.hostname;
            }

            //var itemCurrentWebsite = document.createElement("h3");
            //var itemCurrentTimer = document.createElement("h3");
            //var itemCurrentImage = document.createElement("img");
            //itemCurrentImage.width = "16";
            //itemCurrentImage.height = itemCurrentImage.width;
            //itemCurrentImage.className = "small";
            //var currentTimer;
            //if (typeof domain != undefined) {
            //    itemCurrentWebsite.innerHTML = domain;
            //    itemCurrentImage.src = "http://www.google.com/s2/favicons?domain=" + domain;
            //    if (typeof myStorage.timers != "undefined" && typeof myStorage.websites != "undefined" &&
            //        myStorage.websites.includes(domain)) {
            //        var index = myStorage.websites.indexOf(domain);
            //        currentTimer = displayTimer(myStorage.timers[index]);
            //        itemCurrentTimer.innerHTML = currentTimer.toString();
            //    } else {
            //        itemCurrentTimer.innerHTML = "<1 min";
            //    }
            //}

            //document.body.insertBefore(itemCurrentImage, currentSpaceTag);
            //document.body.insertBefore(itemCurrentWebsite, currentSpaceTag);
            //document.body.insertBefore(itemCurrentTimer, currentSpaceTag);
            displayItem(myStorage.websites, myStorage.timers, "h3", domain, currentSpaceTag);

            if (typeof myStorage.websites != "undefined" || typeof myStorage.timers != "undefined") {
                var limit = Math.min(myStorage.websites.length, 5);
                //limit = myStorage.websites.length;
                for (i = 0; i < limit; i++) {

                    //itemWebsite = document.createElement("p");
                    //itemWebsite.innerHTML = myStorage.websites[i];
                    //itemTimer = document.createElement("p");
                    //itemTimer.innerHTML = displayTimer(myStorage.timers[i]);

                    //itemImage = document.createElement("img");
                    //itemImage.height = "16";
                    //itemImage.width = itemImage.height;
                    //itemImage.className = "small";
                    //itemImage.src = "http://www.google.com/s2/favicons?domain=" + myStorage.websites[i];

                    //document.body.insertBefore(itemImage, spaceTag);
                    //document.body.insertBefore(itemWebsite, spaceTag);
                    //document.body.insertBefore(itemTimer, spaceTag);
                    displayItem(myStorage.websites, myStorage.timers, "p", myStorage.websites[i], spaceTag);

                }
            }
        });
    });
});

$("#reset").click(function () {
    chrome.storage.sync.set({ "websites": [] });
    chrome.storage.sync.set({ "timers": [] });
});

function displayItem(websites, timers, tag, domain, placementTag) {
    var itemWebsite, itemTimer, itemImage;
    itemWebsite = document.createElement(tag);
    itemTimer = document.createElement(tag);
    itemImage = document.createElement("img");
    itemImage.height = "16";
    itemImage.width = itemImage.height;
    itemImage.className = "small";

    var currentTimer;
    if (typeof domain != undefined) {
        if (domain == "") {
            itemWebsite.innerHTML = "local file";
            itemImage.src = "file.png";
        } else {
            itemWebsite.innerHTML = domain;
            itemImage.src = "http://www.google.com/s2/favicons?domain=" + domain;
        }
        if (typeof timers != "undefined" && typeof websites != "undefined" &&
            websites.includes(domain)) {
            var index = websites.indexOf(domain);
            currentTimer = displayTimer(timers[index]);
            itemTimer.innerHTML = currentTimer.toString();
        } else {
            itemTimer.innerHTML = "<1 min";
        }
    }

    document.body.insertBefore(itemImage, placementTag);
    document.body.insertBefore(itemWebsite, placementTag);
    document.body.insertBefore(itemTimer, placementTag);
}

function displayTimer(time) {
    var hours = Math.floor(time / 60);
    var minutes = time % 60;
    if (hours == 0) {
        return minutes + " min ";
    }
    return hours + " hrs " + minutes + " min ";
}

