// Toggle More/Less for missions cards
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Get the parent card
    const card = btn.closest('.card');
    // Get the hidden section inside the card
    const cardMore = card.querySelector('.card-more');

    if (cardMore) {
      cardMore.classList.toggle('show'); // toggle visibility
      btn.textContent = cardMore.classList.contains('show') ? 'Less' : 'More';

      // Optional: scroll into view smoothly when opening
      if (cardMore.classList.contains('show')) {
        cardMore.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});
