export function initChildInputIsFilledTracking() {
	const elems = document.querySelectorAll("[data-track-child-is-filled]");
	const inputHandler = (event) => {
		if (event.target.value.length > 0) {
			event.currentTarget.classList.add("child-input-is-filled");
		} else {
			event.currentTarget.classList.remove("child-input-is-filled");
		}
	};
	elems.forEach(elem => {
		elem.addEventListener("input", inputHandler);
		elem.addEventListener("change", inputHandler);
	});
}