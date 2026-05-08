document.addEventListener('DOMContentLoaded', () => {
  initAudioPlayer();
  initCopyButtons();
  initCodeTabs();
});

/* ==========================================
   1. Interactive Background Music Player
   ========================================== */
function initAudioPlayer() {
  // Create player container in DOM
  const playerDiv = document.createElement('div');
  playerDiv.id = 'glow-music-player';
  playerDiv.className = 'glow-music-player';
  
  // Resolve baseurl for assets
  const metaElement = document.querySelector('meta[name="theme-color"]');
  const pathPrefix = window.location.pathname.startsWith('/ai-leetcode') ? '/ai-leetcode' : '';
  const audioSrc = `${pathPrefix}/assets/audio/Silicon_Throne.mp3`;

  playerDiv.innerHTML = `
    <audio id="bg-audio" loop>
      <source src="${audioSrc}" type="audio/mp3">
    </audio>
    <div class="player-content">
      <div class="disc-wrapper">
        <div class="disc-glowing-ring"></div>
        <div class="disc-icon" id="player-disc">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none" />
            <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5" fill="none" />
            <circle cx="12" cy="12" r="1" fill="currentColor" />
          </svg>
        </div>
      </div>
      <div class="control-panel">
        <span class="music-title">Silicon Throne</span>
        <div class="player-actions">
          <button id="music-play-btn" class="player-btn play" title="Play/Pause">
            <svg class="icon-play" viewBox="0 0 24 24" width="18" height="18"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
            <svg class="icon-pause" viewBox="0 0 24 24" width="18" height="18" style="display:none;"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/></svg>
          </button>
          <div class="volume-slider-wrapper">
            <svg viewBox="0 0 24 24" width="14" height="14" class="vol-icon"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" fill="currentColor"/></svg>
            <input type="range" id="music-volume" min="0" max="1" step="0.05" value="0.3" class="volume-slider">
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(playerDiv);

  const audio = document.getElementById('bg-audio');
  const playBtn = document.getElementById('music-play-btn');
  const playIcon = playBtn.querySelector('.icon-play');
  const pauseIcon = playBtn.querySelector('.icon-pause');
  const disc = document.getElementById('player-disc');
  const volumeSlider = document.getElementById('music-volume');

  // Load persistence state from localStorage
  const savedState = localStorage.getItem('music_play_state');
  const savedTime = localStorage.getItem('music_play_time');
  const savedVolume = localStorage.getItem('music_volume');

  if (savedVolume !== null) {
    audio.volume = parseFloat(savedVolume);
    volumeSlider.value = savedVolume;
  } else {
    audio.volume = 0.3; // default moderate volume
  }

  if (savedTime !== null) {
    audio.currentTime = parseFloat(savedTime);
  }

  let isPlaying = false;

  function updateUI(playing) {
    if (playing) {
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'inline-block';
      disc.classList.add('spinning');
      playerDiv.classList.add('playing');
    } else {
      playIcon.style.display = 'inline-block';
      pauseIcon.style.display = 'none';
      disc.classList.remove('spinning');
      playerDiv.classList.remove('playing');
    }
  }

  function togglePlay() {
    if (audio.paused) {
      audio.play().then(() => {
        isPlaying = true;
        updateUI(true);
        localStorage.setItem('music_play_state', 'playing');
      }).catch(err => {
        console.log("Autoplay blocked or playback error:", err);
      });
    } else {
      audio.pause();
      isPlaying = false;
      updateUI(false);
      localStorage.setItem('music_play_state', 'paused');
    }
  }

  playBtn.addEventListener('click', togglePlay);

  volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
    localStorage.setItem('music_volume', e.target.value);
  });

  // Periodically save current time to localStorage to persist across navigation
  setInterval(() => {
    if (isPlaying && !audio.paused) {
      localStorage.setItem('music_play_time', audio.currentTime);
    }
  }, 1000);

  // Resume play state if it was playing in the previous session
  if (savedState === 'playing') {
    // Standard browsers require user interaction, we trigger on the first click in the document
    const startPlaybackOnInteraction = () => {
      audio.play().then(() => {
        isPlaying = true;
        updateUI(true);
      }).catch(e => console.log("Playback failed:", e));
      document.removeEventListener('click', startPlaybackOnInteraction);
    };
    document.addEventListener('click', startPlaybackOnInteraction);
  }
}

/* ==========================================
   2. Floating Code Block Copy Button
   ========================================== */
function initCopyButtons() {
  const codeBlocks = document.querySelectorAll('.highlight');
  
  codeBlocks.forEach(block => {
    // Avoid double creation
    if (block.querySelector('.code-copy-btn')) return;

    const copyBtn = document.createElement('button');
    copyBtn.className = 'code-copy-btn';
    copyBtn.innerHTML = `
      <svg class="icon-copy" viewBox="0 0 24 24" width="16" height="16">
        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor"/>
      </svg>
      <svg class="icon-check" viewBox="0 0 24 24" width="16" height="16" style="display:none; color: #10b981;">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
      </svg>
    `;
    
    // Relative positioning to container
    block.style.position = 'relative';
    block.appendChild(copyBtn);

    copyBtn.addEventListener('click', () => {
      const codeElement = block.querySelector('code');
      const text = codeElement ? codeElement.innerText : block.innerText;
      
      navigator.clipboard.writeText(text).then(() => {
        const iconCopy = copyBtn.querySelector('.icon-copy');
        const iconCheck = copyBtn.querySelector('.icon-check');
        
        iconCopy.style.display = 'none';
        iconCheck.style.display = 'inline-block';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
          iconCopy.style.display = 'inline-block';
          iconCheck.style.display = 'none';
          copyBtn.classList.remove('copied');
        }, 2000);
      });
    });
  });
}

/* ==========================================
   3. C++ / Python Bilingual Tabs Switcher
   ========================================== */
function initCodeTabs() {
  const pageContent = document.querySelector('.page__content');
  if (!pageContent) return;

  // Find all Python/C++ headers in the markdown body
  const headers = Array.from(pageContent.querySelectorAll('h3'));
  
  let index = 0;
  while (index < headers.length) {
    const currentHeader = headers[index];
    const nextHeader = headers[index + 1];
    
    if (currentHeader && nextHeader) {
      const isCurrentPython = currentHeader.id === 'python' || currentHeader.textContent.trim().toLowerCase() === 'python';
      const isNextCpp = nextHeader.id === 'c' || nextHeader.textContent.trim().toLowerCase() === 'c++';
      
      const isCurrentCpp = currentHeader.id === 'c' || currentHeader.textContent.trim().toLowerCase() === 'c++';
      const isNextPython = nextHeader.id === 'python' || nextHeader.textContent.trim().toLowerCase() === 'python';

      if ((isCurrentPython && isNextCpp) || (isCurrentCpp && isNextPython)) {
        // We have adjacent Python and C++ code blocks! Let's group them.
        const pyHeader = isCurrentPython ? currentHeader : nextHeader;
        const cppHeader = isCurrentCpp ? currentHeader : nextHeader;
        
        // Find their corresponding code blocks (which are the next sibling element)
        const pyBlock = getNextSiblingWithClass(pyHeader, 'highlight');
        const cppBlock = getNextSiblingWithClass(cppHeader, 'highlight');
        
        if (pyBlock && cppBlock) {
          createTabsContainer(pyHeader, cppHeader, pyBlock, cppBlock);
          // Advance past both headers
          index += 2;
          continue;
        }
      }
    }
    index += 1;
  }
}

function getNextSiblingWithClass(el, className) {
  let sibling = el.nextElementSibling;
  while (sibling) {
    if (sibling.classList.contains(className)) return sibling;
    // If we hit another header, stop
    if (sibling.tagName.startsWith('H')) return null;
    sibling = sibling.nextElementSibling;
  }
  return null;
}

function createTabsContainer(pyHeader, cppHeader, pyBlock, cppBlock) {
  // Create outer tabs container
  const tabsWrapper = document.createElement('div');
  tabsWrapper.className = 'bilingual-tabs-wrapper';
  
  const tabsHeader = document.createElement('div');
  tabsHeader.className = 'tabs-header';
  tabsHeader.innerHTML = `
    <button class="tab-btn active" data-tab="python">Python</button>
    <button class="tab-btn" data-tab="cpp">C++</button>
  `;
  
  const tabsContent = document.createElement('div');
  tabsContent.className = 'tabs-content';
  
  tabsWrapper.appendChild(tabsHeader);
  tabsWrapper.appendChild(tabsContent);
  
  // Put headers before the wrapper in the DOM
  pyHeader.parentNode.insertBefore(tabsWrapper, pyHeader);
  
  // Clone and append content blocks to maintain original instances safely
  const pyTab = document.createElement('div');
  pyTab.className = 'tab-pane active';
  pyTab.id = 'tab-python';
  
  const cppTab = document.createElement('div');
  cppTab.className = 'tab-pane';
  cppTab.id = 'tab-cpp';
  
  tabsContent.appendChild(pyTab);
  tabsContent.appendChild(cppTab);
  
  // Move actual elements inside the tabs
  pyTab.appendChild(pyBlock);
  cppTab.appendChild(cppBlock);
  
  // Remove original headers and structures
  pyHeader.remove();
  cppHeader.remove();

  // Re-run Copy code initialization to ensure the newly moved blocks have copy buttons
  setTimeout(initCopyButtons, 50);

  // Setup click listeners for tabs
  const tabButtons = tabsHeader.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedTab = btn.getAttribute('data-tab');
      
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      if (selectedTab === 'python') {
        pyTab.classList.add('active');
        cppTab.classList.remove('active');
      } else {
        cppTab.classList.add('active');
        pyTab.classList.remove('active');
      }
    });
  });
}
