// Services Page JavaScript - Professional and Animated

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initScrollEffects();
    initServiceAnimations();
    initProcessSteps();
    initServiceCards();
    initCounterAnimations();
    initSmoothScrolling();
    initLoadingAnimations();
});

// Mobile Navigation Menu
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger menu
            if (navLinks.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '✕';
                mobileMenuBtn.style.transform = 'rotate(180deg)';
            } else {
                mobileMenuBtn.innerHTML = '☰';
                mobileMenuBtn.style.transform = 'rotate(0deg)';
            }
        });

        // Close mobile menu when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '☰';
                mobileMenuBtn.style.transform = 'rotate(0deg)';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '☰';
                mobileMenuBtn.style.transform = 'rotate(0deg)';
            }
        });
    }
}

// Scroll Effects - Header and Background Parallax
function initScrollEffects() {
    const header = document.querySelector('header');
    const servicesHero = document.querySelector('.services-hero');
    
    function handleScroll() {
        const scrollTop = window.pageYOffset;
        
        // Header scroll effect
        if (header) {
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Parallax effect for hero section
        if (servicesHero) {
            const parallaxSpeed = scrollTop * 0.5;
            servicesHero.style.transform = `translateY(${parallaxSpeed}px)`;
        }
        
        // Trigger animations for elements in viewport
        animateOnScroll();
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Service Detail Cards Animation
function initServiceAnimations() {
    const serviceDetails = document.querySelectorAll('.service-detail');
    
    serviceDetails.forEach((service, index) => {
        // Add loading class initially
        service.classList.add('loading');
        
        // Stagger animation delay
        service.style.animationDelay = `${index * 0.2}s`;
    });
}

// Process Steps Hover Effects
function initProcessSteps() {
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach((step, index) => {
        // Add entrance animation
        step.classList.add('loading');
        step.style.animationDelay = `${0.8 + (index * 0.1)}s`;
        
        // Add interactive hover effects
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            
            // Add ripple effect
            createRippleEffect(this, event);
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click animation
        step.addEventListener('click', function() {
            this.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            }, 150);
        });
    });
}

// Service Cards Interactive Effects
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-detail');
    
    serviceCards.forEach(card => {
        const btn = card.querySelector('.btn');
        const priceElement = card.querySelector('.price');
        
        // Add hover effects to the entire card
        card.addEventListener('mouseenter', function() {
            // Animate price element
            if (priceElement) {
                priceElement.style.transform = 'scale(1.1)';
                priceElement.style.color = '#1d4ed8';
            }
            
            // Add subtle glow effect
            this.style.boxShadow = '0 25px 80px rgba(37, 99, 235, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (priceElement) {
                priceElement.style.transform = 'scale(1)';
                priceElement.style.color = '#2563eb';
            }
            
            this.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.08)';
        });
        
        // Button click effect
        if (btn) {
            btn.addEventListener('click', function(e) {
                // Create expanding circle effect
                const rect = this.getBoundingClientRect();
                const circle = document.createElement('div');
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                circle.style.width = circle.style.height = size + 'px';
                circle.style.left = x + 'px';
                circle.style.top = y + 'px';
                circle.style.position = 'absolute';
                circle.style.borderRadius = '50%';
                circle.style.background = 'rgba(255, 255, 255, 0.3)';
                circle.style.transform = 'scale(0)';
                circle.style.pointerEvents = 'none';
                circle.style.zIndex = '10';
                
                this.appendChild(circle);
                
                // Animate the circle
                circle.animate([
                    { transform: 'scale(0)', opacity: '1' },
                    { transform: 'scale(1)', opacity: '0' }
                ], {
                    duration: 600,
                    easing: 'ease-out'
                }).addEventListener('finish', () => {
                    circle.remove();
                });
            });
        }
    });
}

// Counter Animations for Stats
function initCounterAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateCounters() {
        if (animated) return;
        
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const numericValue = parseInt(finalValue.replace(/\D/g, '')) || 0;
            const suffix = finalValue.replace(/\d/g, '');
            
            if (numericValue > 0) {
                let currentValue = 0;
                const increment = numericValue / 30; // 30 steps
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        currentValue = numericValue;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(currentValue) + suffix;
                }, 50);
            }
        });
        
        animated = true;
    }
    
    // Trigger when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateCounters, 800);
            }
        });
    }, { threshold: 0.3 });
    
    const heroSection = document.querySelector('.services-hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
}

// Smooth Scrolling for Internal Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Loading Animations with Intersection Observer
function initLoadingAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with loading class
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => observer.observe(el));
}

// Scroll-triggered Animations
function animateOnScroll() {
    const serviceDetails = document.querySelectorAll('.service-detail');
    
    serviceDetails.forEach(service => {
        const rect = service.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        
        if (isVisible && !service.classList.contains('animate')) {
            service.classList.add('animate');
        }
    });
}

// Create Ripple Effect on Click
function createRippleEffect(element, event) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('div');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1000';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // Animate ripple
    ripple.animate([
        { transform: 'scale(0)', opacity: '1' },
        { transform: 'scale(2)', opacity: '0' }
    ], {
        duration: 600,
        easing: 'ease-out'
    }).addEventListener('finish', () => {
        ripple.remove();
    });
}

// Feature List Animation
function initFeatureListAnimations() {
    const featureLists = document.querySelectorAll('.feature-list');
    
    featureLists.forEach(list => {
        const items = list.querySelectorAll('li');
        
        const listObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                            item.style.transition = 'all 0.5s ease';
                        }, index * 100);
                    });
                    listObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        // Initially hide items
        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
        });
        
        listObserver.observe(list);
    });
}

// Service Badge Animations
function initServiceBadgeAnimations() {
    const badges = document.querySelectorAll('.service-badge');
    
    badges.forEach(badge => {
        // Add hover effects
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = 'none';
        });
        
        // Add pulse animation for popular badge
        if (badge.textContent.toLowerCase().includes('popular')) {
            setInterval(() => {
                badge.style.animation = 'pulse 1s ease-in-out';
                setTimeout(() => {
                    badge.style.animation = '';
                }, 1000);
            }, 3000);
        }
    });
}

// Advanced Button Interactions
function initAdvancedButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Add magnetic effect
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-2px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0px, 0px) translateY(0px)';
        });
        
        // Add loading state simulation
        button.addEventListener('click', function(e) {
            if (!this.classList.contains('loading-btn')) {
                e.preventDefault();
                
                const originalText = this.textContent;
                this.classList.add('loading-btn');
                this.style.opacity = '0.7';
                this.style.pointerEvents = 'none';
                
                // Simulate loading
                let dots = '';
                const loadingInterval = setInterval(() => {
                    dots = dots.length < 3 ? dots + '.' : '';
                    this.textContent = 'Loading' + dots;
                }, 300);
                
                // Reset after 2 seconds
                setTimeout(() => {
                    clearInterval(loadingInterval);
                    this.textContent = originalText;
                    this.classList.remove('loading-btn');
                    this.style.opacity = '1';
                    this.style.pointerEvents = 'auto';
                    
                    // Navigate to actual link
                    if (this.getAttribute('href')) {
                        window.location.href = this.getAttribute('href');
                    }
                }, 2000);
            }
        });
    });
}

// Pricing Animation Effects
function initPricingAnimations() {
    const priceElements = document.querySelectorAll('.price');
    
    priceElements.forEach(price => {
        // Add number counting animation when visible
        const priceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animatePriceNumber(entry.target);
                    priceObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        priceObserver.observe(price);
    });
}

function animatePriceNumber(priceElement) {
    const text = priceElement.textContent;
    const numbers = text.match(/\d+/g);
    
    if (numbers) {
        const originalNumber = parseInt(numbers[0]);
        const prefix = text.split(originalNumber)[0];
        const suffix = text.split(originalNumber)[1];
        
        let currentNumber = 0;
        const increment = originalNumber / 20;
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= originalNumber) {
                currentNumber = originalNumber;
                clearInterval(timer);
            }
            priceElement.textContent = prefix + Math.floor(currentNumber) + suffix;
        }, 50);
    }
}

// Parallax Effects for Service Images
function initParallaxEffects() {
    const serviceImages = document.querySelectorAll('.service-detail-image');
    
    window.addEventListener('scroll', () => {
        serviceImages.forEach(image => {
            const rect = image.getBoundingClientRect();
            const speed = 0.3;
            const yPos = -(rect.top * speed);
            
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                image.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
}

// Easter Egg - Konami Code
function initEasterEgg() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let userInput = [];
    
    document.addEventListener('keydown', function(e) {
        userInput.push(e.code);
        userInput = userInput.slice(-konamiCode.length);
        
        if (JSON.stringify(userInput) === JSON.stringify(konamiCode)) {
            activateEasterEgg();
            userInput = [];
        }
    });
}

function activateEasterEgg() {
    // Add special effects
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    // Add rainbow animation keyframes
    if (!document.querySelector('#rainbow-style')) {
        const style = document.createElement('style');
        style.id = 'rainbow-style';
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Reset after 5 seconds
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
    
    // Show easter egg message
    showNotification('🎉 You found the easter egg! Extra discount coming your way!');
}

// Notification System
function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
}

// Initialize additional animations on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Add small delay to ensure all elements are rendered
    setTimeout(() => {
        initFeatureListAnimations();
        initServiceBadgeAnimations();
        initAdvancedButtonEffects();
        initPricingAnimations();
        initParallaxEffects();
        initEasterEgg();
    }, 100);
});

// Performance optimization - Intersection Observer for expensive operations
const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Only run expensive animations when elements are visible
            entry.target.classList.add('in-viewport');
        } else {
            entry.target.classList.remove('in-viewport');
        }
    });
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Graceful degradation - ensure basic functionality still works
});

// Page Visibility API - Pause animations when tab is not active
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause expensive animations
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations
        document.body.style.animationPlayState = 'running';
    }
});