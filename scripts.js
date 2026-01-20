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
let edgeScrollCount = 0;
const EDGE_SCROLL_THRESHOLD = 2; // Number of scroll attempts needed at edge to navigate

function handleScroll(event) {
    // Check if the event target is inside a scrollable container
    let target = event.target;
    let scrollableContainer = null;

    while (target && target !== document.body) {
        if (target.classList && (target.classList.contains('introduction-content') || target.classList.contains('education-section') || target.classList.contains('job-history') || target.classList.contains('stack') || target.classList.contains('projects'))) {
            scrollableContainer = target;
            break;
        }
        target = target.parentElement;
    }

    // If inside a scrollable container, check if we should allow section navigation
    if (scrollableContainer) {
        const direction = event.deltaY > 0 ? 1 : -1;
        const isScrollingDown = direction > 0;
        const isScrollingUp = direction < 0;

        const hasOverflow = scrollableContainer.scrollHeight > scrollableContainer.clientHeight;
        const isAtTop = scrollableContainer.scrollTop <= 0;
        const isAtBottom = scrollableContainer.scrollTop + scrollableContainer.clientHeight >= scrollableContainer.scrollHeight - 1;

        // If not at an edge, reset counter and let scroll naturally
        if (hasOverflow && ((isScrollingDown && !isAtBottom) || (isScrollingUp && !isAtTop))) {
            edgeScrollCount = 0;
            return;
        }

        // At edge or no overflow - increment counter
        if (hasOverflow) {
            edgeScrollCount++;

            // Need multiple scroll attempts to navigate
            if (edgeScrollCount < EDGE_SCROLL_THRESHOLD) {
                return;
            }
        }

        // Reset counter after navigation
        edgeScrollCount = 0;
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
let scrollableContainerForTouch = null;
let edgeSwipeCount = 0;
const EDGE_SWIPE_THRESHOLD = 2; // Number of swipe attempts needed at edge to navigate

function handleTouchStart(event) {
    // Check if touch is inside a scrollable container
    let target = event.target;
    scrollableContainerForTouch = null;

    while (target && target !== document.body) {
        if (target.classList && (target.classList.contains('introduction-content') || target.classList.contains('education-section') || target.classList.contains('job-history') || target.classList.contains('stack') || target.classList.contains('projects'))) {
            scrollableContainerForTouch = target;
            break;
        }
        target = target.parentElement;
    }

    touchStartY = event.touches[0].clientY;
}

function handleTouchEnd(event) {
    touchEndY = event.changedTouches[0].clientY;
    const swipeDistance = Math.abs(touchStartY - touchEndY);

    // Ignore small movements (likely taps, not swipes)
    if (swipeDistance < 30) {
        return;
    }

    const direction = touchStartY - touchEndY > 0 ? 1 : -1;

    // If inside a scrollable container, check if we should allow section navigation
    if (scrollableContainerForTouch) {
        const isScrollingDown = direction > 0;
        const isScrollingUp = direction < 0;

        const hasOverflow = scrollableContainerForTouch.scrollHeight > scrollableContainerForTouch.clientHeight;
        const isAtTop = scrollableContainerForTouch.scrollTop <= 0;
        const isAtBottom = scrollableContainerForTouch.scrollTop + scrollableContainerForTouch.clientHeight >= scrollableContainerForTouch.scrollHeight - 1;

        // If not at an edge, reset counter and let scroll naturally
        if (hasOverflow && ((isScrollingDown && !isAtBottom) || (isScrollingUp && !isAtTop))) {
            edgeSwipeCount = 0;
            return;
        }

        // At edge or no overflow - increment counter
        if (hasOverflow) {
            edgeSwipeCount++;

            // Need multiple swipe attempts to navigate
            if (edgeSwipeCount < EDGE_SWIPE_THRESHOLD) {
                return;
            }
        }

        // Reset counter after navigation
        edgeSwipeCount = 0;
    }

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
loadObject('introduction', 'introduction/index.html');
loadObject('education', 'education/index.html');
loadObject('job-history', 'history/index.html');
loadObject('stack', 'stack/index.html');
loadObject('projects', 'projects/index.html');

    