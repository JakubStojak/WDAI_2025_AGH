function updateClock() {
  const now = new Date();
  document.getElementById("clock").innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

function toggleText() {
  const p = document.getElementById("text");
  p.style.display = (p.style.display === "none") ? "block" : "none";
}

document.querySelector("form").addEventListener("submit", function(event) {
  const emailInput = document.querySelector('input[name="email"]');
  const emailValue = emailInput.value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailValue)) {
    alert("To nie wygląda jak poprawny adres email...");
    emailInput.focus();
    event.preventDefault(); 
  }
});