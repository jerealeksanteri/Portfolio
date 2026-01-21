// Stack section - scripts for logo carousel

// Randomize logo order on page load for variety
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.logos-slide');

    carousels.forEach(slide => {
        const logos = Array.from(slide.querySelectorAll('.logo-wrapper'));

        // Fisher-Yates shuffle algorithm
        for (let i = logos.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            slide.insertBefore(logos[j], logos[i]);
        }
    });
});
