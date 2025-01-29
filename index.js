document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".start-button");

  button.addEventListener("click", function () {
      startBreathingCycle();
  });

  function startBreathingCycle() {
    button.classList.add("start-button-active");

      runTimer(4, "Вдох", () => {
          runTimer(7, "Задержка", () => {
              runTimer(8, "Выдох", () => {
                  resetButton();
              });
          });
      });
  }

  function runTimer(seconds, text, callback) {
      let timer = seconds;
      button.innerHTML = `<span>${text}</span> ${timer}`;
      let countdown = setInterval(() => {
          timer--;
          if (timer >= 0) {
            button.innerHTML = `<span>${text}</span> ${timer}`;

          } else {
              clearInterval(countdown);
              callback();
          }
      }, 1000);
  }

  function resetButton() {
      button.classList.remove("start-button-active");
      button.textContent = "Старт";
  }
});