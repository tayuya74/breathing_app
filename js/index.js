// document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.querySelector(".start-button");
	const stopButton = document.querySelector(".stop-button");
	let canStart = false;
	let countdown

	// Получаем ссылки на аудио элементы
	const inhaleSound = document.getElementById('inhaleSound');
	const holdSound = document.getElementById('holdSound');
	const exhaleSound = document.getElementById('exhaleSound');

	// Функция для воспроизведения звука
	function playSound(sound) {
		sound.currentTime = 0; // Сбрасываем время воспроизведения
		sound.play().catch(error => {
			console.log('Ошибка воспроизведения звука:', error);
		});
	}

	// Функция для остановки всех звуков
	function stopAllSounds() {
		inhaleSound.pause();
		holdSound.pause();
		exhaleSound.pause();
		inhaleSound.currentTime = 0;
		holdSound.currentTime = 0;
		exhaleSound.currentTime = 0;
	}

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
			exhaleSound.pause();
			playSound(inhaleSound);
			runTimer(4, translations[language].inhale, () => {
				inhaleSound.pause();
				playSound(holdSound);
				runTimer(7, translations[language].hold, () => {
					startButton.classList.remove("start-button-inhale");
					startButton.classList.add("start-button-exhale");
					holdSound.pause();
					playSound(exhaleSound);
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
		stopAllSounds();
  }

	function stopBreathing() {
		clearInterval(countdown);
		resetButton();
		startButton.classList.remove("start-button-inhale");
		startButton.classList.remove("start-button-exhale");
		stopAllSounds();
	}

	stopButton.addEventListener("click", stopBreathing);
// });