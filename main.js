/* Projects Carousel */
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.projects-track');
  const container = document.querySelector('.projects-container');
  const nextBtn = document.querySelector('.carousel-button.next');
  const prevBtn = document.querySelector('.carousel-button.prev');
  
  if (!track) return;

  // Initialize carousel
  let currentPosition = 0;
  let cardWidth = document.querySelector('.project-card').offsetWidth;
  const gap = 30; // Must match your CSS gap value
  const scrollAmount = cardWidth + gap;
  
  // Calculate maximum scroll position
  function getMaxScroll() {
    return -(track.scrollWidth - container.offsetWidth);
  }

  // Update button states
  function updateButtons() {
    prevBtn.disabled = currentPosition >= 0;
    nextBtn.disabled = currentPosition <= getMaxScroll();
  }

  // Scroll to specific position
  function scrollTo(position) {
    currentPosition = position;
    track.style.transform = `translateX(${currentPosition}px)`;
    updateButtons();
  }

  // Next button click handler
  nextBtn.addEventListener('click', function() {
    const maxScroll = getMaxScroll();
    const newPosition = Math.max(currentPosition - scrollAmount, maxScroll);
    scrollTo(newPosition);
  });

  // Previous button click handler
  prevBtn.addEventListener('click', function() {
    const newPosition = Math.min(currentPosition + scrollAmount, 0);
    scrollTo(newPosition);
  });

  // Handle window resize
  window.addEventListener('resize', function() {
    // Recalculate card width
    cardWidth = document.querySelector('.project-card').offsetWidth;
    // Adjust current position proportionally
    const ratio = cardWidth / (cardWidth - (scrollAmount - (cardWidth + gap)));
    currentPosition = currentPosition * ratio;
    track.style.transform = `translateX(${currentPosition}px)`;
    updateButtons();
  });

  // Initialize
  updateButtons();
});