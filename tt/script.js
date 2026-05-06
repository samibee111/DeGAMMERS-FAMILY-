// Enhanced 3D Logo Animation on Mouse Move with Advanced Parallax
document.addEventListener('DOMContentLoaded', function() {
    const bullLogo = document.querySelector('.bull-logo');
    const bullContainer = document.querySelector('.bull-logo-container');

    if (bullContainer && bullLogo) {
        document.addEventListener('mousemove', function(e) {
            // Only apply effect on hero section
            const heroSection = document.querySelector('.hero');
            const heroRect = heroSection.getBoundingClientRect();
            
            if (e.clientY < heroRect.bottom) {
                // Calculate center position
                const centerX = window.innerWidth / 2;
                const centerY = heroRect.height / 2;
                
                // Calculate rotation based on mouse position with enhanced range
                const rotateX = (e.clientY - centerY) / 8;
                const rotateY = (e.clientX - centerX) / 8;
                
                // Add scale effect for depth perception
                const distance = Math.sqrt(
                    Math.pow(e.clientX - centerX, 2) + 
                    Math.pow(e.clientY - centerY, 2)
                );
                const scale = 1 + (Math.min(distance / 1000, 0.1));
                
                bullLogo.style.transform = `
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    scale(${scale})
                `;
                
                // Enhanced shadow effect based on mouse position
                const shadowDistance = Math.sqrt(
                    Math.pow(e.clientX - centerX, 2) + 
                    Math.pow(e.clientY - centerY, 2)
                ) / 10;
                bullLogo.style.filter = `drop-shadow(
                    ${(e.clientX - centerX) / 50}px 
                    ${(e.clientY - centerY) / 50 + 25}px 
                    ${Math.min(60 + shadowDistance, 80)}px 
                    rgba(255, 255, 255, ${0.12 + shadowDistance / 500})
                )`;
            }
        });

        // Reset rotation when mouse leaves the area
        document.addEventListener('mouseleave', function() {
            bullLogo.style.transform = 'rotateX(0) rotateY(0) scale(1)';
            bullLogo.style.filter = 'drop-shadow(0 25px 60px rgba(255, 255, 255, 0.12))';
        });

        // Add tilt effect on the logo container on scroll
        window.addEventListener('scroll', function() {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            if (scrollPercent < 0.15) {
                const tiltY = scrollPercent * 50;
                bullContainer.style.transform = `perspective(1200px) rotateX(${tiltY}deg)`;
            }
        });
    }
});

// Product Card Animations
const productCards = document.querySelectorAll('.product-card');
productCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Add entrance animation
    card.style.animation = 'cardEnter 0.6s ease-out forwards';
    card.style.opacity = '0';
});

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes cardEnter {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Active nav link on scroll
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').slice(1);
        if (href === current) {
            link.style.borderBottom = '2px solid white';
        } else {
            link.style.borderBottom = 'none';
        }
    });
});

// Add to Cart Function with Notification
function addToCart(productName, price) {
    const notification = document.getElementById('cartNotification');
    const notificationText = document.getElementById('notificationText');
    
    notificationText.textContent = `${productName} added to cart - $${price.toFixed(2)}`;
    
    notification.classList.add('show');
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);

    // Optional: Add animation effect on button
    event.target.textContent = '✓ Added';
    event.target.style.opacity = '0.7';
    
    setTimeout(() => {
        event.target.textContent = 'Add';
        event.target.style.opacity = '1';
    }, 2000);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect on hero section
window.addEventListener('scroll', function() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const scrollPosition = window.scrollY;
        heroContent.style.opacity = 1 - scrollPosition / 500;
        heroContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe value cards and contact info
document.querySelectorAll('.value-card, .contact-info, .product-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Section title underline animation
const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => {
    const underline = title.querySelector('::after');
    
    // Create observer for each title
    const titleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'titleSlideIn 0.8s ease-out';
            }
        });
    }, { threshold: 0.5 });
    
    titleObserver.observe(title);
});

// Add animation styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes titleSlideIn {
        from {
            opacity: 0;
            transform: scaleX(0);
            transform-origin: left center;
        }
        to {
            opacity: 1;
            transform: scaleX(1);
        }
    }
`;
document.head.appendChild(animationStyles);

// Debounce function for resize events
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Handle responsive behavior
const handleResize = debounce(function() {
    // Adjust logo size on smaller screens
    const bullContainer = document.querySelector('.bull-logo-container');
    if (window.innerWidth < 768 && bullContainer) {
        bullContainer.style.width = '150px';
        bullContainer.style.height = '150px';
    }
}, 250);

window.addEventListener('resize', handleResize);

// Console message for fun
console.log('%c🐂 Welcome to DEGAMMERS FAMILY 🐂', 'font-size: 20px; font-weight: bold; color: white; background: black; padding: 10px;');
console.log('%cBuilt Different. Worn Together.', 'font-size: 14px; color: white; font-style: italic;');
