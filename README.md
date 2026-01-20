# Jere Niemi Portfolio

A personal portfolio website showcasing my professional experience, technical skills, and projects. Built with vanilla JavaScript and featuring a terminal-inspired design with full-screen section navigation.

**Live Site:** [https://jerealeksanteri.github.io/Portfolio/](https://jerealeksanteri.github.io/Portfolio/)

## Overview

This portfolio is a single-page application (SPA) that uses custom scroll-based navigation to move between full-screen sections. Each section presents different aspects of my professional profile with unique visual themes and interactive elements.

## Features

- **Terminal Intro Animation** - Typewriter effect greeting with blinking cursor
- **Profile Section** - Professional photo and social media links (LinkedIn, GitHub)
- **Dynamic Introduction** - Personal bio with scrollable quote box
- **Gaming-Themed Job History** - Career progression styled as RPG level-ups with XP points
- **Animated Tech Stack** - Infinite scrolling carousel of technology logos
- **Project Showcase** - Card-based grid with color-coded tags and GitHub links
- **Contact Information** - Email and copyright details

## Project Structure

```
Portfolio/
├── index.html              # Main HTML structure
├── styles.css              # Global styles and section backgrounds
├── scripts.js              # Navigation logic and dynamic module loading
├── title/                  # Modular title section (profile card)
│   ├── index.html
│   ├── styles.css
│   └── scripts.js
├── introduction/           # Modular introduction section
│   ├── index.html
│   ├── styles.css
│   └── scripts.js
├── education/              # Modular education section
│   ├── index.html
│   ├── styles.css
│   └── scripts.js
├── history/                # Modular job history section (RPG theme)
│   ├── index.html
│   ├── styles.css
│   └── scripts.js
├── stack/                  # Modular tech stack section (logo carousel)
│   ├── index.html
│   ├── styles.css
│   └── scripts.js
├── projects/               # Modular projects section (card grid)
│   ├── index.html
│   ├── styles.css
│   └── scripts.js
└── images/                 # Profile picture, logos, social icons
```

## Technology Stack

- **Pure HTML5/CSS3/JavaScript** - No frameworks or build tools
- **GitHub Pages** - Static hosting
- **Responsive Design** - Mobile and desktop optimized
- **Custom Scroll Navigation** - Section-snapping with touch support

## Design Theme

The portfolio uses a terminal/developer aesthetic with:
- **Monospace Font** - Courier New throughout
- **Color Scheme** - Alternating sections between black (#000), dark gray (#333), and light gray (#ccc)
- **Accent Color** - Bright green (#0f0) for terminal theme and interactive elements
- **Consistent Width** - Scrollable content sections use 700-800px max-width

## Navigation

The site features a custom JavaScript-driven navigation system:
- **Desktop** - Mouse wheel scrolling or side navigation links
- **Mobile** - Touch swipe gestures or top navigation bar
- **Smooth Transitions** - JavaScript-controlled smooth scrolling with `scrollIntoView()`
- **Active Indicators** - Navigation highlights current section
- **Edge Detection** - Smart scrolling within content areas vs. section navigation
- **Bounds Protection** - Prevents navigation past first/last sections

## Modular Architecture

Sections are dynamically loaded using the `loadObject()` function in `scripts.js`:
1. Fetches HTML content from component directories
2. Injects corresponding CSS into document head
3. Loads JavaScript for section-specific functionality

This allows each section to maintain its own isolated styles and behavior while being part of the unified navigation system.

## Local Development

No build process required. Simply:

1. Clone the repository
2. Open `index.html` in a web browser
3. Or use a local server: `python -m http.server 8000`

## Deployment

The site is automatically deployed via GitHub Pages:
- Push changes to the `main` branch
- GitHub Pages serves the content from the root directory
- Updates appear live within minutes

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS custom scrollbars (WebKit browsers)
- Touch events for mobile navigation
- Scroll-snap for section alignment

## Contact

**Jere Niemi**
- Email: jere.niemi@tuni.fi
- LinkedIn: [linkedin.com/in/jerealeksanteri](https://www.linkedin.com/in/jerealeksanteri/)
- GitHub: [github.com/jerealeksanteri](https://github.com/jerealeksanteri)

## License

© 2026 Jere Niemi. All rights reserved.
