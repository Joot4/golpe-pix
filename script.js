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

const triageButton = document.querySelector("#triage-btn");
const triageResult = document.querySelector("#triage-result");
const triageInputs = document.querySelectorAll("#triage-list input[type='checkbox']");

if (triageButton && triageResult && triageInputs.length) {
  triageButton.addEventListener("click", () => {
    const totalSelected = [...triageInputs].filter((input) => input.checked).length;

    triageResult.classList.remove("good", "warn");

    if (totalSelected >= 2) {
      triageResult.textContent =
        "Há sinais de tese jurídica razoável. O próximo passo é validar documentos e cronologia do caso.";
      triageResult.classList.add("good");
      return;
    }

    triageResult.textContent =
      "Sem esses elementos, o risco jurídico tende a ser mais alto. Ainda assim, vale uma análise individual antes de descartar o caso.";
    triageResult.classList.add("warn");
  });
}

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
