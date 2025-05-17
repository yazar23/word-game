// script.js

// Your word bank: add more { tr: "Turkish", en: "English" } entries as needed
const bank = [
  { tr: "elma",    en: "apple" },
  { tr: "kitap",   en: "book" },
  { tr: "okul",    en: "school" },
  { tr: "kalem",   en: "pen" },
  { tr: "masa",    en: "table" },
  // … add more words here
];

let currentWord;

// Pick a random word and reset the UI
function nextQuestion() {
  currentWord = bank[Math.floor(Math.random() * bank.length)];
  document.getElementById("prompt").textContent = currentWord.tr;
  document.getElementById("answer").value = "";
  document.getElementById("feedback").textContent = "";
}

// Check the user's answer when they click “Check”
document.getElementById("check").addEventListener("click", () => {
  const userAns = document.getElementById("answer").value.trim().toLowerCase();
  const feedbackEl = document.getElementById("feedback");

  if (userAns === currentWord.en.toLowerCase()) {
    feedbackEl.textContent = "✅ Correct!";
    // After a short pause, show the next word
    setTimeout(nextQuestion, 1000);
  } else {
    feedbackEl.textContent = "❌ Try again!";
  }
});

// Start the first question as soon as the page loads
nextQuestion();
