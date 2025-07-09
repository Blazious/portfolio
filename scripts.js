// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Project filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Theme Toggle Functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved user preference or use system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply the current theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update button state
    if (currentTheme === 'dark') {
        themeToggle.setAttribute('aria-label', 'Switch to light theme');
    } else {
        themeToggle.setAttribute('aria-label', 'Switch to dark theme');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update button state
        if (newTheme === 'dark') {
            themeToggle.setAttribute('aria-label', 'Switch to light theme');
        } else {
            themeToggle.setAttribute('aria-label', 'Switch to dark theme');
        }
    });
}

// EmailJS Contact Form
document.addEventListener('DOMContentLoaded', function() {
    setupThemeToggle();
    
    emailjs.init('x--fuKsXcu_XdDA8o');
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            emailjs.sendForm('service_rma65cc', 'template_e19tw75', this)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showMessage('success', 'Thank you! Your message has been sent successfully.');
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('FAILED...', error);
                    showMessage('error', `Failed to send message. Error: ${error.text || 'Unknown error'}`);
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                });
        });
    }
});

// Helper function to show messages
function showMessage(type, text) {
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${text}</span>
    `;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Intersection Observer for animations
const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .pop-in');
const projectCardsAll = document.querySelectorAll('.project-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('project-card')) {
                entry.target.classList.add('visible');
            }
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(el => observer.observe(el));
projectCardsAll.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});