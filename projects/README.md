# Projects Section

A modern card-based showcase of featured projects with color-coded tags, technology badges, and direct GitHub links. This section highlights personal and professional work across different technical domains.

## Purpose

Presents portfolio projects in an organized, visually appealing grid:
- **PiikkiTracker** - Full-stack NGO awarding and bar tab system (ASP.NET Blazor)
- **Nabla Functions** - Serverless AWS Lambda Functions in Go
- **The Rounds API** - Social drinking rounds management (ASP.NET Core)
- **PlatWatSystem** - IoT automatic plant watering system (ESP32)

## Structure

### Card Grid Layout
```css
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 12px;
}
```
- Responsive grid that adapts to screen size
- Minimum card width: 280px
- Automatically wraps to single column on mobile

### Project Card Components
Each card includes:
1. **Header**
   - Icon emoji (⚡, 🔧, 🍺, 🌱)
   - Color-coded category tag
2. **Title** - Project name (h3)
3. **Description** - Brief project summary
4. **Tech Stack** - Technology badges
5. **GitHub Link** - Call-to-action with arrow

## Styling

### Container
```css
.projects {
    max-width: 800px;
    max-height: 80vh;
    overflow-y: auto;
}
```
Scrollable container maintains consistent width with other sections.

### Project Cards
```css
.project-card {
    background: rgba(255, 255, 255, 0.95);
    border: 2px solid #333;
    border-radius: 10px;
    padding: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

#### Hover Effects
- Lifts up: `translateY(-5px)`
- Enhanced shadow: `0 8px 16px rgba(0, 0, 0, 0.2)`
- Top gradient bar appears
- Darker border color

### Category Tags
Color-coded by project type:

| Category | Background | Usage |
|----------|------------|-------|
| Full Stack | `#4CAF50` (Green) | Complete web applications |
| Backend | `#2196F3` (Blue) | APIs and server-side projects |
| IoT | `#FF9800` (Orange) | Hardware/embedded systems |

```css
.project-tag.full-stack {
    background: #4CAF50;
    color: white;
}
```

### Technology Badges
Neutral styling for tech stack:
```css
.tech-badge {
    background: rgba(0, 0, 0, 0.05);
    border: 1px solid #333;
    border-radius: 12px;
    font-size: 0.7rem;
}
```

### GitHub Link Button
```css
.project-link {
    background: #333;
    color: white;
    border-radius: 6px;
    padding: 8px 12px;
}
```
- Hover: Darkens to black, slides right
- Arrow animates independently
- Full-width within card

## Animations

### Floating Icons
```css
.project-icon {
    animation: float 3s ease-in-out infinite;
}
```
Icons gently float up and down (5px range).

### Top Gradient Bar
```css
.project-card::before {
    height: 4px;
    background: linear-gradient(90deg, #333, #666);
    opacity: 0;
}
```
Fades in on card hover.

### Link Arrow
```css
.project-link:hover .arrow {
    transform: translateX(5px);
}
```
Arrow slides right when hovering link.

## Content Guidelines

### Adding New Projects

```html
<div class="project-card">
    <div class="project-header">
        <div class="project-icon">🎯</div>
        <span class="project-tag [category]">[CATEGORY]</span>
    </div>
    <h3>Project Name</h3>
    <p class="project-description">Brief description of the project and its purpose.</p>
    <div class="tech-stack">
        <span class="tech-badge">Technology 1</span>
        <span class="tech-badge">Technology 2</span>
    </div>
    <a href="[GITHUB_URL]" target="_blank" class="project-link">
        <span>View on GitHub</span>
        <span class="arrow">→</span>
    </a>
</div>
```

### Category Classes
- `project-tag full-stack` - Green
- `project-tag backend` - Blue
- `project-tag iot` - Orange

Add new categories in `styles.css` with consistent styling.

### Icon Selection
Use emoji that represent the project:
- ⚡ - Fast/powerful applications
- 🔧 - Tools and utilities
- 🍺 - Social/lifestyle apps
- 🌱 - IoT/growing systems
- 🎮 - Games
- 📱 - Mobile apps
- 🔒 - Security projects

### Description Length
Keep descriptions concise (1-2 sentences, ~80-100 characters) for consistent card heights.

### Technology Badges
List 3-4 key technologies:
- Primary language
- Main framework
- Notable service/platform

## Integration

Loaded via main `scripts.js`:
```javascript
loadObject('projects', 'projects/index.html');
```

Appears as `#projects` section in navigation, positioned after stack and before contact.

## Scrollbar

Custom dark-themed scrollbar:
```css
.projects::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 4px;
}
```
Matches card styling aesthetic.

## Mobile Responsiveness

On screens ≤768px:
```css
.projects-grid {
    grid-template-columns: 1fr;
    gap: 15px;
}
```
- Single column layout
- Increased gap for touch targets
- Larger text for readability
- Maintained hover effects (for tablets)

## Background

Parent `#projects` section (in main styles.css):
- Light gray background (#ccc)
- Dark text color (#333)
- Full viewport dimensions
- Centered content

## Featured Projects

Use `.featured` class for special highlighting:
```html
<div class="project-card featured">
```
Currently all projects are equal, but featured class allows for:
- Larger size (grid-column: span 2)
- Special styling
- Priority positioning

## GitHub Integration

All project links:
- Open in new tab (`target="_blank"`)
- Point to public GitHub repositories
- Should include proper README in each repo
- Repositories should be pinned on GitHub profile

## Accessibility

- Semantic HTML (heading hierarchy)
- Descriptive link text ("View on GitHub")
- Color contrast meets WCAG standards
- Keyboard navigable links
- Focus states for interactive elements

## Future Enhancements

Potential additions (via `scripts.js`):
- Filter by category
- Sort by date/technology
- Live/demo links alongside GitHub
- Project statistics (stars, forks)
- Screenshot previews
- Search functionality
- Load more pagination
