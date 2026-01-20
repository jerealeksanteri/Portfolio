const terminalText = [
    "> Hello stranger", 
    "> Yes YOU!", 
    "> My name is Jere Niemi", 
    "> Welcome to my profile", 
    "> . . . . . . . :)"
];
const terminalDisplay = document.getElementById("terminal-text");
const cursor = document.getElementById("cursor");

let index = 0;
let charIndex = 0;
const typingSpeed = 100;
const lineSpeed = 700;
let typingActive = true;

// Type the text
function type() {

    // If the typing is not active, return
    if (currentSectionIndex !== 0) return;

    if (index < terminalText.length) {
        if (charIndex < terminalText[index].length) {
            // Get the text content
            const text = terminalText[index].substring(0, charIndex + 1);
            // Replace the text content with the new text content
            terminalDisplay.innerHTML = text.replace(/\n/g, "<br>");
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            terminalDisplay.innerHTML += "<br>";
            index++;
            charIndex = 0;
            setTimeout(type, lineSpeed);
        }
    } else if (index === terminalText.length) {
        cursor.style.display = "none";
        scrollToSection(1);
    }
}

// Move the cursor
function updateCursorPosition() {
    // Get the text content
    const text = terminalDisplay.textContent;

    // Add the cursor
    terminalDisplay.appendChild(cursor);
}

// Start the typing effect when the window loads
window.onload = () => {

    setInterval(updateCursorPosition, 50); // Regularly update the cursor position
    type();

    updateNavHighlight();

    navLinks.forEach((link, index) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            scrollToSection(index+1);
        });
    });
    

};


// Scroll behavior to ensure one section scroll per action
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-item a');
let isScrolling = false;
let currentSectionIndex = 0;

function scrollToSection(index) {

    console.log(index);
    if (index >= 0 && index < sections.length) {
        sections[index].scrollIntoView({ behavior: 'smooth' });
        currentSectionIndex = index;
        updateNavHighlight();
    }
}

// Update the nav link highlight
function updateNavHighlight() {
    navLinks.forEach((link, index) => {
        if (index+1 === currentSectionIndex) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}


// For desktop, handle scroll events
function handleScroll(event) {
    // Check if the event target is inside a scrollable container
    let target = event.target;
    while (target && target !== document.body) {
        if (target.classList && (target.classList.contains('job-history') || target.classList.contains('stack') || target.classList.contains('projects'))) {
            // Inside a scrollable section, don't handle section navigation
            return;
        }
        target = target.parentElement;
    }

    if (isScrolling) return;
    isScrolling = true;

    const direction = event.deltaY > 0 ? 1 : -1;
    const nextSectionIndex = currentSectionIndex + direction;

    scrollToSection(nextSectionIndex);

    setTimeout(() => {
        isScrolling = false;
    }, 1200);
}


// For mobile, handle touch events
let touchStartY = 0;
let touchEndY = 0;

function handleTouchStart(event) {
    // Check if touch is inside a scrollable container
    let target = event.target;
    while (target && target !== document.body) {
        if (target.classList && (target.classList.contains('job-history') || target.classList.contains('stack') || target.classList.contains('projects'))) {
            // Inside a scrollable section, don't handle section navigation
            return;
        }
        target = target.parentElement;
    }
    touchStartY = event.touches[0].clientY;
}

function handleTouchEnd(event) {
    // Check if touch is inside a scrollable container
    let target = event.target;
    while (target && target !== document.body) {
        if (target.classList && (target.classList.contains('job-history') || target.classList.contains('stack') || target.classList.contains('projects'))) {
            // Inside a scrollable section, don't handle section navigation
            return;
        }
        target = target.parentElement;
    }

    touchEndY = event.changedTouches[0].clientY;
    const direction = touchStartY - touchEndY > 0 ? 1 : -1;

    if (!isScrolling) {
        isScrolling = true;
        const nextSectionIndex = currentSectionIndex + direction;

        scrollToSection(nextSectionIndex);

        setTimeout(() => {
            isScrolling = false;
        }, 1200);
    }
}

// Add event listeners
window.addEventListener('wheel', handleScroll, { passive: false });
window.addEventListener('touchstart', handleTouchStart, { passive: false });
window.addEventListener('touchend', handleTouchEnd, { passive: false });


function loadObject(id, path) {
    fetch(path)
        .then(response => response.text())
        .then((html) => {
            document.getElementById(id).innerHTML = html;

            // Dynamically load the styles
            const style = document.createElement('link');
            style.rel = 'stylesheet';
            style.href = `${path.replace("index.html", "styles.css")}`;
            style.onload = () => console.log(`Styles loaded for ${path}`);
            document.head.appendChild(style);

            // Dynamically load the scripts
            const script = document.createElement('script');
            script.src = `${path.replace("index.html", "scripts.js")}`;
            script.onload = () => console.log(`Script loaded for ${path}`);
            document.body.appendChild(script);
        })
        .catch((error) => {
            console.error(`Error loading path ${path}:`, error);
        });
};



// Load the objects
loadObject('job-history', 'history/index.html');
loadObject('stack', 'stack/index.html');
loadObject('projects', 'projects/index.html');

    