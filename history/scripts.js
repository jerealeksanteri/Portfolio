// Add interactive effects to job cards
document.addEventListener('DOMContentLoaded', function() {
    const jobCards = document.querySelectorAll('.job-card');

    // Add stagger animation delay
    jobCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Add click effect for locked card
    const lockedCard = document.querySelector('.job-card.locked');
    if (lockedCard) {
        lockedCard.addEventListener('click', function() {
            const achievement = this.querySelector('.achievement');
            achievement.style.animation = 'shake 0.5s';
            setTimeout(() => {
                achievement.style.animation = '';
            }, 500);
        });
    }

    // Add XP counter animation
    const achievements = document.querySelectorAll('.achievement');
    achievements.forEach(achievement => {
        achievement.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        achievement.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});

// Shake animation keyframes (added dynamically)
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);
