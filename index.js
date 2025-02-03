document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".start-button");
  const timeRange = document.getElementById("time-range");
	let active = true;

  button.addEventListener("click", function () {

		const selectedTime = parseInt(timeRange.value);
    const cycles = Math.floor(selectedTime * 60 / 19); // 19 секунд на один цикл (4+7+8)
    if (active) {
			startBreathingCycle(cycles);
		}
		timeRange.style.display="none"
		active = false;
  });

  function startBreathingCycle(cycles) {
    if (cycles > 0) {
			button.classList.add("start-button-inhale");
			runTimer(4, "Вдох", () => {
				runTimer(7, "Задержка", () => {
					button.classList.remove("start-button-inhale");
					button.classList.add("start-button-exhale");
					runTimer(8, "Выдох", () => {
						startBreathingCycle(cycles - 1);
						button.classList.remove("start-button-exhale");
					});
				});
			});
		} else {
			resetButton();
			active = true;
		}
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
		timeRange.style.display="initial"
  }
});