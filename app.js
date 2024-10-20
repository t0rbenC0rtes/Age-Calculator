const button = document.querySelector(".button");
let intervalID;
let valueDisplays;

const yearsDisplay = document.querySelector(".yearsDisplay span");
const monthsDisplay = document.querySelector(".monthsDisplay span");
const daysDisplay = document.querySelector(".daysDisplay span");
const hoursDisplay = document.querySelector(".hoursDisplay span");
const minutesDisplay = document.querySelector(".minutesDisplay span");
const secondsDisplay = document.querySelector(".secondsDisplay span");

const dayError = document.getElementById("dayError");
const monthError = document.getElementById("monthError");
const yearError = document.getElementById("yearError");
const dayMsg = document.getElementById("dayMsg");
const monthMsg = document.getElementById("monthMsg");
const yearMsg = document.getElementById("yearMsg");


// I N P U T S   V A L I D A T I O N

dayError.addEventListener("input", (e) => {
  const input = e.target.value;
  if (input < 1 || input > 31) {
    dayMsg.classList.remove("hidden");
  } else {
    dayMsg.classList.add("hidden");
  }
});

monthError.addEventListener("input", (e) => {
  const input = e.target.value;
  if (input < 1 || input > 12) {
    monthMsg.classList.remove("hidden");
  } else {
    monthMsg.classList.add("hidden");
  }
});

yearError.addEventListener("input", (e) => {
  const input = e.target.value;
  if (input > new Date().getFullYear()) {
    yearMsg.classList.remove("hidden");
  } else {
    yearMsg.classList.add("hidden");
  }
});

// O N   B U T T O N   C L I C K

button.addEventListener("click", () => {
  // Clear the previous interval if it exists

  if (intervalID) {
    clearInterval(intervalID);
  }

  // G E T   I N P U T   V A L U E S
  const dayValue = document.querySelector(".daysInput").value;
  const monthValue = document.querySelector(".monthsInput").value - 1;
  const yearValue = document.querySelector(".yearsInput").value;

  // C O N V E R T   I N P U T S   T O   M S
  const birthDate = new Date(yearValue, monthValue, dayValue).getTime();

  // R E A C T I V A T E   A N I M A T I O N
  let firstRun = true;


  // S E T   I N T E R V A L   F O R   S E C O N D S
  intervalID = setInterval(() => {
    // G E T   C U R R E N T   T I M E
    let today = new Date().getTime();

    // C A L C   A G E
    const age = today - birthDate;

    const years = Math.floor(age / 31557600000);
    const yearsRemainder = age % 31557600000;
    const months = Math.floor(yearsRemainder / 2629746000);
    const monthsRemainder = yearsRemainder % 2629746000;
    const days = Math.floor(monthsRemainder / 86400000);
    const daysRemainder = monthsRemainder % 86400000;
    const hours = Math.floor(daysRemainder / 3600000);
    const hoursRemainder = daysRemainder % 3600000;
    const minutes = Math.floor(hoursRemainder / 60000);
    const minutesRemainder = hoursRemainder % 60000;
    const seconds = Math.floor(minutesRemainder / 1000);

    if (firstRun) {
      yearsDisplay.setAttribute("data-val", years);
      monthsDisplay.setAttribute("data-val", months);
      daysDisplay.setAttribute("data-val", days);
      hoursDisplay.setAttribute("data-val", hours);
      minutesDisplay.setAttribute("data-val", minutes);
      secondsDisplay.setAttribute("data-val", seconds);

      animateNumbers();
      firstRun = false;
    } else {
      secondsDisplay.textContent = seconds;
    }
  }, 1000);
});

function animateNumbers() {
  let interval = 3000;
  let valueDisplays = document.querySelectorAll(".num");
  valueDisplays.forEach((valueDisplay) => {
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
    let duration = endValue === 0 ? interval : Math.floor(interval / endValue);

    let counter = setInterval(function () {
      if (startValue == endValue) {
        clearInterval(counter);
      } else {
        startValue += 1;
        valueDisplay.textContent = startValue;
      }
    }, duration);
  });
}
