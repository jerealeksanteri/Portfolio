const terminalText = ["> Hello stranger", "> Yes YOU!", "> My name is Jere Niemi", "> Welcome to my profile", "> . . . . . . . :)"];
const terminalDisplay = document.getElementById("terminal-text");

let index = 0;
let charIndex = 0;
const typingSpeed = 100;
const lineSpeed = 700;

function type() {
    if (index < terminalText.length) {
        if (charIndex < terminalText[index].length) {
            terminalDisplay.textContent += terminalText[index][charIndex];
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            terminalDisplay.textContent += "\n";
            index++;
            charIndex = 0;
            setTimeout(type, lineSpeed);
        }
    } else if (index === terminalText.length) {
        scrollToSection(1);
    }
}

window.onload = type;

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

window.addEventListener('wheel', handleScroll, { passive: false });
