const dropdown = document.querySelector('.dropdown');
const input = document.querySelector('input');
const listOfOptions = document.querySelectorAll('.option');

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
document.body.addEventListener('click', closeDropdownFromOutside);
// options selection
listOfOptions.forEach((option) => {
	option.addEventListener('click', selectOption);
});
// dropdown toggle
dropdown.addEventListener('click', toggleDropdown);