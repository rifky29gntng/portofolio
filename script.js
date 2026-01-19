// PLAYLIST TRACKS
const playlist = [
    "https://files.catbox.moe/q4xopq.m4a",
    "https://files.catbox.moe/tu6hyr.m4a",
    "https://files.catbox.moe/fddsv3.m4a",
    "https://files.catbox.moe/9o16ph.m4a"
];

// DOM ELEMENTS
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const mainContent = document.getElementById('main-content');
const themeSwitch = document.getElementById('theme-switch');
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentTrackElement = document.getElementById('current-track');

// GLOBAL VARIABLES
let currentTrackIndex = 0;
let isLoading = true;
let progress = 1;

// ===================== LOADING SCREEN =====================
function simulateLoading() {
    const interval = setInterval(() => {
        progress += 1;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.remove('loading-active');
                loadingScreen.classList.add('loading-hidden');
                mainContent.classList.remove('content-hidden');
                mainContent.classList.add('content-visible');
                isLoading = false;
                
                // Auto-play first track after loading
                loadTrack(currentTrackIndex);
                setTimeout(() => {
                    audioPlayer.play().catch(e => console.log("Autoplay blocked:", e));
                }, 1000);
            }, 500);
        }
    }, 30);
}

// ===================== THEME SWITCHER =====================
function initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'purple') {
        document.body.classList.add('purple-theme');
        themeSwitch.innerHTML = '<i class="fas fa-palette"></i> SWITCH TO BLUE';
    }
}

themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('purple-theme');
    
    if (document.body.classList.contains('purple-theme')) {
        localStorage.setItem('portfolio-theme', 'purple');
        themeSwitch.innerHTML = '<i class="fas fa-palette"></i> SWITCH TO BLUE';
    } else {
        localStorage.setItem('portfolio-theme', 'blue');
        themeSwitch.innerHTML = '<i class="fas fa-palette"></i> SWITCH TO PURPLE';
    }
});

// ===================== MUSIC PLAYER =====================
function loadTrack(index) {
    if (index >= 0 && index < playlist.length) {
        currentTrackIndex = index;
        audioPlayer.src = playlist[index];
        currentTrackElement.textContent = index + 1;
        
        // Update button states
        playBtn.querySelector('i').className = 'fas fa-play';
        
        // Auto-play if not on loading screen
        if (!isLoading) {
            audioPlayer.play().catch(e => {
                console.log("Playback requires user interaction:", e);
            });
        }
    }
}

function playTrack() {
    if (audioPlayer.src) {
        audioPlayer.play();
        playBtn.querySelector('i').className = 'fas fa-play';
    } else {
        loadTrack(currentTrackIndex);
        audioPlayer.play();
    }
}

function pauseTrack() {
    audioPlayer.pause();
    playBtn.querySelector('i').className = 'fas fa-play';
}

function stopTrack() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    playBtn.querySelector('i').className = 'fas fa-play';
}

function nextTrack() {
    let nextIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(nextIndex);
}

function prevTrack() {
    let prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(prevIndex);
}

// ===================== EVENT LISTENERS =====================
playBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        playTrack();
        playBtn.querySelector('i').className = 'fas fa-pause';
    } else {
        pauseTrack();
    }
});

pauseBtn.addEventListener('click', pauseTrack);
stopBtn.addEventListener('click', stopTrack);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

// Audio player events
audioPlayer.addEventListener('ended', nextTrack);

audioPlayer.addEventListener('play', () => {
    playBtn.querySelector('i').className = 'fas fa-pause';
});

audioPlayer.addEventListener('pause', () => {
    playBtn.querySelector('i').className = 'fas fa-play';
});

// ===================== INITIALIZATION =====================
window.addEventListener('DOMContentLoaded', () => {
    // Start loading simulation
    simulateLoading();
    
    // Initialize theme
    initTheme();
    
    // Initialize music player
    loadTrack(0);
    
    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add parallax effect to background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        document.body.style.backgroundPosition = `center ${rate}px`;
    });
});

// ===================== KEYBOARD SHORTCUTS =====================
document.addEventListener('keydown', (e) => {
    // Spacebar to play/pause
    if (e.code === 'Space' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        if (audioPlayer.paused) {
            playTrack();
        } else {
            pauseTrack();
        }
    }
    
    // Arrow keys for track navigation
    if (e.code === 'ArrowRight') {
        nextTrack();
    }
    if (e.code === 'ArrowLeft') {
        prevTrack();
    }
    
    // 'M' to mute/unmute
    if (e.code === 'KeyM') {
        audioPlayer.muted = !audioPlayer.muted;
    }
    
    // 'T' to toggle theme
    if (e.code === 'KeyT') {
        themeSwitch.click();
    }
});

// Console welcome message
console.log('🎵 Iki Portfolio 🚀', 'color: #00f3ff; font-size: 24px; font-weight: bold;');
console.log('Music Player Controls:', 'color: #b967ff;');
console.log('- Space: Play/Pause');
console.log('- Arrow Keys: Next/Prev Track');
console.log('- M: Mute/Unmute');
console.log('- T: Toggle Theme');
