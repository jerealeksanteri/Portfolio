# Title Section

The title section presents a professional profile card with a photo and social media links. This is the first content section visitors see after the terminal animation.

## Purpose

Provides immediate professional identity and social connectivity:
- **Profile Photo** - Professional headshot with hover effects
- **Name & Titles** - Jere Niemi with dual professional roles
- **Social Links** - Direct links to LinkedIn and GitHub profiles
- **Visual Introduction** - Clean, modern card design on dark background

## Structure

### Files
- `index.html` - Profile card HTML with photo and social links
- `styles.css` - Card styling, profile pic, and social icon effects
- `scripts.js` - Placeholder (no additional functionality needed)

### Layout Components
The section contains:
1. **Profile Card** - Centered card with flex layout
   - Profile picture (left)
   - Profile info (right)
2. **Social Links** - Row of icon buttons below the card

## Styling

### Profile Card
```css
.profile-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;
    background-color: #333;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
```

### Profile Picture
- **Circular** - 150px × 150px with 50% border-radius
- **Border** - 4px solid #555, changes to #0f0 on hover
- **Hover Effect** - Border color transition (0.3s)
- **Image** - Object-fit cover for proper cropping

### Profile Info
Two-line professional identity:
- **h1** - Name at 2.5rem (Jere Niemi)
- **Subtitle** - Dual roles at 1.2rem in light gray (#bbb)
  - "Software Developer & Architect"
  - "Electronics & Embedded Systems Student"

### Social Links
Icon-based buttons with hover effects:
- **Square Cards** - 50px × 50px with rounded corners (8px)
- **Dark Background** - #444, lightens to #555 on hover
- **Lift Effect** - translateY(-2px) on hover
- **Icons** - 28px × 28px contained images

### Color Scheme
- **Card Background** - #333 (dark gray)
- **Text** - White (#fff) for name, #bbb for subtitles
- **Accent** - #0f0 (bright green) for profile pic hover
- **Social Buttons** - #444 base, #555 hover

## Social Links

### Current Links
1. **LinkedIn** - [linkedin.com/in/jerealeksanteri](https://www.linkedin.com/in/jerealeksanteri/)
   - Icon: `images/linkedin.jpg`
   - aria-label: "LinkedIn"

2. **GitHub** - [github.com/jerealeksanteri](https://github.com/jerealeksanteri)
   - Icon: `images/github.svg`
   - aria-label: "GitHub"
   - Additional class: `.github`

### Adding New Social Links
```html
<a href="[PROFILE_URL]" class="social-link" aria-label="[Platform]">
    <img src="images/[platform].svg" alt="[Platform]" class="social-icon">
</a>
```

Icon requirements:
- 28px × 28px minimum
- Transparent background (PNG/SVG)
- High contrast for visibility
- Located in `images/` directory

## Integration

Loaded by main `scripts.js`:
```javascript
loadObject('title', 'title/index.html');
```

The section appears as `#title` in navigation sequence, positioned directly after the terminal intro (section index 1).

## Mobile Responsiveness

The profile card layout is maintained on mobile but can be enhanced with:
```css
@media (max-width: 768px) {
    .profile-card {
        flex-direction: column;
        padding: 20px;
        gap: 15px;
    }
}
```

Current implementation keeps horizontal layout on all screen sizes for simplicity.

## Background

Parent `#title` section (in main styles.css):
- Dark gray background (#333)
- White text color
- Full viewport dimensions
- Centered content layout

## Content Guidelines

When updating this section:

### Profile Picture
- Use professional headshot
- Square aspect ratio recommended
- High resolution (300px+ minimum)
- Good lighting and clear face
- File: `images/profilepic.jpeg`

### Name & Titles
- Keep name concise (h1)
- Use 1-2 subtitle lines maximum
- Focus on current primary roles/titles
- Update when career changes significantly

### Social Links
- Only include professional profiles
- Maintain 2-4 links for clean layout
- Use high-quality icon assets
- Ensure all links open in new tab (optional)

## Hover States

### Profile Picture
- Border animates from #555 to #0f0
- 0.3s smooth transition
- Indicates interactivity

### Social Links
- Background darkens (#444 → #555)
- Card lifts up 2px
- All transitions at 0.3s
- Creates depth and engagement

## Accessibility

- **aria-label** on all social links
- **alt text** on all images
- Semantic HTML structure (h1 for name)
- Keyboard navigable links
- Sufficient color contrast
- Focus states on interactive elements

## Typography

- **Font Family** - Inherits from global (default sans-serif)
- **Name** - 2.5rem, weight 600, tight letter-spacing (-0.5px)
- **Subtitles** - 1.2rem, weight 300, loose letter-spacing (0.5px)
- **Line Height** - Default (1.2-1.5 range)

## Visual Hierarchy

1. Profile picture draws attention (left/top)
2. Name as primary text (largest)
3. Subtitles provide context (medium)
4. Social links as secondary action (below)

Clear flow: Identity → Roles → Connect

## Future Enhancements

Potential additions (via `scripts.js`):
- Animated entry of card elements
- Click profile pic for enlarged view
- Social link tooltips with usernames
- Resume/CV download button
- Email contact button
- More social platforms (Twitter, Medium, etc.)
