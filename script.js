// Global Variables
let currentImageIndex = 0;
let galleryImages = [];
let isPlaying = false;

// Gallery Images Data (dapat diubah sesuai kebutuhan)
const galleryData = [
    {
        src: '1.jpg',
        alt: 'Foto Pre-wedding 1'
    },
    {
        src: '2.jpg',
        alt: 'Foto Pre-wedding 2'
    },
    {
        src: '3.jpg',
        alt: 'Foto Pre-wedding 3'
    },
    {
        src: '4.jpg',
        alt: 'Foto Pre-wedding 4'
    },
    {
        src: '5.jpg',
        alt: 'Foto Pre-wedding 5'
    },
    {
        src: '6.jpg',
        alt: 'Foto Pre-wedding 6'
    }
];

// URL Parameter Handler untuk Nama Tamu
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Set Guest Name dari URL Parameter
function setGuestName() {
    const guestName = getURLParameter('nama') || getURLParameter('name') || 'Tamu Undangan';
    const guestNameElement = document.getElementById('guestName');
    if (guestNameElement) {
        guestNameElement.textContent = guestName;
    }
}

// Fungsi untuk membuka undangan
function openInvitation() {
    const heroSection = document.getElementById('hero');
    const mainContent = document.getElementById('mainContent');
    
    // Fade out hero section
    heroSection.style.opacity = '0';
    heroSection.style.transform = 'translateY(-50px)';
    
    setTimeout(() => {
        heroSection.style.display = 'none';
        mainContent.style.display = 'block';
        
        // Fade in main content
        setTimeout(() => {
            mainContent.classList.add('show');
            startBackgroundMusic();
            initScrollAnimations();
        }, 100);
    }, 500);
}

// Background Music Control
function initMusicControl() {
    const musicControl = document.getElementById('musicControl');
    const musicIcon = document.getElementById('musicIcon');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    musicControl.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            musicIcon.className = 'fas fa-music';
            musicControl.classList.remove('playing');
            isPlaying = false;
        } else {
            backgroundMusic.play().catch(e => {
                console.log('Audio play failed:', e);
            });
            musicIcon.className = 'fas fa-pause';
            musicControl.classList.add('playing');
            isPlaying = true;
        }
    });
    
    // Set volume
    backgroundMusic.volume = 0.3;
}

function startBackgroundMusic() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicControl = document.getElementById('musicControl');
    const musicIcon = document.getElementById('musicIcon');
    
    // Auto-play music (may be blocked by browser)
    backgroundMusic.play().then(() => {
        musicIcon.className = 'fas fa-pause';
        musicControl.classList.add('playing');
        isPlaying = true;
    }).catch(e => {
        console.log('Auto-play blocked:', e);
        // Music will be played when user clicks the control
    });
}

// Gallery Functions
function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    galleryData.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item fade-in';
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.alt}" loading="lazy">
        `;
        
        galleryItem.addEventListener('click', () => {
            openLightbox(index);
        });
        
        galleryGrid.appendChild(galleryItem);
    });
    
    galleryImages = galleryData;
}

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    
    lightboxImage.src = galleryImages[index].src;
    lightboxImage.alt = galleryImages[index].alt;
    lightbox.style.display = 'block';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.src = galleryImages[currentImageIndex].src;
    lightboxImage.alt = galleryImages[currentImageIndex].alt;
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.src = galleryImages[currentImageIndex].src;
    lightboxImage.alt = galleryImages[currentImageIndex].alt;
}

// Lightbox Event Listeners
function initLightboxEvents() {
    const closeLightboxBtn = document.getElementById('closeLightbox');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const lightbox = document.getElementById('lightbox');
    
    closeLightboxBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);
    
    // Close lightbox when clicking outside image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        }
    });
}

// Countdown Timer
function initCountdown() {
    // Set wedding date (ubah sesuai tanggal acara)
    const weddingDate = new Date('2025
                                 -06-15T08:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance < 0) {
            // Wedding day has passed
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add fade-in class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// RSVP Form Handler
function initRSVPForm() {
    const rsvpForm = document.getElementById('rsvpForm');
    
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(rsvpForm);
        const rsvpData = {
            name: formData.get('name'),
            attendance: formData.get('attendance'),
            guestCount: formData.get('guestCount'),
            message: formData.get('message')
        };
        
        // Simulate form submission (replace with actual API call)
        console.log('RSVP Data:', rsvpData);
        
        // Show success message
        alert('Terima kasih! Konfirmasi kehadiran Anda telah diterima.');
        
        // Reset form
        rsvpForm.reset();
        
        // Here you can add code to send data to your backend
        // Example: sendRSVPData(rsvpData);
    });
}

// Send RSVP Data to Backend (example function)
function sendRSVPData(data) {
    // Example implementation
    fetch('/api/rsvp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('RSVP submitted successfully:', result);
    })
    .catch(error => {
        console.error('Error submitting RSVP:', error);
    });
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    // Add smooth scrolling to any anchor links if needed
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.getElementById('hero');
        
        if (hero && hero.style.display !== 'none') {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set guest name from URL parameter
    setGuestName();
    
    // Initialize all components
    initMusicControl();
    initGallery();
    initLightboxEvents();
    initCountdown();
    initRSVPForm();
    initSmoothScrolling();
    initParallaxEffect();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Handle window resize
window.addEventListener('resize', function() {
    // Recalculate any responsive elements if needed
});

// Prevent right-click context menu (optional, for protection)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Add touch support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.style.display === 'block') {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                nextImage();
            } else {
                // Swipe right - previous image
                prevImage();
            }
        }
    }
}

// Utility Functions
function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('id-ID', options);
}

function formatTime(date) {
    const options = { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'Asia/Jakarta'
    };
    return date.toLocaleTimeString('id-ID', options) + ' WIB';
}

// Export functions for global access
window.openInvitation = openInvitation;
window.closeLightbox = closeLightbox;
window.nextImage = nextImage;
window.prevImage = prevImage;

