import moduleManager, { Module } from "../shared/ModuleManager/index.js";
import initStore from "./store/index.js";
import initEvents from "../shared/events.js";
import "../../../repo/components/drawers/index.js";
import { initPortals } from "../../../repo/js/libs/portals.js";
import { initChildInputIsFilledTracking } from "../../../repo/js/libs/trackChildInputIsFilled.js";
import { initTextareaAutoheight } from "../../../repo/js/libs/textareaAutoheight.js";
import { initBlockSizeTracking } from "../../../repo/js/libs/blockSizeVars.js";
import { isMobile } from "../../../repo/js/libs/functions.js";
import { log, error, debug } from "../shared/logger/index.js";

initStore();
initEvents();

const entry = (context, module) => {
	if (document.readyState === "interactive") {
		onDomReady();
	} else {
		window.addEventListener("DOMContentLoaded", onDomReady);
	}
	function onDomReady(event) {
		try {
			initPortals();
			drawers.init();
			initBurgerCloseOnNavClick();
			initCloseDrawersOnResize();
			initChildInputIsFilledTracking();
			initTextareaAutoheight();
			initBlockSizeTracking();
			initMarkOnScroll();
			addIsMobileClass();
			initNavBtns();
		} catch (ex) {
			error(ex);
		}
	}
}

const common = new Module({
	name: "common",
	entry: entry,
	required: ["events", "commonStore"],
});
moduleManager.add(common);

function initBurgerCloseOnNavClick() {
	$("[data-drawer='burger-menu']").on("click", ({target}) => {
		if (target.tagName === "A" || target.closest("a")) {
			drawers.close("burger-menu");
		}
	});
}
function addIsMobileClass() {
	if (isMobile.any()) {
		document.documentElement.classList.add("is-mobile");
	}
}
function initCloseDrawersOnResize() {
	const close = ({ matches }) => {
		drawers.get("burger-menu").close();
	}
	const mediaMatch = window.matchMedia("(max-width: 1150px)");
	mediaMatch.addListener(close);
}
function initMarkOnScroll() {
	document.addEventListener("scroll", () => {
		checkAndSet();
	});
	checkAndSet();

	function checkAndSet() {
		if (window.scrollY > 80) {
			document.documentElement.classList.add("scroll-80-plus");
		} else {
			document.documentElement.classList.remove("scroll-80-plus");
		}
	}
}
function isCurrentLocation(href) {
	if (isOnlyHash(href)) return true;
	if (isRelativeToRoot(href)) {
		return window.location.pathname + window.location.search === removeHash(href);
	} else if (isAbsoluteUrl(href)) {
		return removeHash(href) === removeHash(window.location.href);
	} else if (isRelativeUrl(href)) {
		return false;
	} else { // Внутри текущей директории
		if (hasNoSubDir(href)) {
			return removeHash(window.location.href).endsWith(removeDot(removeHash(href)));
		} else {
			return false;
		}
	}
	function isOnlyHash(href) {
		return href.startsWith("#");
	}
	function removeDot(href) {
		return href.replcae(/^\./, "");;
	}
	function hasNoSubDir(href) {
		return (/^(?:\.\/)?[^\/]*/i).test(href);
	}
	function isAbsoluteUrl(href) {
		return (/^(?:http|https).*/i).test(href);
	}
	function isRelativeToRoot(href) {
		return (/^\/.*/i).test(href);
	}
	function isRelativeUrl(href) {
		return (/^..\.*/i).test(href);
	}
	function removeHash(href) {
		const hashIdx = href.lastIndexOf("#");
		return href.slice(0, hashIdx);
	}
}
function initNavBtns() {
	const elems = document.querySelectorAll("a[href*='#']");
	elems.forEach(elem => {
		elem.addEventListener("click", (event) => {
			const href = elem.getAttribute("href");
			if (isCurrentLocation(href)) {
				event.preventDefault();
				const hash = extractHash(href);
				if (hash) {
					toSection(hash, { offset: Number(elem.getAttribute("data-scroll-offset")) });
				}
			}
		});
	});
	function extractHash(href) {
		const hashMatch = href.match(/.*?#([^\?]*)/);
		if (!hashMatch) return hashMatch;
		return hashMatch[1];
	}
}
function toSection(id, options = {}) {
	const sectionElem = document.querySelector(`#${id}`);
	if (sectionElem) {
		const headerElem = document.querySelector(`header`);
		const sectionBcr = sectionElem.getBoundingClientRect();
		const offset = "offset" in options ? options.offset : 0;
		const newScrollPos = sectionBcr.top + window.scrollY - headerElem.offsetHeight + offset;
		if (isBodyLocked()) {
			options.timeout = 400;
		}
		if ("timeout" in options) {
			setTimeout(() => {
				window.scrollTo({ top: newScrollPos, behavior: 'smooth' });
			}, options.timeout);
		} else {
			window.scrollTo({ top: newScrollPos, behavior: 'smooth' });
		}
	}

	function isBodyLocked() {
		return document.querySelector("body").classList.contains("lock");
	}
}