# Job History Section

A gaming-themed career timeline that presents professional experience as RPG-style level progression. This modular section features glowing terminal aesthetics with green neon effects.

## Purpose

Displays career progression in an engaging, memorable format:
- **Level 1** - Customer Service Agent (Summer jobs 2017-2019)
- **Level 2** - RPA Specialist (2020-2021)
- **Level 3** - Junior Software Developer (2021-2024)
- **Level 4** - Software Engineer & Cloud Architect (2025-Present) ⭐ Current
- **Level 5** - ??? Future opportunity (locked)

## Theme

### Visual Style
- **Terminal/Retro Gaming Aesthetic** - Green (#0f0) glowing text and borders
- **Dark Background** - Black/dark gray backdrop
- **Neon Effects** - Text shadows and box shadows for glow
- **Animated Elements** - Pulsing title, glowing badges, hover effects

### Gaming Elements
- XP points (skill increases) for each position
- Level badges with different colors and effects
- Achievement unlocks for career milestones
- "Currently Active" badge for current role
- Locked future level with mystery styling

## Structure

### Job Card Components
Each job card includes:
- **Job Header**
  - Level badge (LVL 1-5)
  - Year range
- **Job Title** - Position name
- **Company Name** - Organization (S2B Energia Oy, Solteq Oyj)
- **Job Description** - Skills and achievements as XP gains
- **Achievement Badge** - Career milestone marker

### Special Cards
- **Current Position** - Golden glowing badge, "Currently Active" indicator
- **Locked Future** - Grayed out with mystery badge (???), invitation for opportunities

## Styling

### Container
```css
.job-history {
    max-width: 700px;
    max-height: 80vh;
    overflow-y: auto;
}
```

### Color Scheme
- **Primary Green**: `#0f0` - Badges, text, borders, glow effects
- **Golden Yellow**: `#FFD700` - Current position highlights
- **Dark Background**: `rgba(0, 0, 0, 0.7)` - Card backgrounds
- **Cyan Accent**: `#0ff` - Scrollbar hover

### Animations
- **Pulse** - Title text shadow pulses with green glow
- **Slide In** - Cards animate from bottom on load
- **Badge Glow** - Current position badge pulses golden
- **Hover Effects** - Cards lift and intensify glow on hover

### Timeline
Vertical center line with green gradient:
- Connects all job cards
- Box shadow for glow effect
- Responsive positioning for mobile (moves to left)

## Content Guidelines

When adding new positions:
1. Increment the level number
2. Update year ranges
3. Add skill points as list items with `+X` format
4. Create a relevant achievement unlock
5. Move "Currently Active" to new current position
6. Update the previous current card to standard styling

### XP Point Format
```html
<li>+XX Skill Name</li>
```

Example:
```html
<li>+60 Backend Development (ASP.NET, Go, FastAPI, APIs)</li>
<li>+55 Cloud Infrastructure (AWS)</li>
```

## Integration

Loaded by main `scripts.js`:
```javascript
loadObject('job-history', 'history/index.html');
```

The section appears as `#job-history` in navigation, positioned after education and before stack.

## Scrollbar

Custom cyan-themed scrollbar for terminal aesthetic:
- Track: Dark with transparency
- Thumb: Green that glows cyan on hover
- Width: 8px

## Mobile Responsiveness

On screens ≤768px:
- Timeline moves to left edge
- Cards offset to avoid timeline overlap
- Reduced font sizes for compact display
- Maintained scrollability
- Preserved glow effects

## Background

Parent `#job-history` section (in main styles.css):
- Light gray background (#ccc)
- Full viewport dimensions
- Centered content layout

## Interactivity

### Hover States
- Cards lift slightly (`translateY(-5px)`)
- Glow effects intensify
- Current position gets golden aura
- Locked card responds to hover (future feature hint)

### Staggered Animation
Cards can have staggered entrance animations (configured in `scripts.js`) for dramatic reveal effect.
