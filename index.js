document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".start-button");
	const stopButton = document.querySelector(".stop-button");
  const timeRange = document.getElementById("time-range");
	const themeToggleButton = document.querySelector(".theme-toggle-button");
	let canStart = true;
	let countdown

  button.addEventListener("click", function () {
		//TODO когда изменю селект для стилизации
		const selectedTime = parseInt(timeRange.value);
    const cycles = Math.floor(selectedTime * 60 / 19); // 19 секунд на один цикл (4+7+8)
    if (canStart) {
			startBreathingCycle(cycles);
		}
		timeRange.classList.remove("active");
		stopButton.classList.add("active");
		canStart = false;
  });
/* dark-mode */
// Проверяем, есть ли сохраненная тема
	if (localStorage.getItem("theme") === "dark") {
		document.body.classList.add("dark-mode");
		themeToggleButton.textContent = "dark_mode";
	} else {
		themeToggleButton.textContent = "light_mode";
	}

// Обработчик клика по кнопке
	themeToggleButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
		// Проверяем, какая тема активна, и сохраняем её в localStorage
		if (document.body.classList.contains("dark-mode")) {
			localStorage.setItem("theme", "dark");
			themeToggleButton.textContent = "dark_mode";
		} else {
			localStorage.setItem("theme", "light");
			themeToggleButton.textContent = "light_mode";
		}
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
			canStart = true;
		}
  }

  function runTimer(seconds, text, callback) {
    let timer = seconds;
    button.innerHTML = `<span>${text}</span> ${timer}`; //для отображения цикла и времени
    countdown = setInterval(() => {
			timer--;
			if (timer >= 0) {
				button.innerHTML = `<span>${text}</span> ${timer}`; //для отображения цикла и времени
			} else {
				clearInterval(countdown);
				callback();
			}
    }, 1000);
  }

  function resetButton() {
    button.classList.remove("start-button-active");
    button.textContent = "Старт";
		timeRange.classList.add("active");
		stopButton.classList.remove("active");
  }

	function stopBreathing() {
		clearInterval(countdown);
		resetButton();
		canStart = true;
		button.classList.remove("start-button-inhale");
		button.classList.remove("start-button-exhale");
	}

	stopButton.addEventListener("click", stopBreathing);
});