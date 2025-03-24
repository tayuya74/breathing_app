document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".start-button");
	const stopButton = document.querySelector(".stop-button");
	const themeToggleButton = document.querySelector(".theme-toggle-button");
	let canStart = false;
	let countdown
	//time range option
	const dropdown = document.querySelector('.dropdown');
	const input = document.querySelector('input');
	const listOfOptions = document.querySelectorAll('.option');
	const body = document.body;
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

  button.addEventListener("click", function () {
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
		dropdown.classList.add("active");
		stopButton.classList.remove("active");
  }

	function stopBreathing() {
		clearInterval(countdown);
		resetButton();
		button.classList.remove("start-button-inhale");
		button.classList.remove("start-button-exhale");
	}

	stopButton.addEventListener("click", stopBreathing);
});