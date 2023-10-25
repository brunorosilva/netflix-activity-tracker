
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "play") {
    // Here we should do nothing, because we don't want to override the progress
    console.log("User started watching a show on Netflix.");
  } else if (message.action === "pause") {
    // Here we should save the progress and add a timestamp to the progress
    addProgressEventHandler(message);
    console.log(message.videoId)
  }
});

function fetchProgresses(videoId) {
  return new Promise((resolve) => {
    chrome.storage.sync.get([videoId], (message) => {
      resolve(message[videoId] ? JSON.parse(message[videoId]) : []);
    });
  });
};

const addProgressEventHandler = async (message) => {
  var timestamp = new Date().getTime();
  const newProgress = {
    progressPercent: message.currentTime / message.duration,
    progressTime: message.currentTime,
    progressTimestamp: timestamp
  }

  currentVideoProgresses = await fetchProgresses(message.videoId);

  chrome.storage.sync.set({
    [message.videoId]: JSON.stringify([...currentVideoProgresses, newProgress])
  });
};
