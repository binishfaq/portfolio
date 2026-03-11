/* ─── Typing effect ─────────────────────────── */
const words = ["Web Developer", "Frontend Dev", "IT Student", "Problem Solver"];
let i = 0, j = 0, isDeleting = false;
const typingElement = document.getElementById("typing");

function typeEffect() {
    const currentWord = words[i];
    typingElement.textContent = isDeleting
        ? currentWord.substring(0, j - 1)
        : currentWord.substring(0, j + 1);

    isDeleting ? j-- : j++;

    if (!isDeleting && j === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1800);
        return;
    }
    if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % words.length;
    }
    setTimeout(typeEffect, isDeleting ? 55 : 110);
}
typeEffect();

/* ─── Theme toggle ──────────────────────────── */
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const icon = themeToggle.querySelector("i");
    icon.className = document.body.classList.contains("light")
        ? "fas fa-sun"
        : "fas fa-moon";
});

/* ─── Mobile menu ───────────────────────────── */
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
});

/* ─── Smooth scroll ─────────────────────────── */
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

/* ─── Active nav on scroll ──────────────────── */
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.nav-links a');
    let current = '';
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 120) {
            current = section.getAttribute('id');
        }
    });
    links.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}, { passive: true });

/* ─── Scroll reveal ─────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
function reveal() {
    revealEls.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 130) {
            el.classList.add('active');
        }
    });
}
window.addEventListener('scroll', reveal, { passive: true });
reveal();

/* ─── Back to top ───────────────────────────── */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 300);
}, { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ─── Skills ────────────────────────────────── */
const skills = [
    { name: "HTML5",      icon: "fab fa-html5" },
    { name: "CSS3",       icon: "fab fa-css3-alt" },
    { name: "JavaScript", icon: "fab fa-js" },
    { name: "React",      icon: "fab fa-react" },
    { name: "Node.js",    icon: "fab fa-node" },
    { name: "Express",    icon: "fas fa-server" },
    { name: "MySQL",      icon: "fas fa-database" },
    { name: "MongoDB",    icon: "fas fa-leaf" },
    { name: "Git",        icon: "fab fa-git-alt" }
];

const skillsContainer = document.getElementById('skillsContainer');
skills.forEach(skill => {
    const el = document.createElement('div');
    el.className = 'skill-icon-item';
    el.innerHTML = `<i class="${skill.icon}"></i><span>${skill.name}</span>`;
    skillsContainer.appendChild(el);
});

function animateSkills() {
    document.querySelectorAll('.skill-icon-item').forEach((item, idx) => {
        if (item.getBoundingClientRect().top < window.innerHeight - 60) {
            setTimeout(() => item.classList.add('visible'), idx * 55);
        }
    });
}
window.addEventListener('scroll', animateSkills, { passive: true });
animateSkills();

/* ─── GitHub projects ───────────────────────── */
const githubUsername = 'binishfaq';
const projectsContainer = document.getElementById('github-projects');

const languageColors = {
    JavaScript: '#f7df1e', HTML: '#e34c26', CSS: '#563d7c',
    Python: '#3572A5', Java: '#b07219', 'C++': '#f34b7d',
    TypeScript: '#2b7489', PHP: '#4F5D95', Ruby: '#701516',
    Go: '#00ADD8', Rust: '#dea584', Swift: '#ffac45',
    Kotlin: '#F18E33', Dart: '#00B4AB', 'C#': '#178600',
};

fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`)
    .then(res => {
        if (!res.ok) throw new Error('GitHub API error');
        return res.json();
    })
    .then(repos => {
        projectsContainer.innerHTML = '';
        repos.forEach(repo => {
            const language = repo.language || 'Unknown';
            const color = languageColors[language] || '#8b8b8b';
            const card = document.createElement('div');
            card.className = 'project-card';
            card.setAttribute('data-tilt', '');
            card.innerHTML = `
                <div class="project-header">
                    <span class="project-name">${repo.name}</span>
                    <span class="project-stars"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                </div>
                <p class="project-description">${repo.description || 'No description provided.'}</p>
                <div class="project-language">
                    <span class="language-color" style="background:${color}"></span>
                    <span>${language}</span>
                </div>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank" rel="noopener"><i class="fab fa-github"></i> Code</a>
                    ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> Live</a>` : ''}
                </div>
            `;
            projectsContainer.appendChild(card);
        });

        VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
            max: 6, speed: 400, glare: true, "max-glare": 0.2
        });
    })
    .catch(() => {
        projectsContainer.innerHTML = '<p class="loader">Unable to load projects. Please check back later.</p>';
    });

/* ─── Contact form ──────────────────────────── */
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        e.target.reset();
    }, 2500);
});

// particlesJS call has been removed