// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#nav');
  
  menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');
  });
  
  // Close menu when clicking on a nav link
  document.querySelectorAll('#nav a').forEach(link => {
      link.addEventListener('click', () => {
          menuToggle.classList.remove('active');
          nav.classList.remove('active');
      });
  });

  // Projects Carousel
  const track = document.querySelector('.projects-track');
  if (track) {
      const container = document.querySelector('.projects-container');
      const nextBtn = document.querySelector('.carousel-button.next');
      const prevBtn = document.querySelector('.carousel-button.prev');
      
      let currentPosition = 0;
      let cardWidth = document.querySelector('.project-card').offsetWidth;
      const gap = 30;
      const scrollAmount = cardWidth + gap;
      
      function getMaxScroll() {
          return -(track.scrollWidth - container.offsetWidth);
      }

      function updateButtons() {
          prevBtn.disabled = currentPosition >= 0;
          nextBtn.disabled = currentPosition <= getMaxScroll();
      }

      function scrollTo(position) {
          currentPosition = position;
          track.style.transform = `translateX(${currentPosition}px)`;
          updateButtons();
      }

      nextBtn.addEventListener('click', function() {
          const maxScroll = getMaxScroll();
          const newPosition = Math.max(currentPosition - scrollAmount, maxScroll);
          scrollTo(newPosition);
      });

      prevBtn.addEventListener('click', function() {
          const newPosition = Math.min(currentPosition + scrollAmount, 0);
          scrollTo(newPosition);
      });

      window.addEventListener('resize', function() {
          cardWidth = document.querySelector('.project-card').offsetWidth;
          const ratio = cardWidth / (cardWidth - (scrollAmount - (cardWidth + gap)));
          currentPosition = currentPosition * ratio;
          track.style.transform = `translateX(${currentPosition}px)`;
          updateButtons();
      });

      updateButtons();
  }

  // Current year for footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Animation delays for project cards
  document.querySelectorAll('.project-card').forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
  });
});