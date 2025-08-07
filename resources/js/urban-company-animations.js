// JavaScript for Urban Company Style Animations and Interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SMOOTH SCROLLING =====
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

    // ===== NAVBAR SCROLL EFFECT =====
    let navbar = document.querySelector('.navbar-urban, .navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });

    // ===== STAGGERED ANIMATIONS FOR GRIDS =====
    function animateGrid(gridSelector, itemSelector, delay = 100) {
        const grid = document.querySelector(gridSelector);
        if (grid) {
            const items = grid.querySelectorAll(itemSelector);
            items.forEach((item, index) => {
                item.style.animationDelay = `${index * delay}ms`;
                item.classList.add('scroll-animate');
            });
        }
    }

    // Apply staggered animations
    animateGrid('.category-grid-urban', '.category-item');
    animateGrid('.service-grid', '.service-card');
    animateGrid('.testimonials-urban', '.testimonial-card');

    // ===== RIPPLE EFFECT =====
    function createRipple(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add ripple effect to buttons
    document.querySelectorAll('.btn-urban-primary, .btn-urban-outline, .ripple').forEach(btn => {
        btn.addEventListener('click', createRipple);
    });

    // ===== LOADING ANIMATION =====
    function showLoading(element) {
        element.innerHTML = '<span class="loading-spinner"></span> Loading...';
        element.disabled = true;
    }

    function hideLoading(element, originalText) {
        element.innerHTML = originalText;
        element.disabled = false;
    }

    // ===== SEARCH FUNCTIONALITY WITH ANIMATION =====
    const searchForm = document.querySelector('.hero-search, .search-form');
    if (searchForm) {
        const searchInput = searchForm.querySelector('.form-control');
        const searchBtn = searchForm.querySelector('.search-btn, .btn');
        
        if (searchInput && searchBtn) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const originalText = searchBtn.innerHTML;
                showLoading(searchBtn);
                
                // Simulate search delay
                setTimeout(() => {
                    hideLoading(searchBtn, originalText);
                    // Add your search logic here
                }, 2000);
            });

            // Search input focus animation
            searchInput.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
            });

            searchInput.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
                this.parentElement.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            });
        }
    }

    // ===== CARD HOVER EFFECTS =====
    document.querySelectorAll('.service-card, .category-item, .testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===== COUNTER ANIMATION =====
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Animate counters when they come into view
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const endValue = parseInt(counter.getAttribute('data-count') || counter.textContent.replace(/,/g, ''));
                animateCounter(counter, 0, endValue, 2000);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stats-number').forEach(counter => {
        counterObserver.observe(counter);
    });

    // ===== FORM VALIDATION WITH ANIMATIONS =====
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.classList.add('shake');
            this.style.borderColor = '#dc3545';
            
            setTimeout(() => {
                this.classList.remove('shake');
            }, 500);
        });

        input.addEventListener('input', function() {
            if (this.validity.valid) {
                this.style.borderColor = '#28a745';
            } else {
                this.style.borderColor = '#dc3545';
            }
        });
    });

    // ===== MODAL ANIMATIONS =====
    document.querySelectorAll('[data-bs-toggle="modal"]').forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-bs-target');
            const modal = document.querySelector(modalId);
            if (modal) {
                modal.querySelector('.modal-dialog').style.transform = 'scale(0.7) translateY(-100px)';
                modal.querySelector('.modal-dialog').style.opacity = '0';
                
                setTimeout(() => {
                    modal.querySelector('.modal-dialog').style.transform = 'scale(1) translateY(0)';
                    modal.querySelector('.modal-dialog').style.opacity = '1';
                }, 150);
            }
        });
    });

    // ===== LAZY LOADING IMAGES =====
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('loading-skeleton');
                    img.classList.add('fade-in');
                    imageObserver.unobserve(img);
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('img[data-src]').forEach(img => {
        img.classList.add('loading-skeleton');
        imageObserver.observe(img);
    });

    // ===== DROPDOWN ANIMATIONS =====
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const menu = this.nextElementSibling;
            if (menu && menu.classList.contains('dropdown-menu')) {
                menu.style.opacity = '0';
                menu.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    menu.style.opacity = '1';
                    menu.style.transform = 'translateY(0)';
                }, 10);
            }
        });
    });

    // ===== PARALLAX EFFECT =====
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // ===== FLOATING BUTTON =====
    function createFloatingButton() {
        const floatingBtn = document.createElement('button');
        floatingBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        floatingBtn.className = 'btn-floating btn-urban-primary';
        floatingBtn.style.display = 'none';
        document.body.appendChild(floatingBtn);

        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                floatingBtn.style.display = 'flex';
            } else {
                floatingBtn.style.display = 'none';
            }
        });

        floatingBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    createFloatingButton();

    // ===== TYPEWRITER EFFECT =====
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Apply typewriter effect to specific elements
    document.querySelectorAll('.typewriter').forEach(element => {
        const text = element.textContent;
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter(element, text);
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(element);
    });

    // ===== MOBILE MENU ANIMATION =====
    const mobileToggle = document.querySelector('.navbar-toggler');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse) {
                navbarCollapse.style.transition = 'all 0.3s ease';
            }
        });
    }

    // ===== PAGE TRANSITION EFFECT =====
    function pageTransition() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }

    // Apply page transition on load
    pageTransition();

    // ===== CUSTOM CURSOR (Optional) =====
    function createCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(0, 0, 0, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            display: none;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.style.display = 'block';
        });

        document.addEventListener('mouseenter', function() {
            cursor.style.display = 'block';
        });

        document.addEventListener('mouseleave', function() {
            cursor.style.display = 'none';
        });

        // Scale cursor on hover over interactive elements
        document.querySelectorAll('a, button, .btn, input, textarea').forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.background = 'rgba(0, 0, 0, 0.6)';
            });

            element.addEventListener('mouseleave', function() {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'rgba(0, 0, 0, 0.8)';
            });
        });
    }

    // Uncomment to enable custom cursor
    // createCustomCursor();

});

// ===== CSS ANIMATIONS ADDED VIA JAVASCRIPT =====
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        position: absolute !important;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .fade-in {
        animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    .shake {
        animation: shake 0.5s ease;
    }

    .in-view {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .scroll-animate {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @media (prefers-reduced-motion: reduce) {
        .scroll-animate {
            opacity: 1 !important;
            transform: none !important;
        }
    }
`;
document.head.appendChild(style);
