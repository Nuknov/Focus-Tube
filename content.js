function redirectToCustomDomain() {
  const url = new URL(window.location.href);

  // Skip if already on yout-ube.com or embed
  if (url.hostname === "yout-ube.com" || url.hostname.includes("youtube-nocookie")) return;

  // Only process YouTube watch pages
  if (url.hostname !== "www.youtube.com") return;
  if (url.pathname !== "/watch") return;

  const videoId = url.searchParams.get("v");
  if (!videoId) return;

  // ✅ NO EXTRA SPACES
  const cleanUrl = `https://yout-ube.com/watch?v=${videoId}`;

  // Save for popup
  chrome.storage.local.set({ focusTubeCleanUrl: cleanUrl });

  // Redirect
  window.location.replace(cleanUrl);
}

// Run on load
redirectToCustomDomain();

// Handle SPA navigation
let lastUrl = location.href;
new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    redirectToCustomDomain();
  }
}).observe(document, { subtree: true, childList: true });
