document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.querySelector(".start-button");
	const stopButton = document.querySelector(".stop-button");
	const themeToggleButton = document.querySelector(".theme-toggle-button");
	let canStart = false;
	let countdown
	//time range option
	const dropdown = document.querySelector('.dropdown');
	const input = document.querySelector('input');
	const listOfOptions = document.querySelectorAll('.option');
	const body = document.body;

	// переключение языка начало
	const translations = {
		en: {
			start: "start",
			stop: "stop",
			selectDuration: "select duration",
			option1: "1 minute - 3 cycles",
			option2: "3 minutes - 9 cycles",
			inhale: "inhale",
			exhale: "exhale",
			hold: "hold",
		},
		ru: {
			start: "старт",
			stop: "стоп",
			selectDuration: "выберите продолжительность",
			option1: "1 минута - 3 цикла",
			option2: "3 минуты - 9 циклов",
			inhale: "вдох",
			exhale: "выдох",
			hold: "задержка",
		},
	};
	const languageToggleButton= document.querySelector(".language-toggle-button");
	const options = document.querySelectorAll(".option");
	let language = "en";

  // Функция для обновления текста на странице
  function updateLanguage(language) {
    startButton.textContent = translations[language].start;
    stopButton.textContent = translations[language].stop;
    input.placeholder = translations[language].selectDuration;
    options[0].textContent = translations[language].option1;
    options[1].textContent = translations[language].option2;
  }

	  // Обработчик переключения языка
		languageToggleButton.addEventListener("click", function () {
			language = language === "ru" ? "en" : "ru";
			updateLanguage(language);
			languageToggleButton.textContent = language.toUpperCase();
		});

		// Установить начальный язык
		updateLanguage(language);

	// переключение языка конец

// basic toggle (open/close) function
// "classList.toggle(className)" toggles 'opened' class
	function toggleDropdown(event) {
		event.stopPropagation();
		dropdown.classList.toggle('opened');
	};
// option selection from dropdown list
// used "event.currentTarget" to specify the selected option
// after option is chosen, its "textContent" value being copied to input's value
	function selectOption(event) {
		input.value = event.currentTarget.textContent;
		canStart = true
	};
//the dropdown list to close when clicked outside of it
// if dropdown list is in opened state
// then remove the ".opened" class
	function closeDropdownFromOutside() {
		if (dropdown.classList.contains('opened')) {
			dropdown.classList.remove('opened');
		}
	};
// dropdown Event Listeners
// if we click anywhere on "body" and dropdown list opened the dropdown will be closed
	body.addEventListener('click', closeDropdownFromOutside);
// options selection
	listOfOptions.forEach((option) => {
  	option.addEventListener('click', selectOption);
	});
// dropdown toggle
	dropdown.addEventListener('click', toggleDropdown);

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
    startButton.textContent = "Старт";
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
});