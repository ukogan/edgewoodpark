// ===== ANIMATIONS CONTROLLER =====

// Animation utilities and advanced effects
class AnimationController {
    constructor() {
        this.observers = new Map();
        this.animations = new Map();
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupPageTransitions();
        this.setupParallaxEffects();
        this.setupCounterAnimations();
        this.setupProgressBars();
        this.setupTypewriter();
        this.setupMorphing();
        this.setupParticles();
        this.setupStagger();
    }
    
    // ===== SCROLL ANIMATIONS =====
    setupScrollAnimations() {
        if (this.isReducedMotion) return;
        
        const observerOptions = {
            threshold: [0.1, 0.25, 0.5, 0.75, 1.0],
            rootMargin: '0px 0px -100px 0px'
        };
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerScrollAnimation(entry.target, entry.intersectionRatio);
                }
            });
        }, observerOptions);
        
        this.observers.set('scroll', scrollObserver);
        
        // Observe elements
        document.querySelectorAll('.animate-on-scroll, .scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale').forEach(element => {
            scrollObserver.observe(element);
        });
    }
    
    triggerScrollAnimation(element, ratio) {
        const animationType = this.getAnimationType(element);
        
        switch (animationType) {
            case 'slide-up':
                this.slideUp(element);
                break;
            case 'slide-left':
                this.slideLeft(element);
                break;
            case 'slide-right':
                this.slideRight(element);
                break;
            case 'scale':
                this.scaleIn(element);
                break;
            case 'fade':
                this.fadeIn(element);
                break;
            default:
                this.slideUp(element);
        }
        
        // Add stagger delay if part of a group
        if (element.hasAttribute('data-stagger')) {
            const delay = parseInt(element.getAttribute('data-stagger')) * 100;
            element.style.animationDelay = `${delay}ms`;
        }
    }
    
    getAnimationType(element) {
        if (element.classList.contains('scroll-reveal-left')) return 'slide-left';
        if (element.classList.contains('scroll-reveal-right')) return 'slide-right';
        if (element.classList.contains('scroll-reveal-scale')) return 'scale';
        if (element.classList.contains('animate-fade-in')) return 'fade';
        return 'slide-up';
    }
    
    // ===== ANIMATION METHODS =====
    slideUp(element) {
        element.style.animation = 'slideUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        element.classList.add('animate-in');
    }
    
    slideLeft(element) {
        element.style.animation = 'slideLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        element.classList.add('animate-in');
    }
    
    slideRight(element) {
        element.style.animation = 'slideRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        element.classList.add('animate-in');
    }
    
    scaleIn(element) {
        element.style.animation = 'scaleIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        element.classList.add('animate-in');
    }
    
    fadeIn(element) {
        element.style.animation = 'fadeIn 0.6s ease-out forwards';
        element.classList.add('animate-in');
    }
    
    // ===== HOVER ANIMATIONS =====
    setupHoverAnimations() {
        const hoverElements = document.querySelectorAll('.hover-lift, .hover-scale, .hover-glow, .hover-shake, .hover-pulse');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.triggerHoverAnimation(element, 'enter');
            });
            
            element.addEventListener('mouseleave', () => {
                this.triggerHoverAnimation(element, 'leave');
            });
        });
    }
    
    triggerHoverAnimation(element, state) {
        if (this.isReducedMotion) return;
        
        const animationClasses = element.className.split(' ').filter(cls => cls.startsWith('hover-'));
        
        animationClasses.forEach(cls => {
            switch (cls) {
                case 'hover-lift':
                    this.animateLift(element, state);
                    break;
                case 'hover-scale':
                    this.animateScale(element, state);
                    break;
                case 'hover-glow':
                    this.animateGlow(element, state);
                    break;
                case 'hover-shake':
                    if (state === 'enter') this.animateShake(element);
                    break;
                case 'hover-pulse':
                    if (state === 'enter') this.animatePulse(element);
                    break;
            }
        });
    }
    
    animateLift(element, state) {
        if (state === 'enter') {
            element.style.transform = 'translateY(-8px)';
            element.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        } else {
            element.style.transform = 'translateY(0)';
            element.style.boxShadow = '';
        }
    }
    
    animateScale(element, state) {
        if (state === 'enter') {
            element.style.transform = 'scale(1.05)';
        } else {
            element.style.transform = 'scale(1)';
        }
    }
    
    animateGlow(element, state) {
        if (state === 'enter') {
            element.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.3)';
        } else {
            element.style.boxShadow = '';
        }
    }
    
    animateShake(element) {
        element.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }
    
    animatePulse(element) {
        element.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 1000);
    }
    
    // ===== PAGE TRANSITIONS =====
    setupPageTransitions() {
        const links = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('target') === '_blank') return;
                
                e.preventDefault();
                this.pageTransition(link.href);
            });
        });
    }
    
    pageTransition(url) {
        if (this.isReducedMotion) {
            window.location.href = url;
            return;
        }
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--primary-green), var(--accent-green));
            z-index: 9999;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(overlay);
        
        // Animate overlay in
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
        });
        
        // Navigate after animation
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    }
    
    // ===== PARALLAX EFFECTS =====
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-medium, .parallax-fast');
        
        if (parallaxElements.length === 0 || this.isReducedMotion) return;
        
        let ticking = false;
        
        const updateParallax = () => {
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            parallaxElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + scrollTop;
                const elementHeight = rect.height;
                
                // Only animate if element is in viewport
                if (rect.bottom >= 0 && rect.top <= windowHeight) {
                    const speed = this.getParallaxSpeed(element);
                    const yPos = (scrollTop - elementTop) * speed;
                    
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
    }
    
    getParallaxSpeed(element) {
        if (element.classList.contains('parallax-slow')) return 0.5;
        if (element.classList.contains('parallax-medium')) return 0.3;
        if (element.classList.contains('parallax-fast')) return 0.1;
        return 0.5;
    }
    
    // ===== COUNTER ANIMATIONS =====
    setupCounterAnimations() {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.stat-number, .counter').forEach(element => {
            counterObserver.observe(element);
        });
    }
    
    animateCounter(element) {
        if (element.classList.contains('counted') || this.isReducedMotion) return;
        
        const target = parseInt(element.getAttribute('data-target')) || parseInt(element.textContent);
        const duration = parseInt(element.getAttribute('data-duration')) || 2000;
        const prefix = element.getAttribute('data-prefix') || '';
        const suffix = element.getAttribute('data-suffix') || '';
        
        let current = 0;
        const increment = target / (duration / 16);
        
        const updateCounter = () => {
            current += increment;
            
            if (current >= target) {
                current = target;
                element.textContent = prefix + Math.floor(current) + suffix;
                element.classList.add('counted');
                return;
            }
            
            element.textContent = prefix + Math.floor(current) + suffix;
            requestAnimationFrame(updateCounter);
        };
        
        updateCounter();
    }
    
    // ===== PROGRESS BARS =====
    setupProgressBars() {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateProgressBar(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.progress-fill').forEach(element => {
            progressObserver.observe(element);
        });
    }
    
    animateProgressBar(element) {
        if (element.classList.contains('animated') || this.isReducedMotion) return;
        
        const targetWidth = element.getAttribute('data-width') || '100%';
        const duration = parseInt(element.getAttribute('data-duration')) || 1500;
        
        element.style.transition = `width ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        element.style.width = targetWidth;
        element.classList.add('animated');
    }
    
    // ===== TYPEWRITER EFFECT =====
    setupTypewriter() {
        const typewriterElements = document.querySelectorAll('.typewriter');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.getAttribute('data-speed')) || 50;
            
            element.textContent = '';
            element.style.borderRight = '2px solid var(--primary-green)';
            
            let i = 0;
            const typeChar = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeChar, speed);
                } else {
                    // Blinking cursor
                    setInterval(() => {
                        element.style.borderRight = element.style.borderRight === '2px solid transparent' ? 
                            '2px solid var(--primary-green)' : '2px solid transparent';
                    }, 500);
                }
            };
            
            // Start typing when element is in view
            const typeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeChar();
                        typeObserver.unobserve(element);
                    }
                });
            });
            
            typeObserver.observe(element);
        });
    }
    
    // ===== MORPHING EFFECTS =====
    setupMorphing() {
        const morphElements = document.querySelectorAll('.morph-on-scroll');
        
        const morphObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerMorph(entry.target);
                }
            });
        });
        
        morphElements.forEach(element => {
            morphObserver.observe(element);
        });
    }
    
    triggerMorph(element) {
        if (this.isReducedMotion) return;
        
        const startPath = element.getAttribute('data-start-path');
        const endPath = element.getAttribute('data-end-path');
        
        if (startPath && endPath) {
            this.animatePath(element, startPath, endPath);
        }
    }
    
    animatePath(element, startPath, endPath) {
        const svg = element.querySelector('path');
        if (!svg) return;
        
        svg.setAttribute('d', startPath);
        
        const animate = svg.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animate.setAttribute('attributeName', 'd');
        animate.setAttribute('from', startPath);
        animate.setAttribute('to', endPath);
        animate.setAttribute('dur', '1s');
        animate.setAttribute('fill', 'freeze');
        
        svg.appendChild(animate);
        animate.beginElement();
    }
    
    // ===== PARTICLE EFFECTS =====
    setupParticles() {
        const particleContainers = document.querySelectorAll('.particles');
        
        particleContainers.forEach(container => {
            this.createParticles(container);
        });
    }
    
    createParticles(container) {
        if (this.isReducedMotion) return;
        
        const particleCount = parseInt(container.getAttribute('data-count')) || 50;
        const particleColor = container.getAttribute('data-color') || 'var(--primary-green)';
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: ${particleColor};
                border-radius: 50%;
                opacity: 0.7;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            container.appendChild(particle);
        }
    }
    
    // ===== STAGGER ANIMATIONS =====
    setupStagger() {
        const staggerGroups = document.querySelectorAll('.stagger-group');
        
        staggerGroups.forEach(group => {
            const children = group.children;
            const delay = parseInt(group.getAttribute('data-stagger-delay')) || 100;
            
            Array.from(children).forEach((child, index) => {
                child.style.animationDelay = `${index * delay}ms`;
                child.classList.add('animate-on-scroll');
            });
        });
    }
    
    // ===== MAGNETIC CURSOR =====
    setupMagneticCursor() {
        if (this.isReducedMotion || 'ontouchstart' in window) return;
        
        const cursor = document.createElement('div');
        cursor.className = 'magnetic-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--primary-green);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        document.querySelectorAll('.btn, .nav-link').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }
    
    // ===== CLEANUP =====
    destroy() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        
        this.animations.forEach(animation => {
            animation.cancel();
        });
        
        this.observers.clear();
        this.animations.clear();
    }
}

// ===== PERFORMANCE MONITORING =====
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            animationFrames: 0,
            lastFrameTime: 0,
            fps: 0
        };
        
        this.startMonitoring();
    }
    
    startMonitoring() {
        const measureFPS = (timestamp) => {
            this.metrics.animationFrames++;
            
            if (timestamp - this.metrics.lastFrameTime >= 1000) {
                this.metrics.fps = Math.round((this.metrics.animationFrames * 1000) / (timestamp - this.metrics.lastFrameTime));
                this.metrics.animationFrames = 0;
                this.metrics.lastFrameTime = timestamp;
                
                // If FPS drops below threshold, reduce animations
                if (this.metrics.fps < 30) {
                    this.reduceAnimations();
                }
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        requestAnimationFrame(measureFPS);
    }
    
    reduceAnimations() {
        document.body.classList.add('reduce-animations');
        
        // Disable complex animations
        document.querySelectorAll('.parallax-slow, .parallax-medium, .parallax-fast').forEach(element => {
            element.style.transform = 'none';
        });
        
        // Reduce animation duration
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
    }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    const animationController = new AnimationController();
    const performanceMonitor = new PerformanceMonitor();
    
    // Setup magnetic cursor on desktop
    if (window.innerWidth > 1024) {
        animationController.setupMagneticCursor();
    }
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        animationController.destroy();
    });
    
    // Handle resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-device');
        } else {
            document.body.classList.remove('mobile-device');
        }
    });
    
    // Export for global access
    window.animationController = animationController;
    window.performanceMonitor = performanceMonitor;
});

// ===== ANIMATION PRESETS =====
const AnimationPresets = {
    // Entrance animations
    entrance: {
        slideUp: 'slideUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        slideDown: 'slideDown 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        slideLeft: 'slideLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        slideRight: 'slideRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        scaleIn: 'scaleIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fadeIn: 'fadeIn 0.6s ease-out'
    },
    
    // Hover animations
    hover: {
        lift: 'transform: translateY(-4px); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);',
        scale: 'transform: scale(1.05);',
        glow: 'box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);'
    },
    
    // Micro-interactions
    micro: {
        bounce: 'transform: scale(0.95);',
        pulse: 'animation: pulse 1s ease-in-out;',
        shake: 'animation: shake 0.5s ease-in-out;'
    }
};

// ===== UTILITY FUNCTIONS =====
function applyAnimation(element, preset, type) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const animation = AnimationPresets[preset]?.[type];
    if (animation) {
        if (animation.includes('animation:')) {
            element.style.animation = animation.replace('animation:', '');
        } else {
            element.style.cssText += animation;
        }
    }
}

function createCustomAnimation(element, keyframes, options = {}) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const animation = element.animate(keyframes, {
        duration: options.duration || 600,
        easing: options.easing || 'ease-out',
        fill: options.fill || 'forwards',
        delay: options.delay || 0
    });
    
    return animation;
}

// ===== EXPORT FOR MODULES =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AnimationController,
        PerformanceMonitor,
        AnimationPresets,
        applyAnimation,
        createCustomAnimation
    };
}
