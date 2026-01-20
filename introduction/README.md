# Introduction Section

The introduction section presents a personal biography in a clean, readable quote box format. This is a modular component that gets dynamically loaded into the main portfolio.

## Purpose

Provides visitors with a personal introduction, highlighting:
- Current age and location (Tampere, Finland)
- Academic background (Embedded Systems and Software Engineering student)
- Career progression from customer service to software engineering
- Personal interests and learning philosophy
- Professional achievements and growth mindset

## Structure

### Files
- `index.html` - HTML content with quote box markup
- `styles.css` - Styling for the scrollable content area
- `scripts.js` - Placeholder for future functionality

### Layout
The content is wrapped in a `.introduction-content` container that:
- Has a maximum width of 800px for readability
- Uses max-height of 85vh with vertical scrolling when needed
- Features custom scrollbar styling for WebKit browsers
- Includes SVG quote icons at top and bottom

## Styling

### Container
```css
.introduction-content {
    max-width: 800px;
    max-height: 85vh;
    overflow-y: auto;
}
```

### Quote Box
- White background with subtle transparency
- 2px solid border with rounded corners
- Monospace font (Courier New) with italic styling
- Hover effect with subtle lift and shadow enhancement
- Padding for comfortable reading

### Scrollbar
Custom scrollbar (WebKit browsers only):
- 8px width
- Light track with darker thumb
- Smooth transitions on hover

## Content Guidelines

When updating the introduction text:
- Keep it personal but professional
- Focus on career journey and learning mindset
- Highlight key transitions and achievements
- Maintain the quote box structure with SVG icons
- Use `<br>` tags for paragraph spacing within the quote box

## Integration

This section is loaded by `scripts.js` in the main directory:
```javascript
loadObject('introduction', 'introduction/index.html');
```

The section appears as `#introduction` in the main navigation sequence, positioned after the title section and before education.

## Mobile Responsiveness

The section adapts to mobile screens through:
- Responsive font sizing
- Adjusted padding for smaller screens
- Maintained scrollability for overflow content
- Touch-friendly scrollbar behavior

## Background

The parent `#introduction` section in the main `styles.css` has:
- Light gray background (#ccc)
- Centered flex layout
- Full viewport dimensions
