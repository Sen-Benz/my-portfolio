// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Contact Form Handler
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('formMessage');

    // Basic validation
    if (!name || !email || !message) {
        showMessage('Please fill in all fields', 'danger');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address', 'danger');
        return;
    }

    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

    // Simulate API call
    setTimeout(() => {
        showMessage('✓ Message sent successfully! Thank you for reaching out. I\'ll get back to you soon.', 'success');
        this.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }, 1500);
});

// Show form messages
function showMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
}

// Navbar active link indicator
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav a');

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and skill elements
document.querySelectorAll('.card, .skill-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Toggle navbar collapse on link click
const navbarCollapse = document.querySelector('.navbar-collapse');
const navLinks = document.querySelectorAll('.navbar-nav a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            new (window.bootstrap.Collapse)(navbarCollapse).hide();
        }
    });
});

console.log('Portfolio website loaded successfully!');
