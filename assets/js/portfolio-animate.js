
document.addEventListener("DOMContentLoaded", () => {
  // Fade-in animation on scroll
  const fadeSections = document.querySelectorAll('.fade-section');

  window.addEventListener('scroll', () => {
    fadeSections.forEach(section => {
      const rect = section.getBoundingClientRect().top;
      const winHeight = window.innerHeight;

      if (rect < winHeight - 100) {
        section.classList.add('visible');
      }
    });
  });


  
  // Run once when page loads
  fadeSections.forEach(section => {
    const rect = section.getBoundingClientRect().top;
    if (rect < window.innerHeight - 100) {
      section.classList.add('visible');
    }
  });

  // Dynamic color glow for taglines
  const taglines = document.querySelectorAll('.glow');
  const colors = ['#38bdf8', '#facc15', '#10b981', '#f43f5e', '#8b5cf6'];
  let i = 0;

  setInterval(() => {
    taglines.forEach(tag => {
      tag.style.textShadow = `0 0 20px ${colors[i]}, 0 0 40px ${colors[i]}`;
    });
    i = (i + 1) % colors.length;
  }, 4000);
});

