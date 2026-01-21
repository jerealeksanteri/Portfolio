# Tech Stack Section

An immersive, terminal-themed showcase of technical skills with interactive proficiency indicators. Features dark glassmorphism design, varied animation speeds, and RPG-style skill level tooltips.

## Purpose

Visual presentation of technical expertise organized into three categories with proficiency levels (1-5):

### Languages
- **Level 5 (Expert):** Python, PostgreSQL, Salesforce
- **Level 4 (Advanced):** C#, C++, HTML5
- **Level 3 (Intermediate):** CSS3, JavaScript, Go, C

### Frameworks
- **Level 5 (Expert):** Apex, FastAPI
- **Level 4 (Advanced):** ASP.NET Core, Blazor
- **Level 3 (Intermediate):** Arduino, React
- **Level 2 (Beginner):** Qt, Robot Framework

### Tools
- **Level 5 (Expert):** Git, Postman, Microsoft 365
- **Level 4 (Advanced):** Adobe Premiere Pro, Docker, Linux, AWS, Kubernetes
- **Level 3 (Intermediate):** Grafana, LabVIEW, GitHub Actions

## Design Theme

### Terminal/RPG Aesthetic
- **Dark Glassmorphism:** Semi-transparent black boxes with backdrop blur
- **Green Glow Effects:** Bright green (#0f0) borders and shadows
- **Monospace Typography:** Courier New with letter-spacing
- **Matches Job History:** Consistent with RPG level system theme

### Visual Effects
- Box shadows with green glow (outer + inset)
- Hover enhancement: border intensifies, card lifts 3px
- Drop shadows on logos with green filter on hover
- Smooth transitions (0.3-0.4s)

## Structure

### Three-Column Layout
Each column contains:
- **Header** - Category name (h2) with green text shadow
- **Logo Wrappers** - Interactive containers with tooltips
- **Logo Slides** - Two identical sets for seamless infinite scroll
- **Gradient Fades** - Edge fading for smooth visual flow

### File Organization
```
stack/
├── index.html          # Three columns with wrapped logos and tooltips
├── styles.css          # Terminal theme, animations, proficiency styling
└── scripts.js          # Logo randomization on page load
```

## Animation System

### Varied Speed & Direction
Each carousel has unique animation for visual interest:

```css
#langs-slide {
    animation: 15s slide-left infinite linear;
}

#frameworks-slide {
    animation: 18s slide-right infinite linear;  /* Opposite direction! */
}

#tools-slide {
    animation: 20s slide-left infinite linear;
}
```

- **Languages:** 15s scrolling left
- **Frameworks:** 18s scrolling RIGHT (creates dynamic contrast)
- **Tools:** 20s scrolling left

### Dual Animations
```css
@keyframes slide-left {
    from { transform: translateX(0); }
    to { transform: translateX(-100%); }
}

@keyframes slide-right {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
}
```

### Pause on Hover
Column hover pauses animation for examination:
```css
.stack-column:hover .logos-slide {
    animation-play-state: paused;
}
```

### Individual Logo Hover
```css
.logo-wrapper:hover img {
    transform: scale(1.8) rotate(5deg);
    filter: drop-shadow(0 0 15px rgba(0, 255, 0, 0.8));
}
```
- Scales to 1.8x (180% size)
- Rotates 5 degrees for playfulness
- Green glow filter intensifies

### Randomization
JavaScript randomizes logo order on each page load using Fisher-Yates shuffle algorithm for variety.

## Interactive Tooltips

### Proficiency Display
Hover any logo to see:
- Technology name
- Proficiency level (1-5)
- Visual dots showing skill progression

### Tooltip Structure
```html
<div class="logo-wrapper" data-level="5">
    <img src="images/lang/Python.svg" alt="Python">
    <div class="tooltip">
        Python
        <span class="proficiency-level">
            Level 5
            <span class="level-dots">
                <span class="dot filled"></span>  <!-- Filled dots -->
                <span class="dot filled"></span>
                <span class="dot filled"></span>
                <span class="dot filled"></span>
                <span class="dot filled"></span>
            </span>
        </span>
    </div>
</div>
```

### Tooltip Styling
- Black background with green border
- Green text for tech name, white for level
- Appears above logo with slide-up animation
- Terminal-style monospace font
- Green glow box shadow

### Level Dots
- 5 dots total (representing levels 1-5)
- Filled dots glow green with box-shadow
- Empty dots show as dark outlines
- Inline-flex layout with 3px gap

## Styling Details

### Columns
```css
.stack-column {
    width: 45vw;
    height: 22vh;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(0, 255, 0, 0.3);
    border-radius: 15px;
    box-shadow: 0 8px 32px rgba(0, 255, 0, 0.1),
                inset 0 0 20px rgba(0, 255, 0, 0.05);
}
```

### Gradient Fades
Pseudo-elements create edge fading:
- `::before` - Left edge fade
- `::after` - Right edge fade
- Width: 8vw each (12vw on mobile)
- Gradient: Dark gray (#333) to transparent
- Prevents abrupt logo cut-off

### Logo Sizing
**Desktop:**
- Width/Height: 6vh each
- Margin: 0 1vw between logos
- Drop shadow: subtle white glow
- Hover scale: 1.8x with rotation

**Mobile (≤768px):**
- Width/Height: 8vh each (33% larger)
- Margin: 0 2vw between logos
- Hover scale: 1.5x (reduced for mobile)
- Enhanced touch targets

## Content Management

### Adding New Technologies

1. **Add Logo Image**
   ```bash
   images/[category]/TechnologyName.svg
   ```

2. **Create Logo Wrapper with Proficiency**
   ```html
   <div class="logo-wrapper" data-level="4">
       <img src="images/lang/NewTech.svg" alt="New Technology">
       <div class="tooltip">New Technology
           <span class="proficiency-level">Level 4
               <span class="level-dots">
                   <span class="dot filled"></span>
                   <span class="dot filled"></span>
                   <span class="dot filled"></span>
                   <span class="dot filled"></span>
                   <span class="dot"></span>
               </span>
           </span>
       </div>
   </div>
   ```

3. **Update BOTH Slide Sets**
   Add identical wrapper to both carousel copies for seamless loop

4. **Choose Proficiency Level**
   - Level 5: Expert/Mastery
   - Level 4: Advanced proficiency
   - Level 3: Intermediate/Working knowledge
   - Level 2: Beginner/Familiar
   - Level 1: Basic exposure

### Updating Proficiency Levels
Change `data-level` attribute and update dots:
- Filled dots = achieved levels
- Empty dots = remaining levels
- Always 5 dots total

### Removing Technologies
Delete wrapper from both slide sets to maintain loop integrity.

## Integration

Loaded via main `scripts.js`:
```javascript
loadObject('stack', 'stack/index.html');
```

Appears as `#stack` section in navigation, positioned between job history and projects.

## Mobile Responsiveness

### Mobile Optimizations (≤768px)
- **Wider containers:** 85vw (vs 45vw desktop)
- **Taller containers:** 28vh (vs 22vh desktop)
- **Larger logos:** 8vh (vs 6vh desktop)
- **Better spacing:** 2vw margins (vs 1vw)
- **Wider fades:** 12vw gradient edges (vs 8vw)
- **Larger text:** Tooltip 1.8vh (vs 1.4vh)
- **Reduced hover scale:** 1.5x (vs 1.8x)

The mobile layout maximizes readability while maintaining the terminal aesthetic.

## Background

Parent `#stack` section (in main styles.css):
- Dark gray background (#333)
- White text color
- Full viewport height
- Centered content

## Performance

### Animation Optimization
- CSS transforms (GPU accelerated)
- Linear timing for consistent performance
- Pauses when column hovered (power saving)
- Duplicate sets prevent jump/reset
- Staggered speeds reduce monotony

### Image Loading
- All logos load with initial page
- SVG files are lightweight and scalable
- Drop shadows use GPU-accelerated filters

## Accessibility

- Alt text on all `<img>` tags
- Category headers (h2) provide structure
- Pause on hover allows examination
- High contrast green on dark theme
- Keyboard navigable (logos tabbable)
- Tooltips appear on focus as well as hover
- Semantic HTML structure

## JavaScript Features

### Logo Randomization
`scripts.js` implements Fisher-Yates shuffle:
```javascript
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.logos-slide');

    carousels.forEach(slide => {
        const logos = Array.from(slide.querySelectorAll('.logo-wrapper'));

        // Fisher-Yates shuffle
        for (let i = logos.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            slide.insertBefore(logos[j], logos[i]);
        }
    });
});
```

Benefits:
- Different order on each page load
- Keeps content fresh
- Highlights different technologies
- Fair randomization algorithm

## Color Scheme

- **Primary:** `#0f0` (bright green) - borders, text, glows
- **Background:** `rgba(0, 0, 0, 0.5)` - semi-transparent black
- **Backdrop:** Blur effect for glassmorphism
- **Shadows:** Green-tinted for terminal aesthetic
- **Tooltips:** Black bg with green accents
- **Dots:** Green filled, dark outlined

## Design Consistency

Matches portfolio theme:
- **Terminal Section:** Green text on black
- **Job History:** RPG level system (LVL 1-5)
- **Navigation:** Green accent color
- Overall retro/gaming aesthetic

The stack section extends this theme with:
- Skill levels matching RPG progression
- Terminal-style tooltips
- Green glow effects
- Monospace typography

## Performance Considerations

### Optimization Tips
- Use SVG over PNG when possible (smaller, scalable)
- Limit number of logos to ~10 per category
- Consider lazy loading for very large sets
- Green glow shadows are GPU-accelerated
- Transform animations perform well
- Randomization runs once on load (minimal impact)

### Browser Compatibility
- Backdrop-filter (modern browsers)
- CSS animations (all modern browsers)
- Transform/rotate (all modern browsers)
- Drop-shadow filter (all modern browsers)
- Flexbox layout (universal support)
