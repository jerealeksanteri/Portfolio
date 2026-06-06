const terminalText = [
    "> Hello stranger",
    "> My name is Jere Niemi", 
    "> Welcome to my Portfolio", 
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

    const navEl = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');

    function closeNav() {
        if (!navEl || !navToggle) return;
        navEl.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    if (navToggle && navEl) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navEl.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        document.addEventListener('click', (e) => {
            if (!navEl.classList.contains('is-open')) return;
            if (navEl.contains(e.target) || navToggle.contains(e.target)) return;
            closeNav();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeNav();
        });
    }

    navLinks.forEach((link, index) => {
        link.addEventListener('click', () => {
            scrollToSection(index+1);
            closeNav();
        });
    });
    

};


// Section state — kept for the terminal intro flow and nav highlighting.
// Actual scrolling is driven by native CSS scroll-snap.
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-item a');
let currentSectionIndex = 0;

function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
        sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
        currentSectionIndex = index;
        updateNavHighlight();
    }
}

// Update the nav link highlight
function updateNavHighlight() {
    navLinks.forEach((link, index) => {
        if (index + 1 === currentSectionIndex) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Track which section is in view via IntersectionObserver — far cheaper and
// jitter-free compared to wheel/touch math.
const scrollRoot = document.querySelector('.content');
const sectionObserver = new IntersectionObserver(
    (entries) => {
        let best = null;
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            if (!best || entry.intersectionRatio > best.intersectionRatio) {
                best = entry;
            }
        }
        if (best) {
            const idx = Array.prototype.indexOf.call(sections, best.target);
            if (idx !== -1 && idx !== currentSectionIndex) {
                currentSectionIndex = idx;
                updateNavHighlight();
            }
        }
    },
    { root: scrollRoot, threshold: [0.5, 0.75] }
);

sections.forEach((s) => sectionObserver.observe(s));

function loadObject(id, path) {
    // On localhost, bust caches so CSS/JS edits reload reliably during dev.
    const isLocal = ['localhost', '127.0.0.1', '::1'].includes(location.hostname);
    const bust = isLocal ? `?t=${Date.now()}` : '';

    fetch(path + bust)
        .then(response => response.text())
        .then((html) => {
            document.getElementById(id).innerHTML = html;

            // Dynamically load the styles
            const style = document.createElement('link');
            style.rel = 'stylesheet';
            style.href = `${path.replace("index.html", "styles.css")}${bust}`;
            style.onload = () => console.log(`Styles loaded for ${path}`);
            document.head.appendChild(style);

            // Dynamically load the scripts
            const script = document.createElement('script');
            script.src = `${path.replace("index.html", "scripts.js")}${bust}`;
            script.onload = () => console.log(`Script loaded for ${path}`);
            document.body.appendChild(script);
        })
        .catch((error) => {
            console.error(`Error loading path ${path}:`, error);
        });
};



// Load the objects
loadObject('title', 'title/index.html');
loadObject('introduction', 'introduction/index.html');
loadObject('education', 'education/index.html');
loadObject('job-history', 'history/index.html');
loadObject('stack', 'stack/index.html');
loadObject('projects', 'projects/index.html');
loadObject('experience', 'experience/index.html');

    