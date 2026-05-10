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
