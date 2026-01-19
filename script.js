// Protokol CODING-MAX: Implementasi tanpa kompromi, langsung work 100%

// ==================== GLOBAL VARIABLES ====================
let currentTheme = 'blue';
let isPlaying = false;
let currentTrackIndex = 0;
const audioPlayer = document.getElementById('audio-player');
const playlist = [
    'https://files.catbox.moe/q4xopq.m4a',
    'https://files.catbox.moe/tu6hyr.m4a',
    'https://files.catbox.moe/fddsv3.m4a',
    'https://files.catbox.moe/9o16ph.m4a'
];

// ==================== LOADING SCREEN & ENTER BUTTON ====================
window.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.getElementById('loading-text');
    const enterButton = document.getElementById('enter-btn');
    const mainContent = document.getElementById('main-content');

    // Simulasi loading progress
    setTimeout(() => {
        loadingText.textContent = 'Silahkan pencet tombol ini kak';
        enterButton.classList.remove('hidden');
    }, 3000); // 3 detik loading

    // Klik tombol masuk
    enterButton.addEventListener('click', () => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
            mainContent.classList.remove('hidden');
            enterButton.classList.add('hidden');
            // Mulai audio visualizer
            startVisualizer();
        }, 800);
    });
});

// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('theme-purple');
    currentTheme = document.body.classList.contains('theme-purple') ? 'purple' : 'blue';
    
    // Update profile image berdasarkan tema
    const profileImg = document.getElementById('profile-image');
    profileImg.src = currentTheme === 'blue' 
        ? 'https://files.catbox.moe/lgw6ym.jpeg' 
        : 'https://files.catbox.moe/8bqg9b.jpg';
    
    // Feedback visual
    themeToggle.innerHTML = currentTheme === 'blue' 
        ? 'Ganti Tema <i class="fas fa-palette"></i>' 
        : 'Balik ke Biru <i class="fas fa-undo"></i>';
    
    // Efek kilat
    themeToggle.style.boxShadow = `0 0 40px ${currentTheme === 'blue' ? '#00f3ff' : '#c724ff'}`;
    setTimeout(() => {
        themeToggle.style.boxShadow = '';
    }, 500);
});

// ==================== MUSIC PLAYER SYSTEM ====================
// Inisialisasi playlist
audioPlayer.src = playlist[currentTrackIndex];

// Play/Pause/Stop/Next/Prev Functions
function playTrack() {
    audioPlayer.play();
    isPlaying = true;
    document.getElementById('play-btn').innerHTML = '<i class="fas fa-play"></i>';
    document.getElementById('play-btn').innerHTML = '<i class="fas fa-pause"></i>';
    updateVisualizer(true);
}

function pauseTrack() {
    audioPlayer.pause();
    isPlaying = false;
    document.getElementById('play-btn').innerHTML = '<i class="fas fa-play"></i>';
    updateVisualizer(false);
}

function stopTrack() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    isPlaying = false;
    document.getElementById('play-btn').innerHTML = '<i class="fas fa-play"></i>';
    updateVisualizer(false);
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    audioPlayer.src = playlist[currentTrackIndex];
    if (isPlaying) {
        audioPlayer.play();
    }
    flashNeon('next-btn');
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    audioPlayer.src = playlist[currentTrackIndex];
    if (isPlaying) {
        audioPlayer.play();
    }
    flashNeon('prev-btn');
}

// Event listeners untuk tombol musik
document.getElementById('play-btn').addEventListener('click', playTrack);
document.getElementById('pause-btn').addEventListener('click', pauseTrack);
document.getElementById('stop-btn').addEventListener('click', stopTrack);
document.getElementById('next-btn').addEventListener('click', nextTrack);
document.getElementById('prev-btn').addEventListener('click', prevTrack);

// Ketika lagu selesai, auto next
audioPlayer.addEventListener('ended', nextTrack);

// ==================== VISUALIZER EFFECT ====================
function startVisualizer() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.style.animationPlayState = 'running';
    });
}

function updateVisualizer(playing) {
    const bars = document.querySelectorAll('.bar');
    if (playing) {
        bars.forEach(bar => {
            bar.style.animationPlayState = 'running';
            bar.style.opacity = '1';
        });
    } else {
        bars.forEach(bar => {
            bar.style.animationPlayState = 'paused';
            bar.style.opacity = '0.5';
        });
    }
}

// ==================== NEON FLASH EFFECT ====================
function flashNeon(elementId) {
    const element = document.getElementById(elementId);
    const originalColor = element.style.boxShadow;
    element.style.boxShadow = `0 0 50px ${currentTheme === 'blue' ? '#00f3ff' : '#c724ff'}`;
    setTimeout(() => {
        element.style.boxShadow = originalColor;
    }, 300);
}

// ==================== GLASSMORPHISM HOVER EFFECT ====================
const glassCards = document.querySelectorAll('.glass-card');
glassCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleY = (x - centerX) * 0.02;
        const angleX = (centerY - y) * 0.02;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================== RESPONSIVE MENU (untuk future update) ====================
function initResponsiveMenu() {
    if (window.innerWidth <= 768) {
        // Bisa ditambahkan menu hamburger di sini kalau perlu
        console.log('Mobile mode aktif');
    }
}

window.addEventListener('resize', initResponsiveMenu);
initResponsiveMenu();

// ==================== FINAL INIT ====================
console.log('🔥 KyzCrash Portofolio System siap 100%');
console.log('🚀 Theme:', currentTheme);
console.log('🎵 Playlist loaded:', playlist.length, 'tracks');
