// Control spin speed when hovered
const brand = document.querySelector('.spin-text');

brand.addEventListener('mouseenter', () => {
  brand.style.animationDuration = '4s';
});

brand.addEventListener('mouseleave', () => {
  brand.style.animationDuration = '12s';
});
