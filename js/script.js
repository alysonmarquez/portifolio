const header = document.querySelector("header");

window.addEventListener ("scroll", function() {
    header.classList.toggle ("sticky", window.scrollY > 40)
});

// Breadcrumbs functionality
const sections = document.querySelectorAll('section[id]');
const breadcrumbCurrent = document.getElementById('breadcrumb-current');

window.addEventListener('scroll', () => {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    if (currentSection && breadcrumbCurrent) {
        const sectionName = currentSection.charAt(0).toUpperCase() + currentSection.slice(1);
        breadcrumbCurrent.textContent = sectionName;
    }
});

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    navlist.classList.toggle('open');
    if(window.scrollY < 90){
        header.classList.toggle ("sticky");
    }
    
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('open');
}

const topo = document.getElementById("top");

window.addEventListener("scroll", function() {
    topo.classList.toggle ("show-top", window.scrollY > 140)
    topo.classList.toggle ("hide-top", window.scrollY < 140);
});

window.onload = () => {
    topo.classList.toggle ("hide-top");
}

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.setAttribute('data-theme', body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    themeToggle.innerHTML = body.getAttribute('data-theme') === 'dark' ? '<i class="bx bx-sun"></i>' : '<i class="bx bx-moon"></i>';
});

// Check for saved theme preference or default to system preference
const currentTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
body.setAttribute('data-theme', currentTheme);
themeToggle.innerHTML = currentTheme === 'dark' ? '<i class="bx bx-sun"></i>' : '<i class="bx bx-moon"></i>';

// Save theme preference
themeToggle.addEventListener('click', () => {
    const theme = body.getAttribute('data-theme');
    localStorage.setItem('theme', theme);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Animate stats numbers
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(interval);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 30);
    });
}

// Trigger animation when stats section is visible
const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            animateStats();
            entry.target.classList.add('animated');
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Portfolio cards enrichment and filters
const projectProfiles = {
    "Resource IT Marquez": {
        category: "Freelance Services",
        filters: "frontend automation ai",
        tags: ["HTML", "CSS", "JavaScript"],
        linkLabel: "Live Demo"
    },
    "Analisador de Currículos Tech": {
        category: "AI Tool",
        filters: "ai automation frontend",
        tags: ["AI", "JavaScript", "UX"],
        linkLabel: "GitHub"
    },
    "Atende.AI": {
        category: "Customer Service SaaS",
        filters: "saas automation ai backend",
        tags: ["Python", "Docker", "n8n", "SQL"],
        linkLabel: "GitHub"
    },
    "MediaFlow": {
        category: "Publishing SaaS",
        filters: "saas backend automation",
        tags: ["Next.js", "TypeScript", "Prisma", "OAuth"],
        linkLabel: "GitHub"
    },
    "Shopee Affiliate Bot": {
        category: "Affiliate Automation",
        filters: "automation backend",
        tags: ["Node.js", "Telegram API", "GitHub Actions"],
        linkLabel: "GitHub"
    },
    "Chess Competition": {
        category: "Competitive Platform",
        filters: "frontend backend",
        tags: ["React", "NestJS", "Socket.IO", "Redis"],
        linkLabel: "GitHub"
    },
    "Clinic Management System": {
        category: "Clinic Operations",
        filters: "frontend automation backend",
        tags: ["React", "Node.js", "WhatsApp", "CRM"],
        linkLabel: "GitHub"
    },
    "MVP for challenges and game monitoring.": {
        category: "Game Monitoring",
        filters: "backend frontend",
        tags: ["TypeScript", "Node.js", "PostgreSQL"],
        linkLabel: "GitHub"
    },
    "Insert in database": {
        category: "Workflow Backend",
        filters: "backend automation",
        tags: ["JavaScript", "SQL", "BPM"],
        linkLabel: "GitHub"
    },
    "Process Automation": {
        category: "Process Automation",
        filters: "automation",
        tags: ["BPM", "Automation", "Workflow"],
        linkLabel: "View flow"
    },
    "JavaScript function for Period Validation": {
        category: "Validation Utility",
        filters: "frontend automation",
        tags: ["JavaScript", "Validation"],
        linkLabel: "GitHub"
    },
    "function to format fields": {
        category: "Formatting Utility",
        filters: "frontend automation",
        tags: ["JavaScript", "Forms", "UX"],
        linkLabel: "GitHub"
    }
};

document.querySelectorAll('.portfolio-content .row').forEach(card => {
    const title = card.querySelector('h5')?.textContent.trim();
    const profile = projectProfiles[title];
    const layer = card.querySelector('.layer');
    const link = layer?.querySelector('a');

    if (!profile || !layer) return;

    card.dataset.category = profile.filters;

    if (!layer.querySelector('.project-category')) {
        const badge = document.createElement('span');
        badge.className = 'project-category';
        badge.textContent = profile.category;
        layer.insertBefore(badge, layer.querySelector('h5'));
    }

    if (!layer.querySelector('.tech-stack')) {
        const stack = document.createElement('div');
        stack.className = 'tech-stack';
        profile.tags.forEach(tag => {
            const item = document.createElement('span');
            item.textContent = tag;
            stack.appendChild(item);
        });
        if (link) {
            layer.insertBefore(stack, link);
        } else {
            layer.appendChild(stack);
        }
    }

    if (link) {
        const iconClass = profile.linkLabel === 'GitHub' ? 'bx bxl-github' : 'bx bx-link-external';
        link.innerHTML = `${profile.linkLabel} <i class="${iconClass}"></i>`;
        link.setAttribute('aria-label', `${profile.linkLabel} - ${title}`);
    }
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.portfolio-content .row');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        filterButtons.forEach(item => item.classList.remove('active'));
        button.classList.add('active');

        projectCards.forEach(card => {
            const categories = card.dataset.category || '';
            const shouldShow = filter === 'all' || categories.split(' ').includes(filter);
            card.classList.toggle('hide-project', !shouldShow);
        });
    });
});

// Progress bar
window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('progress-bar').style.width = scrollPercentage + '%';
});

// Loading spinner
window.addEventListener('load', () => {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.classList.add('hidden');
    }
});
