const whatsappNumber = "5511999449415";
const firstQuestion = "Me conta rapidamente como foi o golpe e quando aconteceu?";

const leadForm = document.querySelector("#lead-form");
if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!leadForm.checkValidity()) {
      leadForm.reportValidity();
      return;
    }

    const formData = new FormData(leadForm);
    const nome = (formData.get("nome") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const whatsapp = (formData.get("whatsapp") || "").toString().trim();
    const golpe = (formData.get("golpe") || "").toString().trim();

    const message = [
      "Olá, quero analisar meu caso de golpe no Pix.",
      firstQuestion,
      "",
      `Nome: ${nome}`,
      `E-mail: ${email}`,
      `WhatsApp: ${whatsapp}`,
      `Resumo do caso: ${golpe}`,
    ].join("\n");

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  });
}

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
