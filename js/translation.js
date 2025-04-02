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

let language = "en";
const languageToggleButton= document.querySelector(".language-toggle-button");

const options = document.querySelectorAll(".option");

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