const sections = document.querySelectorAll("section");

function revealSections() {
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight / 1.2;

    if (sectionTop < triggerPoint) {
      section.classList.add("visible");
    } else {
      section.classList.remove("visible"); 
    }
  });
}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections); 


const navbar = document.querySelector(".navbar");

function shrinkNavbar() {
  if (window.scrollY > 50) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }
}

window.addEventListener("scroll", shrinkNavbar);


const typingElement = document.querySelector(".home-section h2");
const roles = ["Front-End Developer ", "UI/UX Enthusiast ", "Creative Designer "];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];
  typingElement.textContent = isDeleting
    ? currentRole.substring(0, charIndex--)
    : currentRole.substring(0, charIndex++);

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    setTimeout(typeEffect, 2000);
    return;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(typeEffect, isDeleting ? 50 : 150);
}

typeEffect();