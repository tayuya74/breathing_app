const themeToggleButton = document.querySelector(".theme-toggle-button");
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