(function() {
    'use strict';

    const grid = document.getElementById('work-grid');
    let cards = [];

    async function loadCards() {
        try {
            const res = await fetch('cards.json');
            if (!res.ok) throw new Error('Failed to fetch cards.json');
            cards = await res.json();
            renderCards();
            revealStatic();
        } catch (e) {
            console.error('Failed to load cards data', e);
        }
    }

    // Render grid
    function renderCards(filter = 'all') {
        grid.innerHTML = '';
        let delay = 0;
        cards.forEach((card, index) => {
            if (filter !== 'all' && card.type.toLowerCase() !== filter) return;

            const article = document.createElement('article');
            article.className = 'card';
            article.setAttribute('data-type', card.type.toLowerCase());

            const isVideo = card.type === 'Video' && card.mp4;
            const mediaHtml = isVideo
                ? `<div class="card-media"><img src="images/${card.preview}" alt="${card.title}" loading="lazy" decoding="async"><video src="videos/${card.mp4}" muted loop playsinline preload="none" disablePictureInPicture></video></div>`
                : `<div class="card-media"><img src="images/${card.preview}" alt="${card.title}" loading="lazy" decoding="async"></div>`;

            article.innerHTML = `
                <a href="${card.slug}" class="card-link" aria-label="${card.title}">
                    ${mediaHtml}
                    <div class="card-overlay"></div>
                    <div class="card-info">
                        <h3 class="card-title">${card.title}</h3>
                        <span class="card-date">${card.date}</span>
                    </div>
                </a>
            `;

            grid.appendChild(article);

            // Video hover behavior
            if (isVideo) {
                const video = article.querySelector('video');
                article.addEventListener('mouseenter', () => {
                    video.style.opacity = '1';
                    video.play().catch(() => {});
                });
                article.addEventListener('mouseleave', () => {
                    video.pause();
                    video.currentTime = 0;
                    video.style.opacity = '0';
                });
            }

            delay += 0.05;
        });

        observeCards();
    }

    // Intersection observer for scroll reveal
    function observeCards() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appeared');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.card:not(.appeared)').forEach(card => observer.observe(card));
    }

    // Menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', () => {
        document.body.classList.toggle('menu-open');
        const expanded = document.body.classList.contains('menu-open');
        menuToggle.setAttribute('aria-expanded', expanded);
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (document.body.classList.contains('menu-open') && !e.target.closest('.header') && !e.target.closest('.menu-overlay')) {
            document.body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Category dropdown
    const dropdown = document.querySelector('.category-dropdown');
    const trigger = dropdown.querySelector('.category-trigger');
    const list = dropdown.querySelector('.category-list');
    const options = list.querySelectorAll('li');

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.toggle('open');
        trigger.setAttribute('aria-expanded', isOpen);
        list.setAttribute('aria-hidden', !isOpen);
    });

    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            options.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            dropdown.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
            list.setAttribute('aria-hidden', 'true');
            renderCards(option.dataset.filter);
        });
    });

    document.addEventListener('click', () => {
        dropdown.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        list.setAttribute('aria-hidden', 'true');
    });

    // Initial reveal for static elements
    function revealStatic() {
        document.querySelectorAll('.appear').forEach(el => {
            const delay = parseFloat(el.dataset.appearDelay) || 0;
            el.style.transitionDelay = `${delay}s`;
            el.classList.add('appeared');
        });
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadCards);
    } else {
        loadCards();
    }
})();
