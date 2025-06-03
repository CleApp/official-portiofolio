      document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const sections = document.querySelectorAll('.animate-on-scroll'); // Select sections for animation

    // Toggle hamburger menu
    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active'); // Toggles class on navbar itself
    });

    // Smooth scrolling for navigation links and close menu on click
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close the mobile menu if open
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
            }

            // Scroll to section
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate skill bars and sections on scroll
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Handle skill bar animation
                if (entry.target.classList.contains('skill-item')) {
                    const progressBar = entry.target.querySelector('.progress');
                    const width = progressBar.style.width; // Get width from inline style
                    progressBar.style.width = width; // Re-apply to trigger transition
                }
                // Handle section fade-in/slide-up animation
                if (entry.target.classList.contains('animate-on-scroll')) {
                    entry.target.classList.add('is-visible');
                }
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe all skill items and sections
    document.querySelectorAll('.skill-item').forEach(item => {
        observer.observe(item);
    });
    sections.forEach(section => {
        observer.observe(section);
    });

    // Initial check for elements already in view on page load
    // This ensures elements visible on load are animated without scrolling
    const initialCheckObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skill-item')) {
                    const progressBar = entry.target.querySelector('.progress');
                    const width = progressBar.style.width;
                    progressBar.style.width = width;
                }
                if (entry.target.classList.contains('animate-on-scroll')) {
                    entry.target.classList.add('is-visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Lower threshold for initial check

    document.querySelectorAll('.skill-item, .animate-on-scroll').forEach(element => {
        initialCheckObserver.observe(element);
    });

    // You would add more JavaScript here for:
    // 1. Form submission (e.g., using Fetch API to send data to a serverless function)
    // 2. Any other complex animations or dynamic content loading.
});