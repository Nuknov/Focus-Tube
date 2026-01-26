document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('ytUrl');
  const button = document.getElementById('goBtn');
  const themeToggle = document.getElementById('themeToggle');

  // Load saved theme preference
  const savedTheme = localStorage.getItem('ilumuTheme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }

  // Toggle theme
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-theme');
    if (isDark) {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('ilumuTheme', 'light');
      themeToggle.textContent = '🌓'; // sun/moon emoji
    } else {
      document.body.classList.add('dark-theme');
      localStorage.setItem('ilumuTheme', 'dark');
      themeToggle.textContent = '☀️';
    }
  });

  // Redirect logic (unchanged)
  button.addEventListener('click', () => {
    let url = input.value.trim();

    if (!url) {
      alert('Please enter a YouTube URL.');
      return;
    }

    try {
      const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(ytRegex);

      if (!match) {
        alert('Invalid YouTube URL.\nExample: https://youtube.com/watch?v=dQw4w9WgXcQ');
        return;
      }

      const videoId = match[4];
      const ilumuUrl = `https://www.ilumu.com/watch?v=${videoId}`;

      chrome.tabs.update({ url: ilumuUrl });
      window.close();

    } catch (e) {
      alert('Error processing URL.');
    }
  });

  // Enter key support
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') button.click();
  });
});