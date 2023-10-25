setTimeout(function () {
  const videoPlayer = document.getElementsByTagName("video")[0];
  if (videoPlayer) {
    videoPlayer.addEventListener("play", () => {
      // User started watching
      console.log("played")
      chrome.runtime.sendMessage({
        action: "play",
        currentTime: videoPlayer.currentTime,
        duration: videoPlayer.duration,
        videoId: videoPlayer.baseURI.split("watch/")[1].split("?")[0]
      });
    });

    videoPlayer.addEventListener("pause", () => {
      console.log("paused")
      // User stopped watching
      chrome.runtime.sendMessage({
        action: "pause",
        currentTime: videoPlayer.currentTime,
        duration: videoPlayer.duration,
        videoId: videoPlayer.baseURI.split("watch/")[1].split("?")[0]
      });
    });
  }

}, 4000);