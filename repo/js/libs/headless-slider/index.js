import assign from "assign-deep";
import EventEmitter from "../EventEmitter.js";
import { PointerHandler, HORIZONTAL, VERTICAL, UP, DOWN, LEFT, RIGHT } from "./pointer-handler.js";
import { getTargetElem, isInit } from "../utils.js";
import { createColiseumFactory } from "./drivers/coliseum.js";


const defaultSettings = {
	direction: HORIZONTAL,
	slidesPerView: 7,
	frameSize: 7,
	init: true,
	loop: true,
	allowSwipes: true,
	activeSlide: 1,
	freeMode: false,
	driverFactory: createColiseumFactory({})
};
export class HeadlessSlider extends EventEmitter {
	constructor(target, options) {
		super();
		this.settings = assign({}, defaultSettings, options);
		this.eventHandlers = {};
		this.dom = {
			root: getTargetElem(target),
		}
		if (this.settings.init) this.init();
	}
	init() {
		this.emit("beforeInit", { core: this });
		this.state = this.state || {
			prevSlideIdx: -1,
		};
		this.initPointerHandler();
		this.initSwipes();
		this.collectSlides();
		if (this.slidesNumber > 0) {
			this.state.activeSlideIdx = "activeSlide" in this.settings ? this.settings.activeSlide - 1 : 0;
		} else {
			this.state.activeSlideIdx = -1;
		}
			console.log(this);
		this.initDriver();
		this.emit("afterInit", { core: this });
	}
	initDriver() {
		if (isInit(this.driver)) {
			this.driver.reset();
		} else {
			this.driver = this.settings.driverFactory(this);
		}
	}
	initPointerHandler() {
		const settings = {};
		settings.allowSwipes = this.settings.allowSwipes ? [this.settings.direction] : false;
		settings.allowDrag = this.settings.allowDrag ? [this.settings.direction] : false;
		if (this.pointerHandler) {
			this.pointerHandler.reset(settings);
		} else {
			this.pointerHandler = new PointerHandler(this.dom.root, settings);
		}
	}
	initSwipes() {
		if (this.settings.allowSwipes) {
			if (this.eventHandlers.onSwipe === undefined) {
				this.addSwipeHandler();
			}
			this.pointerHandler.on("swipe", this.eventHandlers.onSwipe);
		} else if ("onSwipe" in this.eventHandlers) {
			this.pointerHandler.off("swipe", this.eventHandlers.onSwipe);
		}
	}
	addSwipeHandler() {
		this.eventHandlers.onSwipe = ({ direction }) => {
			if (this.state.isDragged) this.cancelDrag();
			switch(direction) {
				case UP:
				case LEFT:
					this.nextSlide();
					break;
				case DOWN:
				case RIGHT:
					this.prevSlide();
					break;
			}
		};
	}
	cancelDrag() {
	}
	collectSlides() {
		this.dom.slides = [...this.dom.root.querySelectorAll("[data-headless-slide]")];
	}
	isInit() {
		return this.state.init;
	}
	attachModules() {
		if (this.settings.modules instanceof Array) {
			if (typeof this.modules === "object") {
				this.detachModules();
			}
			this.modules = {};
			this.settings.modules.forEach((Module) => {
				if (Module.alias in this.modules) {
					console.error("Module with the same alias is already registered: ", module.alias);
				}
				this.modules[Module.alias] = new Module(this);
			});
		}
	}
	detachModules() {

	}
	initSlides() {
		this.emit("initSlides", { core: this });
	}
	get slidesNumber() {
		return this.dom.slides.length;
	}
	get slides() {
		return this.dom.slides;
	}
	get activeSlide() {
		return this.dom.slides[this.activeSlideIdx];
	}
	get activeSlideIdx() {
		return this.state.activeSlideIdx;
	}
	get direction() {
		return this.state.direction;
	}
	prevSlide() {
		this.driver.prevSlide();
		this.emit("prevSlide", { core: this.core });
	};
	nextSlide() {
		this.driver.nextSlide();
		this.emit("nextSlide", { core: this.core });
	};
	atLastSlide() {

	}
	atFirstSlide() {
		
	}
}
