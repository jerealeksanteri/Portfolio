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

function type() {
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

window.onload = () => {
    setInterval(updateCursorPosition, 50); // Regularly update the cursor position
    type();
};

// Scroll behavior to ensure one section scroll per action
const sections = document.querySelectorAll('section');
let isScrolling = false;
let currentSectionIndex = 0;

function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
        sections[index].scrollIntoView({ behavior: 'smooth' });
        currentSectionIndex = index;
    }
}

function handleScroll(event) {
    if (isScrolling) return;
    isScrolling = true;

    const direction = event.deltaY > 0 ? 1 : -1;
    const nextSectionIndex = currentSectionIndex + direction;

    scrollToSection(nextSectionIndex);

    setTimeout(() => {
        isScrolling = false;
    }, 1200);
}


// For mobile
let touchStartY = 0;
let touchEndY = 0;

function handleTouchStart(event) {
    touchStartY = event.touches[0].clientY;
}

function handleTouchEnd(event) {
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


window.addEventListener('wheel', handleScroll, { passive: false });
window.addEventListener('touchstart', handleTouchStart, { passive: false });
window.addEventListener('touchend', handleTouchEnd, { passive: false });
