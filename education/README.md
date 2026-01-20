# Education Section

A professional timeline displaying educational background and qualifications in a clean, modern format.

## Purpose

Presents academic achievements and qualifications in chronological order:
- **Master of Science (M.Sc.)** - Electronics and Embedded Systems (2026-Present) - Current
- **Bachelor of Science (B.Sc.)** - Electrical Engineering (2020-2025)
- **Conscript Service** - Finnish Defence Forces (2023-2024)
- **Matriculation Examination** - Upper Secondary School (2016-2019)

## Theme

### Visual Style
- **Professional & Clean** - White cards on dark background (#333)
- **Timeline Design** - Vertical timeline connecting all education items
- **Green Accents** - Current education highlighted with `#0f0` (bright green)
- **Card-Based Layout** - Each education entry in a clean card format

### Professional Elements
- Status badges (In Progress / Completed)
- Timeline connector with dots marking each milestone
- Hover effects for interactivity
- Pulsing animation for current education
- Clean typography with Courier New monospace font

## Structure

### Education Card Components
Each education card includes:
- **Education Year** - Time period in gray text
- **Degree/Title** - Main heading (h3)
- **Institution** - School/organization name in green
- **Field** - Specialization or program details
- **Status Badge** - Visual indicator (In Progress or Completed)

### Special Styling
- **Current Education** - Green border, pulsing dot on timeline, "In Progress" badge
- **Completed Items** - Gray status badges, standard styling

## Styling

### Container
```css
.education-section {
    max-width: 700px;
    padding: 20px;
}
```

### Color Scheme
- **Background**: `rgba(255, 255, 255, 0.95)` - White cards
- **Text**: `#333` - Dark text for readability
- **Accent Green**: `#0f0` - Institution names, current item highlights
- **Timeline**: Linear gradient from `#fff` to `#999`
- **Borders**: `#333` standard, `#0f0` for current item

### Animations
- **Pulse Dot** - Current education timeline dot pulses
- **Badge Pulse** - "In Progress" badge has green glow animation
- **Hover Effect** - Cards lift slightly and border changes to green

### Timeline
Vertical center line connecting all cards:
- 2px width with gradient
- Dots at each card position
- Responsive positioning (moves to left on mobile)

## Content Guidelines

When updating education entries:
1. Maintain reverse chronological order (newest first)
2. Update year ranges accurately
3. Move "current" class and badge to new current education
4. Use consistent naming for degrees and institutions
5. Keep field descriptions concise

### Status Badge Format
```html
<div class="status-badge current-study">In Progress</div>
<div class="status-badge completed">Completed</div>
```

## Integration

Loaded by main `scripts.js`:
```javascript
loadObject('education', 'education/index.html');
```

The section appears as `#education` in navigation, positioned after introduction and before job history.

## Mobile Responsiveness

On screens ≤768px:
- Timeline moves to left edge
- Cards offset to avoid timeline overlap
- Reduced font sizes for compact display
- Maintained card styling and readability
- Preserved hover effects and animations

## Background

Parent `#education` section (in main styles.css):
- Dark background (#333)
- White text
- Full viewport dimensions
- Centered content layout

## Interactivity

### Hover States
- Cards lift slightly (`translateY(-3px)`)
- Border changes to green
- Enhanced shadow for depth
- Current item gets green glow enhancement

### Animations
- Current education timeline dot pulses continuously
- "In Progress" badge glows with green animation
- Smooth transitions on all interactive elements
