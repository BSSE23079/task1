document.addEventListener('DOMContentLoaded', () => {

    /* Project Filtering */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                card.style.display =
                    filter === 'all' || card.dataset.category === filter
                        ? 'flex'
                        : 'none';
            });
        });
    });

    /* Section Reveal */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('section, .project-card')
        .forEach(el => observer.observe(el));

    /* Typing Effect */
    const subtitle = document.querySelector('header h2');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;

        (function type() {
            if (i < text.length) {
                subtitle.textContent += text[i++];
                setTimeout(type, 80);
            }
        })();
    }

});
