// Portfolio Website JavaScript - Advanced Version
class PortfolioApp {
    constructor() {
        this.isLoaded = false;
        this.observers = new Map();
        this.animations = new Map();
        this.init();
    }

    async init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        // Initialize all features with error handling
        try {
            this.initializeLoading();
            this.initializeNavigation();
            this.initializeThemeToggle();
            this.initializeMobileMenu();
            this.initializeTypingAnimation();
            this.initializeScrollAnimations();
            this.initializeSkillBars();
            this.initializeParticles();
            this.initializeContactForm();
            this.initializePerformanceOptimizations();
            this.initializeAccessibilityFeatures();
            this.initializeAdvancedAnimations();

            console.log('Portfolio app initialized successfully');
        } catch (error) {
            console.error('Error initializing portfolio app:', error);
        }
    }

    // Loading Screen with enhanced animations
    initializeLoading() {
        const loadingScreen = document.getElementById('loading-screen');

        if (!loadingScreen) return;

        // Add loading progress animation
        const loadingText = loadingScreen.querySelector('.loader-text');
        const loadingSteps = ['Loading...', 'Loading assets...', 'Almost ready...', 'Welcome!'];
        let stepIndex = 0;

        const progressInterval = setInterval(() => {
            if (stepIndex < loadingSteps.length) {
                loadingText.textContent = loadingSteps[stepIndex];
                stepIndex++;
            }
        }, 300);

        window.addEventListener('load', () => {
            clearInterval(progressInterval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    this.isLoaded = true;
                    this.triggerLoadedAnimations();
                }, 500);
            }, 800);
        });
    }

    triggerLoadedAnimations() {
        // Trigger entrance animations after loading
        const heroElements = document.querySelectorAll('.hero-text > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = `slideInLeft 0.6s ease-out forwards`;
            }, index * 100);
        });
    }

    // Enhanced Navigation with performance optimizations
    initializeNavigation() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!navbar || !navLinks.length) return;

        // Throttled scroll handler for better performance
        const throttledScrollHandler = this.throttle(() => {
            this.handleNavbarScroll(navbar);
            this.updateActiveNavOnScroll();
        }, 16); // ~60fps

        window.addEventListener('scroll', throttledScrollHandler, { passive: true });

        // Enhanced smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');

                // Only prevent default for internal hash links (starting with #)
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);

                    if (targetSection) {
                        this.smoothScrollToSection(targetSection, targetId);
                    }
                }
                // For external links (.html files), let the browser handle normally
            });
        });

        // Add keyboard navigation support
        navLinks.forEach(link => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    link.click();
                }
            });
        });
    }

    handleNavbarScroll(navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    smoothScrollToSection(targetSection, targetId) {
        const offsetTop = targetSection.offsetTop - 70;

        // Use modern scroll API with fallback
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        } else {
            // Fallback for older browsers
            this.animateScrollTo(offsetTop, 800);
        }

        // Update active link and close mobile menu
        this.updateActiveNavLink(targetId);
        this.closeMobileMenu();
    }

    animateScrollTo(to, duration) {
        const start = window.pageYOffset;
        const change = to - start;
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeInOutQuad = progress < 0.5
                ? 2 * progress * progress
                : -1 + (4 - 2 * progress) * progress;

            window.scrollTo(0, start + change * easeInOutQuad);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    }

    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = '#' + section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.updateActiveNavLink(sectionId);
            }
        });
    }

    closeMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }

    updateActiveNavLink(activeId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === activeId) {
                link.classList.add('active');
            }
        });
    }

    // Enhanced Theme Toggle with system preference detection
    initializeThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        const themeIcon = themeToggle.querySelector('i');

        // Check for saved theme preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

        this.setTheme(currentTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateThemeIcon(theme);

        // Animate theme transition
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    updateThemeIcon(theme) {
        const themeIcon = document.querySelector('#theme-toggle i');
        if (!themeIcon) return;

        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    // Enhanced Mobile Menu with accessibility
    initializeMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (!hamburger || !navMenu) return;

        // Add ARIA attributes
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.setAttribute('aria-expanded', 'false');

        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.contains('active');
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Update ARIA attributes
            hamburger.setAttribute('aria-expanded', !isActive);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                this.closeMobileMenu();
                hamburger.focus();
            }
        });
    }

    // Enhanced Typing Animation with better performance
    initializeTypingAnimation() {
        const typingText = document.querySelector('.typing-text');
        if (!typingText) return;

        const texts = [
            'Web Developer',
            'Engineer',
            'Cricketer',
            'Problem Solver',
            'Creative Thinker',
            'Full Stack Developer'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        let animationId;

        const typeText = () => {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = Math.random() * 100 + 50; // Variable typing speed
            }

            if (!isDeleting && charIndex === currentText.length) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500;
            }

            animationId = setTimeout(typeText, typingSpeed);
        };

        // Start animation
        typeText();

        // Store animation ID for cleanup
        this.animations.set('typing', animationId);

        // Pause animation when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearTimeout(animationId);
            } else {
                typeText();
            }
        });
    }

    // Enhanced Scroll Animations with performance optimization
    initializeScrollAnimations() {
        const observerOptions = {
            threshold: [0.1, 0.3, 0.5],
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Add staggered animation for child elements
                    const children = entry.target.querySelectorAll('.skill-item, .project-card, .service-card');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('visible');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe all sections and animated elements
        const elementsToAnimate = document.querySelectorAll('section, .skill-item, .project-card, .service-card');
        elementsToAnimate.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });

        // Store observer for cleanup
        this.observers.set('scroll', observer);

        // Add parallax effect to hero section
        this.initializeParallaxEffect();
    }

    initializeParallaxEffect() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        const parallaxHandler = this.throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }, 16);

        window.addEventListener('scroll', parallaxHandler, { passive: true });
    }

    // Enhanced Skill Bars with counter animation
    initializeSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        if (!skillItems.length) return;

        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillProgress = entry.target.querySelector('.skill-progress');
                    const skillPercentage = entry.target.querySelector('.skill-percentage');
                    const targetWidth = parseInt(skillProgress.getAttribute('data-width'));

                    // Animate progress bar
                    setTimeout(() => {
                        skillProgress.style.width = targetWidth + '%';
                    }, 300);

                    // Animate percentage counter
                    this.animateCounter(skillPercentage, 0, targetWidth, 1500);

                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        skillItems.forEach(item => {
            skillObserver.observe(item);
        });

        this.observers.set('skills', skillObserver);
    }

    animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        const originalText = element.textContent;

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * progress);

            element.textContent = current + '%';

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };

        requestAnimationFrame(updateCounter);
    }

    // Enhanced Particles with theme adaptation
    initializeParticles() {
        if (typeof particlesJS === 'undefined') return;

        const getParticleColor = () => {
            const theme = document.documentElement.getAttribute('data-theme');
            return theme === 'dark' ? '#ffffff' : '#667eea';
        };

        const particleConfig = {
            particles: {
                number: {
                    value: window.innerWidth < 768 ? 40 : 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: getParticleColor()
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: getParticleColor(),
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: !window.matchMedia('(pointer: coarse)').matches,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        };

        particlesJS('particles-js', particleConfig);

        // Update particles on theme change
        document.addEventListener('themechange', () => {
            particlesJS('particles-js', particleConfig);
        });
    }

    // Utility Methods
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Performance Optimizations
    initializePerformanceOptimizations() {
        // Lazy load images
        this.initializeLazyLoading();

        // Preload critical resources
        this.preloadCriticalResources();

        // Optimize scroll performance
        this.optimizeScrollPerformance();
    }

    initializeLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalResources() {
        const criticalResources = [
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
            'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.css') ? 'style' : 'script';
            document.head.appendChild(link);
        });
    }

    optimizeScrollPerformance() {
        let ticking = false;

        const updateScrollElements = () => {
            // Update scroll-dependent elements
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollElements);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // Accessibility Features
    initializeAccessibilityFeatures() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupScreenReaderSupport();
    }

    setupKeyboardNavigation() {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Tab navigation for interactive elements
        const interactiveElements = document.querySelectorAll('button, a, input, textarea, select');
        interactiveElements.forEach((el, index) => {
            el.setAttribute('tabindex', index + 1);
        });
    }

    setupFocusManagement() {
        // Focus management for modal-like interactions
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const focusableElements = document.querySelectorAll(
                    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
                );

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }

    setupScreenReaderSupport() {
        // Add ARIA labels and descriptions
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            if (!section.getAttribute('aria-label')) {
                const heading = section.querySelector('h1, h2, h3, h4, h5, h6');
                if (heading) {
                    section.setAttribute('aria-labelledby', heading.id || `section-${index}`);
                    if (!heading.id) heading.id = `section-${index}`;
                }
            }
        });
    }

    // Advanced Animations
    initializeAdvancedAnimations() {
        this.setupScrollTriggeredAnimations();
        this.setupHoverEffects();
        this.setupLoadingAnimations();
    }

    setupScrollTriggeredAnimations() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animationType = entry.target.dataset.animate;
                    entry.target.classList.add(`animate-${animationType}`);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => animationObserver.observe(el));
    }

    setupHoverEffects() {
        // Add magnetic effect to buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
    }

    setupLoadingAnimations() {
        // Staggered loading animations
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // Enhanced Contact Form
    initializeContactForm() {
        const contactForm = document.getElementById('contact-form');

        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(contactForm);
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    handleFormSubmission(form) {
        this.clearFormErrors();

        const formData = new FormData(form);
        const errors = this.validateForm(formData);

        if (errors.length > 0) {
            this.displayFormErrors(errors);
            return;
        }

        this.submitForm(formData, form);
    }

    validateForm(formData) {
        const errors = [];

        // Enhanced validation with better patterns
        const validations = [
            {
                field: 'name',
                value: formData.get('name').trim(),
                rules: [
                    { test: (v) => v.length > 0, message: 'Name is required' },
                    { test: (v) => v.length >= 2, message: 'Name must be at least 2 characters' },
                    { test: (v) => /^[a-zA-Z\s]+$/.test(v), message: 'Name can only contain letters and spaces' }
                ]
            },
            {
                field: 'email',
                value: formData.get('email').trim(),
                rules: [
                    { test: (v) => v.length > 0, message: 'Email is required' },
                    { test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), message: 'Please enter a valid email address' }
                ]
            },
            {
                field: 'subject',
                value: formData.get('subject').trim(),
                rules: [
                    { test: (v) => v.length > 0, message: 'Subject is required' },
                    { test: (v) => v.length >= 5, message: 'Subject must be at least 5 characters' }
                ]
            },
            {
                field: 'message',
                value: formData.get('message').trim(),
                rules: [
                    { test: (v) => v.length > 0, message: 'Message is required' },
                    { test: (v) => v.length >= 10, message: 'Message must be at least 10 characters' },
                    { test: (v) => v.length <= 1000, message: 'Message must be less than 1000 characters' }
                ]
            }
        ];

        validations.forEach(({ field, value, rules }) => {
            const failedRule = rules.find(rule => !rule.test(value));
            if (failedRule) {
                errors.push({ field, message: failedRule.message });
            }
        });

        return errors;
    }

    validateField(field) {
        const formData = new FormData();
        formData.set(field.name, field.value);
        const errors = this.validateForm(formData);
        const fieldError = errors.find(error => error.field === field.name);

        if (fieldError) {
            this.displayFieldError(field, fieldError.message);
        } else {
            this.clearFieldError(field);
        }
    }

    displayFormErrors(errors) {
        errors.forEach(error => {
            const field = document.getElementById(error.field);
            this.displayFieldError(field, error.message);
        });

        // Focus on first error field
        if (errors.length > 0) {
            const firstErrorField = document.getElementById(errors[0].field);
            firstErrorField.focus();
        }
    }

    displayFieldError(field, message) {
        const errorElement = field.parentNode.querySelector('.error-message');
        field.style.borderColor = '#e53e3e';
        field.setAttribute('aria-invalid', 'true');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    clearFormErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

        errorMessages.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });

        formInputs.forEach(input => {
            input.style.borderColor = 'var(--border-color)';
            input.removeAttribute('aria-invalid');
        });
    }

    clearFieldError(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        field.style.borderColor = 'var(--border-color)';
        field.removeAttribute('aria-invalid');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    submitForm(formData, form) {
        const formStatus = document.getElementById('form-status');
        const submitButton = form.querySelector('button[type="submit"]');

        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        // Simulate API call with realistic delay
        const submitPromise = new Promise((resolve) => {
            setTimeout(resolve, Math.random() * 2000 + 1000);
        });

        submitPromise.then(() => {
            // Reset button
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            submitButton.disabled = false;

            // Show success message
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Thank you! Your message has been sent successfully.';
            formStatus.style.display = 'block';

            // Reset form
            form.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);

            // Analytics tracking (if available)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'contact',
                    event_label: 'contact_form'
                });
            }
        }).catch((error) => {
            // Handle error
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            submitButton.disabled = false;

            formStatus.className = 'form-status error';
            formStatus.textContent = 'Sorry, there was an error sending your message. Please try again.';
            formStatus.style.display = 'block';

            console.error('Form submission error:', error);
        });
    }

    // Cleanup method
    destroy() {
        // Clear all observers
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();

        // Clear all animations
        this.animations.forEach(animation => clearTimeout(animation));
        this.animations.clear();

        // Remove event listeners
        window.removeEventListener('scroll', this.throttledScrollHandler);
        window.removeEventListener('resize', this.debouncedResizeHandler);
    }
}

// Initialize the portfolio app
const portfolioApp = new PortfolioApp();

// Simple navigation fix for external links
document.addEventListener('DOMContentLoaded', () => {
    // Fix for external navigation links in navbar
    setTimeout(() => {
        const navbarLinks = document.querySelectorAll('.nav-menu .nav-link[href$=".html"]');
        navbarLinks.forEach(link => {
            // Remove any existing event listeners and add a simple click handler
            link.onclick = function(e) {
                e.stopPropagation();
                window.location.href = this.getAttribute('href');
                return false;
            };
        });
    }, 100); // Small delay to ensure other scripts have loaded
});

// Add loading class to body to prevent flash of unstyled content
document.body.classList.add('loading');
window.addEventListener('load', () => {
    document.body.classList.remove('loading');
});