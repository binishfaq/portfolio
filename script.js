// Particles initialization
particlesJS("particles-js", {
    particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: "#3b82f6" },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#3b82f6", opacity: 0.2, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } }
    }
});

// Typing effect
const words = ["Web Developer", "Full Stack Developer", "IT Student", "Problem Solver"];
let i = 0, j = 0;
let currentWord = "";
let isDeleting = false;
const typingElement = document.getElementById("typing");

function typeEffect() {
    currentWord = words[i];
    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, j - 1);
        j--;
    } else {
        typingElement.textContent = currentWord.substring(0, j + 1);
        j++;
    }

    if (!isDeleting && j === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
        return;
    }
    if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % words.length;
    }
    setTimeout(typeEffect, isDeleting ? 60 : 120);
}
typeEffect();

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
themeToggle.addEventListener("click", () => {
    body.classList.toggle("light");
    const icon = themeToggle.querySelector("i");
    if (body.classList.contains("light")) {
        icon.className = "fas fa-sun";
    } else {
        icon.className = "fas fa-moon";
    }
});

// Mobile menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
});

// Smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
        navLinks.classList.remove('active');
    });
});

// Active link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll reveal
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 150) {
            el.classList.add('active');
        }
    });
}
window.addEventListener('scroll', reveal);
reveal();

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Skills data
// Skills data with icons (Font Awesome classes)
const skills = [
    { name: "HTML5", icon: "fab fa-html5" },
    { name: "CSS3", icon: "fab fa-css3-alt" },
    { name: "JavaScript", icon: "fab fa-js" },
    { name: "React", icon: "fab fa-react" },
    { name: "Node.js", icon: "fab fa-node" },
    { name: "Express", icon: "fas fa-server" },
    { name: "MySQL", icon: "fas fa-database" },
    { name: "MongoDB", icon: "fas fa-leaf" },
    { name: "Git & GitHub", icon: "fab fa-git-alt" }
];

const skillsContainer = document.getElementById('skillsContainer');
skills.forEach(skill => {
    const skillEl = document.createElement('div');
    skillEl.className = 'skill-icon-item';
    skillEl.innerHTML = `
        <i class="${skill.icon}"></i>
        <span>${skill.name}</span>
    `;
    skillsContainer.appendChild(skillEl);
});

// Animate skill bars when they become visible
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && bar.style.width === '0%') {
            const percent = bar.getAttribute('data-percent');
            bar.style.width = percent + '%';
        }
    });
}
window.addEventListener('scroll', animateSkills);
animateSkills(); // initial check

// GitHub API fetch
const githubUsername = 'binishfaq';
const projectsContainer = document.getElementById('github-projects');

fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`)
    .then(res => res.json())
    .then(repos => {
        projectsContainer.innerHTML = '';
        repos.forEach(repo => {
            // Fetch language colors (simplified, just a placeholder color)
            const languageColors = {
                JavaScript: '#f7df1e',
                HTML: '#e34c26',
                CSS: '#563d7c',
                Python: '#3572A5',
                Java: '#b07219',
                'C++': '#f34b7d',
                TypeScript: '#2b7489',
                PHP: '#4F5D95',
                Ruby: '#701516',
                Go: '#00ADD8',
                Rust: '#dea584',
                Swift: '#ffac45',
                Kotlin: '#F18E33',
                Dart: '#00B4AB',
                'C#': '#178600',
            };
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
                    <span class="language-color" style="background: ${color};"></span>
                    <span>${language}</span>
                </div>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank"><i class="fab fa-github"></i> Code</a>
                    ${repo.homepage ? `<a href="${repo.homepage}" target="_blank"><i class="fas fa-external-link-alt"></i> Live</a>` : ''}
                </div>
            `;
            projectsContainer.appendChild(card);
        });
        // Reinitialize tilt
        VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
            max: 8,
            speed: 400,
            glare: true,
            "max-glare": 0.3
        });
    })
    .catch(err => {
        projectsContainer.innerHTML = '<p>Unable to load projects. Please check back later.</p>';
        console.error(err);
    });

// Contact form dummy submit
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! (This is a demo, no actual email sent.)');
    e.target.reset();
});

// Initial tilt for any existing cards
VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 8,
    speed: 400,
    glare: true,
    "max-glare": 0.3
});