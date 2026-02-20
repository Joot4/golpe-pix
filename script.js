const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => observer.observe(el));

const testimonialSlider = document.querySelector("#testimonial-slider");
if (testimonialSlider) {
  const track = testimonialSlider.querySelector(".testimonial-track");
  const slides = testimonialSlider.querySelectorAll(".testimonial-slide");
  const dots = testimonialSlider.querySelectorAll(".dot");
  let currentIndex = 0;
  let autoplayId;

  const goToSlide = (index) => {
    currentIndex = index;
    if (track) {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === currentIndex);
    });
  };

  const startAutoplay = () => {
    autoplayId = window.setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      goToSlide(nextIndex);
    }, 4200);
  };

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      window.clearInterval(autoplayId);
      goToSlide(dotIndex);
      startAutoplay();
    });
  });

  goToSlide(0);
  startAutoplay();
}
