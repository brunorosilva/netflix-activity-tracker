
chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url;
    console.log(url)
    let currentVideo = url.split("watch/")[1].split("?")[0];

    chrome.storage.sync.get([currentVideo], (data) => {
        const currentVideoProgresses = data[currentVideo] ? JSON.parse(data[currentVideo]) : [];

        viewProgresses(currentVideoProgresses, currentVideo);
    });
});

const viewProgresses = (currentVideoProgresses = [], currentVideo = "") => {
    const progressesElement = document.getElementById("progresses");

    if (currentVideoProgresses.length > 0) {
        for (let i = 0; i < currentVideoProgresses.length; i++) {
            const progress = currentVideoProgresses[i];
            addNewProgress(progressesElement, progress, currentVideo);
        }
    } else {
        progressesElement.innerHTML = '<i class="row">No progresses to show</i>';
    }

    return;
};
const addNewProgress = (progresses, progress, videoId) => {

    var table = document.getElementById("progresses-list");
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = videoId;
    cell2.innerHTML = Math.round(progress.progressPercent * 100);
    cell3.innerHTML = Math.round(progress.progressTime);
    cell4.innerHTML = progress.progressTimestamp;
};

