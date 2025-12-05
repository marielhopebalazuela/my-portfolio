const limits = { 'dtect': 12, 'burn': 7 };
let indices = { 'dtect': 1, 'burn': 1 };

// --- Image Slider ---
function changeImage(project, direction) {
    indices[project] += direction;
    if (indices[project] > limits[project]) indices[project] = 1;
    if (indices[project] < 1) indices[project] = limits[project];
    const imgElement = document.getElementById(`img-${project}`);
    if (imgElement) imgElement.src = `images/${project}${indices[project]}.png`;
}

// --- Scroll Animation ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
});
document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

// --- Mobile Hamburger Menu ---
const hamburger = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

function closeMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

// --- Scroll Progress Bar ---
window.onscroll = function() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
};

// --- Typewriter Effect (Intelligent Systems Only) ---
const typeWriterElement = document.getElementById('typewriter');
const texts = ["Intelligent Systems"]; // Only one specialization
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typeWriterElement.innerHTML = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeWriterElement.innerHTML = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = 100; 

    if (isDeleting) {
        typeSpeed /= 2; 
    }

    if (!isDeleting && charIndex === currentText.length) {
        // IF there is only one text, STOP here (don't delete)
        if (texts.length === 1) {
            return; 
        }
        
        typeSpeed = 2000; 
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; 
    }

    setTimeout(type, typeSpeed);
}

// Start typing when loaded
document.addEventListener('DOMContentLoaded', type);