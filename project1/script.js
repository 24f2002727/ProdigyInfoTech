// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Section visibility animation
const sections = document.querySelectorAll('.section');
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  sections.forEach((section, index) => {
    const offset = scrollY * (0.5 - index * 0.05);
    section.style.backgroundPosition = `center ${offset}px`;
  });
});

// Newsletter form submission
const newsletterForm = document.getElementById('newsletter-form');
const emailInput = document.getElementById('email-input');
const formMessage = document.getElementById('form-message');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      formMessage.textContent = '❌ Please enter a valid email';
      formMessage.classList.add('error');
      formMessage.classList.remove('success');
      return;
    }
    
    // Simulate subscription
    formMessage.textContent = '⏳ Processing...';
    formMessage.classList.remove('error', 'success');
    
    setTimeout(() => {
      formMessage.textContent = '✅ Thanks for subscribing!';
      formMessage.classList.add('success');
      formMessage.classList.remove('error');
      emailInput.value = '';
      
      setTimeout(() => {
        formMessage.textContent = '';
      }, 3000);
    }, 800);
  });
}

// Copy to clipboard on contact item click
const contactItems = document.querySelectorAll('.contact-item');

contactItems.forEach(item => {
  item.addEventListener('click', () => {
    const text = item.querySelector('p').textContent.trim();
    
    navigator.clipboard.writeText(text).then(() => {
      const copyHint = item.querySelector('.copy-hint');
      const originalText = copyHint.textContent;
      
      copyHint.textContent = '✓ Copied!';
      copyHint.style.color = '#4ade80';
      
      setTimeout(() => {
        copyHint.textContent = originalText;
        copyHint.style.color = '#fbbf24';
      }, 2000);
    }).catch(() => {
      alert('Failed to copy');
    });
  });
});

// Button click feedback
const buttons = document.querySelectorAll('.btn-primary');

buttons.forEach(button => {
  button.addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = '';
    }, 150);
  });
});