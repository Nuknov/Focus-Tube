function redirectToCustomDomain() {
  const url = new URL(window.location.href);

  // Only process YouTube watch pages
  if (url.hostname !== "www.youtube.com") return;
  if (url.pathname !== "/watch") return;

  const videoId = url.searchParams.get("v");
  if (!videoId) return;

  // Redirect to your custom domain
  const newUrl = `https://yout-ube.com/watch?v=${videoId}`;

  // Only redirect if not already there
  if (window.location.href !== newUrl) {
    window.location.replace(newUrl);
  }
}

// Run once on load
redirectToCustomDomain();

// Handle YouTube SPA navigation (clicking videos)
let lastUrl = location.href;
new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    redirectToCustomDomain();
  }
}).observe(document, { subtree: true, childList: true });






// Listen for popup commands
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const video = document.querySelector('video');
  
  if (request.action === "getVideoInfo") {
    // Try multiple ways to get title
    let title = document.querySelector('h1.style-scope.ytd-watch-metadata')?.innerText ||
                document.querySelector('#title > h1')?.innerText ||
                document.title.replace(' - YouTube', '');
    
    // Clean title (remove weird chars)
    title = title ? title.trim().replace(/[\u0000-\u001F\u007F-\u009F]/g, '') : 'Unknown';

    // Get channel name
    let channel = document.querySelector('#owner-name a')?.innerText ||
                  document.querySelector('.ytd-video-owner-renderer a')?.innerText ||
                  '';

    sendResponse({ title, channel });
  }
  
  else if (request.action === "playVideo" && video) {
    video.play();
  }
  
  else if (request.action === "pauseVideo" && video) {
    video.pause();
  }
});