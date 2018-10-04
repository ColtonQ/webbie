$(function () {

    //    itemCurrentWebsite.innerHTML = domain;

    //    var addTextTag = document.getElementById("title");
    //    document.body.insertBefore(item, addTextTag);
    //});
    chrome.storage.sync.get(["websites", "timers"], function (myStorage) {
        var itemWebsite, itemTimer, itemImage, spaceTag, currentSpaceTag, domain;
        spaceTag = document.getElementById("space");
        currentSpaceTag = document.getElementById("currentSpace");

        chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
            if (typeof tabs[0] != "undefined") {
                var url = new URL(tabs[0].url);
                domain = url.hostname;
            }

            if (typeof myStorage.timers != "undefined" && typeof myStorage.websites != "undefined") {
                var itemCurrentWebsite = document.createElement("h3");
                var itemCurrentTimer = document.createElement("h3");
                var itemCurrentImage = document.createElement("img");
                itemCurrentImage.width = "16";
                itemCurrentImage.height = itemCurrentImage.width;
                itemCurrentImage.className = "small";
                var currentTimer;
                if (typeof domain != "undefined") {
                    itemCurrentWebsite.innerHTML = domain;
                    itemCurrentImage.src = "http://www.google.com/s2/favicons?domain=" + domain;
                    if (myStorage.websites.includes(domain)) {
                        var index = myStorage.websites.indexOf(domain);
                        currentTimer = displayTimer(myStorage.timers[index]);
                        itemCurrentTimer.innerHTML = currentTimer.toString();
                    } else {
                        itemCurrentTimer.innerHTML = "<1 min";
                    }
                } else {
                    itemCurrentTimer.innerHTML = ":)";
                }

                document.body.insertBefore(itemCurrentImage, currentSpaceTag);
                document.body.insertBefore(itemCurrentWebsite, currentSpaceTag);
                document.body.insertBefore(itemCurrentTimer, currentSpaceTag);

                
                var limit = Math.min(myStorage.websites.length, 5);
                //limit = myStorage.websites.length;
                for (i = 0; i < limit; i++) {

                    itemWebsite = document.createElement("p");
                    itemWebsite.innerHTML = myStorage.websites[i];
                    itemTimer = document.createElement("p");
                    itemTimer.innerHTML = displayTimer(myStorage.timers[i]);

                    itemImage = document.createElement("img");
                    itemImage.height = "16";
                    itemImage.width = itemImage.height;
                    itemImage.className = "small";
                    itemImage.src = "http://www.google.com/s2/favicons?domain=" + myStorage.websites[i];

                    document.body.insertBefore(itemImage, spaceTag);
                    document.body.insertBefore(itemWebsite, spaceTag);
                    document.body.insertBefore(itemTimer, spaceTag);

                }
            }

        });

        //if (typeof myStorage.timers != "undefined" && typeof myStorage.websites != "undefined") {
        //    var itemCurrentWebsite = document.createElement("h3");
        //    var itemCurrentTimer = document.createElement("h3");
        //    var currentTimer;
        //    console.log(domain);
        //    if (typeof domain != "undefined") {
        //        itemCurrentWebsite.innerHTML = domain;
        //        if (myStorage.websites.includes(domain)) {
        //            var index = myStorage.websites.indexOf(domain);
        //            currentTimer = myStorage.timers[index];
        //            itemCurrentTimer.innerHTML = currentTimer.toString();
        //        } else {
        //            itemCurrentTimer.innerHTML = "<1";
        //        }
        //    } else {
        //        itemCurrentTimer.innerHTML = "foo";
        //    }
            
        //    document.body.insertBefore(itemCurrentWebsite, spaceTag);
        //    document.body.insertBefore(itemCurrentTimer, spaceTag);

        //    for (i = 0; i < myStorage.websites.length; i++) {

        //        itemWebsite = document.createElement("p");
        //        itemWebsite.innerHTML = myStorage.websites[i];
        //        itemTimer = document.createElement("p");
        //        itemTimer.innerHTML = myStorage.timers[i];

        //        itemImage = document.createElement("img");
        //        itemImage.height = "16";
        //        itemImage.width = itemImage.height;
        //        itemImage.src = "http://www.google.com/s2/favicons?domain=" + myStorage.websites[i];

        //        document.body.insertBefore(itemImage, spaceTag);
        //        document.body.insertBefore(itemWebsite, spaceTag);
        //        document.body.insertBefore(itemTimer, spaceTag);

        //    }
        //}
        
    });

    $("#reset").click(function () {
        chrome.storage.sync.set({ "websites": [] });
        chrome.storage.sync.set({ "timers": [] });
    });

    function displayTimer(time) {
        var hours = Math.floor(time / 60);
        var minutes = time % 60;
        if (hours == 0) {
            return minutes + " min ";
        }
        return hours + " hrs " + minutes + " min ";
    }

    
    //$("#addButton").click(function () {
    //    var item = document.createElement("h3");
    //    var text = document.createTextNode($("#addText").val());
    //    item.appendChild(text);

    //    var addTextTag = document.getElementById("addText");
    //    document.body.insertBefore(item, addTextTag);

    //    var num = document.createElement("h3");
    //    var numVal = document.createTextNode($("#addNum").val());
    //    num.appendChild(numVal);
    //    document.body.insertBefore(num, addTextTag);
    //});
});