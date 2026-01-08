
document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Progress Bar
    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
        const windowScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (windowScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    }, { passive: true });

    // 2. Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => card.style.display = 'none', 400);
                }
            });
        });
    });

    // 3. Section Reveal with Intersection Observer
    const observerOptions = { 
        threshold: 0.05, 
        rootMargin: '0px 0px -50px 0px' 
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .project-card, .stat-item, .contact-item-card').forEach(el => {
        el.classList.add('reveal-item');
        observer.observe(el);
    });

    // 4. Parallax Profile Image (Disabled for mobile/touch for performance)
    if (window.matchMedia("(min-width: 768px)").matches) {
        window.addEventListener('mousemove', (e) => {
            const profile = document.querySelector('.profile-container');
            if (!profile) return;
            const moveX = (e.clientX - window.innerWidth / 2) / 40;
            const moveY = (e.clientY - window.innerHeight / 2) / 40;
            profile.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }, { passive: true });
    }

    // 5. Dynamic Active Nav State
    const navItems = document.querySelectorAll('.dock-item');
    window.addEventListener('scroll', () => {
        let current = "";
        const sections = document.querySelectorAll('section, header');
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute("id") || "header";
            }
        });

        navItems.forEach((item) => {
            item.classList.remove("active-nav");
            const href = item.getAttribute("href").substring(1);
            if (href === current || (current === "header" && href === "about")) {
                item.classList.add("active-nav");
            }
        });
    }, { passive: true });

    // Inject active styles
    const activeStyle = document.createElement('style');
    activeStyle.innerHTML = `
        .active-nav { background: var(--primary) !important; border-color: rgba(255,255,255,0.4) !important; }
        .active-nav img { filter: brightness(0) invert(1) !important; }
    `;
    document.head.appendChild(activeStyle);
});
