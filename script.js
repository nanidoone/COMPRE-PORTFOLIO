
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');
const seeMoreBtn = document.getElementById('seeMoreBtn');
const sideProjects = document.getElementById('sideProjects');
const skillHighlights = document.querySelectorAll('.skill-highlight');
const techItems = document.querySelectorAll('.tech-item');
const rgbOverlay = document.getElementById('rgbOverlay');


const skillTechMap = {
    'figma': 'figma',
    'html': 'html',
    'css': 'css',
    'javascript': 'javascript',
    'git': 'git',
    'github': 'github',
    'php': 'php',
    'mysql': 'mysql',
    'laravel': 'laravel',
    'react': 'react',
    'expo': 'expo',
    'android': 'android'
};

function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function smoothScrollTo(targetId, duration = 1500, offset = 100) {
    const target = document.querySelector(targetId);
    if (!target) return;
    
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function scrollAnimation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress);
        window.scrollTo(0, startPosition + distance * ease);
        if (progress < 1) requestAnimationFrame(scrollAnimation);
    }

    requestAnimationFrame(scrollAnimation);
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
        rect.bottom >= 0
    );
}


function initMobileMenu() {
    if (!mobileMenuToggle || !navLinks) return;
    
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
}


function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollTo(this.getAttribute('href'));
        });
    });
}


function initSeeMoreProjects() {
    if (!seeMoreBtn || !sideProjects) return;
    
    seeMoreBtn.addEventListener('click', () => {
        const isShown = sideProjects.classList.contains('show');
        if (!isShown) {
            sideProjects.classList.remove('hidden');
            sideProjects.classList.add('show');
            seeMoreBtn.textContent = 'Show Less';
            seeMoreBtn.classList.add('active');
        } else {
            sideProjects.classList.remove('show');
            sideProjects.classList.add('hidden');
            seeMoreBtn.textContent = 'See More Projects';
            seeMoreBtn.classList.remove('active');
            setTimeout(() => smoothScrollTo('#projects', 1200), 100);
        }
    });
}


function initSkillsHighlight() {
    skillHighlights.forEach(highlight => {
        highlight.addEventListener('mouseenter', () => {
            const techName = skillTechMap[highlight.getAttribute('data-skill')];
            if (techName) {
                techItems.forEach(item => {
                    if (item.getAttribute('data-tech') === techName) item.classList.add('highlight');
                });
            }
        });
        highlight.addEventListener('mouseleave', () => {
            techItems.forEach(item => item.classList.remove('highlight'));
        });
    });
}


function revealOnScroll() {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        if (isElementInViewport(el)) el.classList.add('revealed');
    });
}

function staggerReveal() {
    document.querySelectorAll('.stagger-reveal').forEach((el, index) => {
        if (isElementInViewport(el)) setTimeout(() => el.classList.add('revealed'), index * 100);
    });
}

function initScrollReveal() {
    const elementsToReveal = document.querySelectorAll(
        '.skill-card, .tech-item, .project-card, .about-content, .contact-form, .hero-text, .hero-image'
    );
    elementsToReveal.forEach(el => el.classList.add('reveal-on-scroll'));

    document.querySelectorAll('.hero-text, .about-content').forEach(el => el.classList.add('fade-in-left', 'reveal-on-scroll'));
    document.querySelectorAll('.hero-image, .contact-form').forEach(el => el.classList.add('fade-in-right', 'reveal-on-scroll'));

    document.querySelectorAll('.skill-card, .tech-item').forEach((el, index) => {
        el.classList.add('stagger-reveal');
        el.style.setProperty('--stagger-index', index);
    });

    revealOnScroll();
    staggerReveal();

    window.addEventListener('scroll', () => { revealOnScroll(); staggerReveal(); });
    window.addEventListener('resize', () => { revealOnScroll(); staggerReveal(); });
}




document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScrolling();
    initSeeMoreProjects();
    initSkillsHighlight();
    initRGBOverlay();
    initScrollReveal();
});



function initPdfModal() {
    const pdfModal = document.getElementById('pdfModal');
    const pdfCloseBtn = document.querySelector('.pdf-close-btn');
    const pdfViewer = document.getElementById('pdfViewer');
    const viewResumeBtn = document.getElementById('viewResumeBtn');
    const pdfUrl = 'files/ResumeM.pdf';

    viewResumeBtn.addEventListener('click', e => {
        e.preventDefault();
        pdfViewer.src = pdfUrl;
        pdfModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    function closePdfModal() {
        pdfModal.classList.remove('active');
        pdfViewer.src = '';
        document.body.style.overflow = 'auto';
    }

    pdfCloseBtn.addEventListener('click', closePdfModal);
    pdfModal.addEventListener('click', e => { if (e.target === pdfModal) closePdfModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && pdfModal.classList.contains('active')) closePdfModal(); });
}

document.addEventListener('DOMContentLoaded', initPdfModal);
