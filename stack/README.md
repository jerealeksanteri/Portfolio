# Tech Stack Section

An animated showcase of technical skills displayed as infinite scrolling carousels of technology logos. This section demonstrates proficiency across languages, frameworks, and tools.

## Purpose

Visual presentation of technical expertise organized into three categories:
- **Languages** - Programming and markup languages (C, C#, C++, Python, Go, JavaScript, HTML5, CSS3, PostgreSQL, Salesforce)
- **Frameworks** - Development frameworks and platforms (ASP.NET Core, Blazor, FastAPI, React, Arduino, Qt, Robot Framework, Apex)
- **Tools** - Development and professional tools (AWS, Docker, Git, Linux, Grafana, LabVIEW, Adobe Premiere Pro, Microsoft 365)

## Structure

### Three-Column Layout
Each column contains:
- **Header** - Category name (h2)
- **Logo Slides** - Two identical sets of logos for seamless infinite scroll
- **Gradient Fade** - Left and right edge fades for smooth visual

### File Organization
```
stack/
├── index.html          # Three columns with logo images
├── styles.css          # Animation and layout styling
└── scripts.js          # Future interactivity (placeholder)
```

## Animation

### Infinite Scroll
```css
@keyframes slide {
    from { transform: translateX(0); }
    to { transform: translateX(-100%); }
}
```

- **Duration**: 10 seconds per loop
- **Direction**: Left to right (translateX negative)
- **Timing**: Linear for constant speed
- **Seamless**: Duplicate logo sets create continuous loop

### Pause on Hover
```css
.stack-column:hover .logos-slide {
    animation-play-state: paused;
}
```
Allows users to examine individual technologies.

### Individual Logo Hover
```css
.logos-slide img:hover {
    transform: scale(2);
    transition: transform 0.5s;
}
```
Logos enlarge 2x on hover for detailed viewing.

## Styling

### Columns
```css
.stack-column {
    width: 40vw;
    height: 20vh;
    background-color: #f1f1f1;
    border: 1px solid #d3d3d3;
    border-radius: 10px;
    overflow: hidden;
}
```

### Gradient Fades
Pseudo-elements create edge fading:
- `::before` - Left edge fade (left: 0)
- `::after` - Right edge fade (right: 0)
- Width: 5vw each (10vw on mobile)
- Gradient: White to transparent

### Logo Sizing
**Desktop:**
- Width/Height: 5vh each
- Margin: 0 1vw between logos
- Transparent background
- Hover scale: 2x

**Mobile (≤768px):**
- Width/Height: 8vh each (60% larger)
- Margin: 0 2vw between logos
- Enhanced visibility for touch devices

## Image Requirements

### Logo Images
Located in `images/` directory with subdirectories:
- `images/lang/` - Language logos
- `images/frameworks/` - Framework logos
- `images/tools/` - Tool logos

### Format Guidelines
- SVG preferred (scalable, crisp)
- PNG acceptable (ensure adequate resolution)
- Transparent backgrounds recommended
- Square aspect ratio for consistent sizing

## Content Management

### Adding New Technologies

1. **Add Logo Image**
   ```bash
   images/[category]/TechnologyName.svg
   ```

2. **Update Both Slide Sets**
   ```html
   <!-- First set -->
   <div id="langs" class="logos-slide">
       <img src="images/lang/NewTech.svg">
       <!-- existing logos -->
   </div>

   <!-- Duplicate in second set -->
   <div id="langs" class="logos-slide">
       <img src="images/lang/NewTech.svg">
       <!-- existing logos -->
   </div>
   ```

3. **Maintain Balance**
   Keep similar number of logos across categories for visual consistency.

### Removing Technologies
Delete from both slide sets to prevent broken loop.

## Integration

Loaded via main `scripts.js`:
```javascript
loadObject('stack', 'stack/index.html');
```

Appears as `#stack` section in navigation, positioned between job history and projects.

## Layout

### Vertical Stack
```css
.stack-content {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
```

Three columns stacked vertically with even spacing.

## Mobile Responsiveness

### Mobile Optimizations (≤768px)
- **Wider containers**: 80vw (vs 40vw desktop) - uses more screen width
- **Taller containers**: 25vh (vs 20vh desktop) - more vertical space
- **Larger logos**: 8vh (vs 5vh desktop) - 60% size increase
- **Better spacing**: 2vw margins (vs 1vw) - improved touch targets
- **Wider fades**: 10vw gradient edges (vs 5vw) - smoother transitions

The mobile layout maximizes screen real estate while making logos significantly larger and easier to view on smaller devices.

## Background

Parent `#stack` section (in main styles.css):
- Dark gray background (#333)
- White text color
- Full viewport height
- Centered content

## Performance

### Animation Optimization
- Uses CSS transforms (GPU accelerated)
- Linear timing for consistent performance
- Pauses when not hovered (power saving)
- Duplicate sets prevent jump/reset

### Image Loading
- All logos load with initial page
- Consider lazy loading for very large sets
- SVG files are lightweight and scalable

## Accessibility

- Alt text should be added to all `<img>` tags
- Category headers (h2) provide structure
- Pause on hover allows examination
- High contrast against background

## Future Enhancements

Potential additions (via `scripts.js`):
- Click logos to show proficiency level
- Filter by category
- Search functionality
- Tooltip descriptions
- Proficiency indicators (years, projects)
