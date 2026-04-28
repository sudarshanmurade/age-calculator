// Select elements
let btn = document.getElementById("btn");
let dobInput = document.getElementById("dob");
let mainAge = document.getElementById("mainAge");
let subRow = document.getElementById("subRow");
let nextBdayEl = document.getElementById("nextBday");
let resultBox = document.getElementById("result");

// Click event
btn.addEventListener("click", calculate);

// Main function
function calculate() {

  let dobValue = dobInput.value;

  // Validation
  if (!dobValue) {
    alert("Please select your date of birth");
    return;
  }

  let dob = new Date(dobValue + "T00:00:00");
  let today = new Date();

  if (dob > today) {
    alert("Date cannot be in the future");
    return;
  }

  // Age calculation
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    let prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Extra calculations
  let totalMonths = years * 12 + months;
  let totalDays = Math.floor((today - dob) / (1000 * 60 * 60 * 24));
  let totalWeeks = Math.floor(totalDays / 7);
  let totalHours = totalDays * 24;

  // Next birthday
  let nextBday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  if (nextBday <= today) {
    nextBday.setFullYear(today.getFullYear() + 1);
  }

  let daysToNext = Math.ceil((nextBday - today) / (1000 * 60 * 60 * 24));

  // Show result
  mainAge.textContent = `${years} years, ${months} months, ${days} days`;

  subRow.innerHTML = `
    <div class="sub-item">
      <span class="num">${totalMonths}</span>
      <span class="lbl">months</span>
    </div>
    <div class="sub-item">
      <span class="num">${totalWeeks}</span>
      <span class="lbl">weeks</span>
    </div>
    <div class="sub-item">
      <span class="num">${totalDays}</span>
      <span class="lbl">days</span>
    </div>
    <div class="sub-item">
      <span class="num">${totalHours}</span>
      <span class="lbl">hours</span>
    </div>
  `;

  nextBdayEl.innerHTML =
    daysToNext === 0
      ? "🎂 Happy Birthday!"
      : `🎂 Next birthday in ${daysToNext} days`;

  resultBox.classList.add("show");
}

// Enter key support
document.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    calculate();
  }
});  

// Slow motion background video
let video = document.getElementById("bgVideo");
video.playbackRate = 0.4; // 0.4 = slow motion