/**
 * Integrated Wastewater Treatment Website
 * Main JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // Navigation Toggle (Mobile)
    // ============================================

    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger to X
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (navToggle) {
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // FAQ Accordion
    // ============================================

    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ============================================
    // Navbar Scroll Effect
    // ============================================

    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 10px 30px rgba(77, 124, 15, 0.15)';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = '0 10px 30px rgba(77, 124, 15, 0.08)';
            navbar.style.background = 'var(--color-surface)';
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // Scroll Animations (Fade In)
    // ============================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.section-header, .module-content, .spec-card, .roi-card, ' +
        '.process-step, .stat-card, .point-card, .team-story'
    );

    animatedElements.forEach(el => observer.observe(el));

    // ============================================
    // Water Flow Line Animation Enhancement
    // ============================================

    function animateFlowLines() {
        const flowLines = document.querySelectorAll('.flow-line');

        flowLines.forEach(line => {
            const rect = line.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                line.style.opacity = '0.8';
                line.style.transform = 'translateX(-50%) scaleY(1.2)';
            }
        });
    }

    window.addEventListener('scroll', animateFlowLines);
    animateFlowLines(); // Initial check

    // ============================================
    // Module Cards Hover Effect Enhancement
    // ============================================

    const specCards = document.querySelectorAll('.spec-card');

    specCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--color-primary)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--color-muted)';
        });
    });

    // ============================================
    // Parallax Effect for Hero Background
    // ============================================

    const heroBackground = document.querySelector('.hero-background');
    const hero = document.querySelector('.hero');

    if (heroBackground && hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;

            if (scrolled < hero.offsetHeight) {
                heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // ============================================
    // System Flow Stages Animation
    // ============================================

    function animateFlowStages() {
        const stages = document.querySelectorAll('.stage');

        stages.forEach((stage, index) => {
            const rect = stage.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;

            if (isVisible) {
                setTimeout(() => {
                    stage.style.opacity = '1';
                    stage.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }

    // Initialize stage styles
    document.querySelectorAll('.stage').forEach(stage => {
        stage.style.opacity = '0';
        stage.style.transform = 'translateY(20px)';
        stage.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', animateFlowStages);
    animateFlowStages(); // Initial check

    // ============================================
    // ROI Cards Counter Animation
    // ============================================

    function animateValue(obj, start, end, duration, suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);

            if (suffix === '$') {
                obj.textContent = '$' + value;
            } else if (suffix === '%') {
                obj.textContent = value + '%';
            } else {
                obj.textContent = value;
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.textContent = (suffix === '$' ? '$' : '') + end + suffix;
            }
        };
        window.requestAnimationFrame(step);
    }

    // Observe ROI cards for counter animation
    const roiObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const roiValue = entry.target.querySelector('.roi-value');
                if (roiValue && !roiValue.classList.contains('animated')) {
                    roiValue.classList.add('animated');

                    const text = roiValue.textContent;
                    if (text.includes('$')) {
                        const num = parseInt(text.replace(/\D/g, ''));
                        animateValue(roiValue, 0, num, 2000);
                    }
                }
                roiObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.roi-card').forEach(card => {
        roiObserver.observe(card);
    });

    // ============================================
    // Active Navigation Link Highlighting
    // ============================================

    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.style.color = '');
                if (navLink) {
                    navLink.style.color = 'var(--color-secondary)';
                    navLink.style.fontWeight = '700';
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ============================================
    // Performance Stats Animation
    // ============================================

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValue = entry.target.querySelector('.stat-value');
                if (statValue && !statValue.classList.contains('animated')) {
                    statValue.classList.add('animated');

                    const text = statValue.textContent.trim();
                    if (text.includes('%')) {
                        const num = parseFloat(text.replace('%', ''));
                        animateValue(statValue, 0, num, 2000, '%');
                    } else if (text.includes('-')) {
                        // Handle range values like "11-14"
                        statValue.style.opacity = '0';
                        setTimeout(() => {
                            statValue.style.transition = 'opacity 0.5s';
                            statValue.style.opacity = '1';
                        }, 100);
                    } else if (text === 'WHO') {
                        // Skip WHO text
                        statValue.style.opacity = '1';
                    } else {
                        const num = parseInt(text.replace(/\D/g, ''));
                        animateValue(statValue, 0, num, 2000);
                    }
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-card').forEach(card => {
        statsObserver.observe(card);
    });

    // ============================================
    // Image Lazy Loading Enhancement
    // ============================================

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // Easter Egg: Console Message
    // ============================================

    console.log('%c💧 Integrated Wastewater Treatment Solutions', 'color: #4d7c0f; font-size: 20px; font-weight: bold;');
    console.log('%cDeveloped by 404TEAMNOTFOUND | Chiang Mai University', 'color: #a21caf; font-size: 14px;');
    console.log('%c🌿 Clean Water, Sustainable Future', 'color: #bef264; font-size: 12px;');

    // ============================================
    // Accessibility: Keyboard Navigation
    // ============================================

    // Add focus-visible class for keyboard users
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });

    // ============================================
    // Loading Animation Removal (if loading screen added)
    // ============================================

    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

});

// ============================================
// Mobile Touch Enhancement
// ============================================

if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');

    // Add touch feedback to buttons
    const buttons = document.querySelectorAll('.btn, .faq-question');

    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });

        button.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
}
