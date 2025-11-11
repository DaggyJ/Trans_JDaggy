// expand.js - Clean version
document.addEventListener("DOMContentLoaded", () => {
  const toggleButtons = document.querySelectorAll('.toggle-btn');

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Find the closest card-body
      const cardBody = btn.closest('.card-body');
      const cardMore = cardBody.querySelector('.card-more');

      if (cardMore) {
        // Toggle visibility
        cardMore.classList.toggle('show');

        // Update button text
        btn.textContent = cardMore.classList.contains('show') ? 'Less' : 'More';

        // Optional: scroll into view when opened
        if (cardMore.classList.contains('show')) {
          cardMore.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});


const images = document.querySelectorAll('.profile-img');
let current = 0;

setInterval(() => {
  images[current].classList.remove('active');
  current = (current + 1) % images.length;
  images[current].classList.add('active');
}, 5000); // every 5 seconds
