// Modifiez ces réponses pour les adapter aux informations de votre site.
const answers = [
  { keywords: ["contact", "contacter", "email", "téléphone", "telephone"], answer: "Vous pouvez nous contacter depuis la page Contact du site." },
  { keywords: ["horaire", "horaires", "ouvert", "ouverture"], answer: "Lundi-Vendredi : 9h00-21h00 
  Week-end : 11h00-20h00." },
  { keywords: ["adresse", "où", "localisation", "lieu"], answer: "123 Avenue de la paix, 75008 Paris, France." },
  { keywords: ["Produits", "Collections", "Prix"], answer: "Consultez la page Boutique pour découvrir ce que nous proposons." },
  { keywords: ["merci"], answer: "Avec plaisir !" },
  { keywords: ["bonjour", "salut", "bonsoir"], answer: "Bonjour ! Comment puis-je vous aider ?" }
];

const toggleButton = document.getElementById("chat-toggle");
const closeButton = document.getElementById("chat-close");
const panel = document.getElementById("chat-panel");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const messages = document.getElementById("messages");

function setChatOpen(isOpen) {
  panel.hidden = !isOpen;
  toggleButton.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) input.focus();
}

function addMessage(text, className) {
  const message = document.createElement("p");
  message.className = `message ${className}`;
  message.textContent = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

function getAnswer(question) {
  const normalizedQuestion = question.toLocaleLowerCase("fr");
  const match = answers.find(item => item.keywords.some(keyword => normalizedQuestion.includes(keyword)));
  return match ? match.answer : "Je n’ai pas trouvé la réponse. Essayez la page Contact ou reformulez votre question.";
}

toggleButton.addEventListener("click", () => setChatOpen(panel.hidden));
closeButton.addEventListener("click", () => setChatOpen(false));

form.addEventListener("submit", event => {
  event.preventDefault();
  const question = input.value.trim();
  if (!question) return;

  addMessage(question, "user-message");
  addMessage(getAnswer(question), "bot-message");
  input.value = "";
  input.focus();
});
