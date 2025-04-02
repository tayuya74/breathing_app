// document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.querySelector(".start-button");
	const stopButton = document.querySelector(".stop-button");
	let canStart = false;
	let countdown

	updateLanguage(language);

  startButton.addEventListener("click", function () {
		const selectedTime = parseInt(input.value);
    const cycles = Math.floor(selectedTime * 60 / 19); // 19 секунд на один цикл (4+7+8)
    if (canStart) {
			startBreathingCycle(cycles);
			dropdown.classList.remove("active");
			stopButton.classList.add("active");
			input.value = ''
		}
		canStart = false;
  });

  function startBreathingCycle(cycles) {
    if (cycles > 0) {
			startButton.classList.add("start-button-inhale");
			runTimer(4, translations[language].inhale, () => {
				runTimer(7, translations[language].hold, () => {
					startButton.classList.remove("start-button-inhale");
					startButton.classList.add("start-button-exhale");
					runTimer(8, translations[language].exhale, () => {
						startBreathingCycle(cycles - 1);
						startButton.classList.remove("start-button-exhale");
					});
				});
			});
		} else {
			resetButton();
		}
  }

  function runTimer(seconds, text, callback) {
    let timer = seconds;
    startButton.innerHTML = `<span>${text}</span> ${timer}`; //для отображения цикла и времени
    countdown = setInterval(() => {
			timer--;
			if (timer >= 0) {
				startButton.innerHTML = `<span>${text}</span> ${timer}`; //для отображения цикла и времени
			} else {
				clearInterval(countdown);
				callback();
			}
    }, 1000);
  }

  function resetButton() {
    startButton.classList.remove("start-button-active");
    startButton.textContent = translations[language].start;
		dropdown.classList.add("active");
		stopButton.classList.remove("active");
  }

	function stopBreathing() {
		clearInterval(countdown);
		resetButton();
		startButton.classList.remove("start-button-inhale");
		startButton.classList.remove("start-button-exhale");
	}

	stopButton.addEventListener("click", stopBreathing);
// });