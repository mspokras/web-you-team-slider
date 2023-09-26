import { throttle } from "./throttle.js";

const updateMinHeight = throttle((target) => {
	target.style.minHeight = "0px";
	target.style.minHeight = `${target.scrollHeight}px`;
}, 50);
const resizeObserver = new ResizeObserver((entries) => {
	entries.forEach(({ target }) => updateMinHeight(target));
});

export function initTextareaAutoheight() {
	const elems = document.querySelectorAll("textarea");
	const changeHandler = (event) => updateMinHeight(event.target);
	elems.forEach(elem => {
		resizeObserver.observe(elem);
		elem.addEventListener("input", changeHandler);
		elem.addEventListener("change", changeHandler);
	});
}