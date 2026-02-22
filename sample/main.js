// main.js - Cinematic Interactions & Observers

document.addEventListener("DOMContentLoaded", () => {
  // 1. Smooth Scrolling for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // 2. Intersection Observer for scroll animations (fade in on scroll)
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15, // Trigger when 15% of the element is visible
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add class to trigger CSS animation
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        // Optional: Stop observing once animated in
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply observer to elements we want to animate on scroll
  // For now, let's target the overview section cards
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    // Initial state
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`;

    // Observe
    scrollObserver.observe(card);
  });

  // Animate section headers
  const headers = document.querySelectorAll(".section-header");
  headers.forEach((header) => {
    header.style.opacity = "0";
    header.style.transform = "translateY(20px)";
    header.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
    scrollObserver.observe(header);
  });

  // Parallax effect on hero section gradient
  const hero = document.querySelector(".hero-section");
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    if (hero && scrolled < window.innerHeight) {
      hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
  });
});
