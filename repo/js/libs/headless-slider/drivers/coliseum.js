import assign from "assign-deep";

const defaultSettings = {
};

export class Coliseum {
	constructor(core, options = {}) {
		this.core = core;
		this.state = {};
		this.settings = assign(defaultSettings, options);
		this.init();
	}
	init() {
		this.state.availabelSlidesPerView = Math.min(this.core.settings.slidesPerView, this.core.slidesNumber);
		this.state.maxSlidesAside = Math.ceil((this.state.availabelSlidesPerView - 1) / 2);
		this.recalcSlidesPosition();
	}
	get slides() {
		return this.core.slides;
	}
	get activeSlideIdx() {
		return this.core.activeSlideIdx;
	}
	get activeSlide() {
		return this.core.activeSlide;
	}
	get direction() {
		return this.core.direction;
	}
	get slidesNumber() {
		return this.core.slidesNumber;
	}
	nextSlide() {
		this.core.state.direction = "forward";
		const nextSlideIdx = this.activeSlideIdx + 1;
		const lastSlideIdx = this.slidesNumber - 1;
		if (nextSlideIdx < lastSlideIdx) {
			this.core.state.activeSlideIdx = nextSlideIdx;
		} else if (nextSlideIdx === lastSlideIdx) {
			this.core.state.activeSlideIdx = nextSlideIdx;
			this.core.atLastSlide();
		} else { // Out of array
			if (this.core.settings.loop) {
				this.core.state.activeSlideIdx = 0;
				this.core.atFirstSlide();
			}
		}
		this.recalcSlidesPosition();
	}
	prevSlide() {
		this.core.state.direction = "backward";
		const prevSlideIdx = this.activeSlideIdx - 1;
		if (prevSlideIdx > 0) {
			this.core.state.activeSlideIdx = prevSlideIdx;
		} else if (prevSlideIdx === 0) {
			this.core.state.activeSlideIdx = prevSlideIdx;
			this.core.atFirstSlide();
		} else { // Out of array
			if (this.core.settings.loop) {
				this.core.state.activeSlideIdx = this.slidesNumber - 1;
				this.core.atLastSlide();
			}
		}
		this.recalcSlidesPosition();
	}
	recalcSlidesPosition() {
		const slidesBeforeFocus = this.getSlidesBeforeFocus();
		const slidesAfterFocus = this.getSlidesAfterFocus();
		const slidesOutsideOfView = this.getSlidesOutsideOfView();
		this.activeSlide.setAttribute("data-slide-position", 0);
		slidesBeforeFocus.reverse().forEach((elem, idx) => {
			elem.setAttribute("data-slide-position", -1 - idx);
		});
		slidesAfterFocus.forEach((elem, idx) => {
			elem.setAttribute("data-slide-position", 1 + idx);
		});
		slidesOutsideOfView.forEach((elem) => {
			elem.setAttribute("data-slide-position", "outside");
		});
	}
	getEdgeOfSlidesBeforeFocus() {
		if (this.isAsymetric() && this.direction === "forward") return this.activeSlideIdx - this.state.maxSlidesAside;
		return this.activeSlideIdx - this.state.maxSlidesAside + 1;
	}
	getEdgeOfSlidesAfterFocus() {
		if (this.isAsymetric() && this.direction === "forward") return this.activeSlideIdx + this.state.maxSlidesAside - 1;
		return this.activeSlideIdx + this.state.maxSlidesAside;
	}
	isAsymetric() {
		return this.state.availabelSlidesPerView < this.core.settings.slidesPerView && this.state.availabelSlidesPerView % 2 === 0;
	}
	getSlidesBeforeFocus() {
		const edge = this.getEdgeOfSlidesBeforeFocus();
		return edge >= 0 ?
			this.slides.slice(edge, this.activeSlideIdx) :
			[...this.slides.slice(edge), ...this.slides.slice(0, this.activeSlideIdx)];
	}
	getSlidesAfterFocus() {
		const edge = this.getEdgeOfSlidesAfterFocus();
		return edge < this.slidesNumber ?
			this.slides.slice(this.activeSlideIdx + 1, edge + 1) :
			[...this.slides.slice(this.activeSlideIdx + 1), ...this.slides.slice(0, edge + 1 - this.slidesNumber)];
	}
	getSlidesOutsideOfView() {
		const from = this.getEdgeOfSlidesAfterFocus() + 1;
		const to = this.getEdgeOfSlidesBeforeFocus(); // -1 + 1
		if (from < this.slidesNumber) {
			if (to < 0) {
				return this.slides.slice(from, to + this.slidesNumber);
			} else {
				return [...this.slides.slice(from), ...this.slides.slice(0, to)];
			}
		} else {
			return this.slides.slice(from - this.slidesNumber, to);
		}
	}
	reset() {

	}
}
export function createColiseumFactory(options) {
	return (core) => new Coliseum(core, options);
}