import assign from "assign-deep";
import EventEmitter from "../EventEmitter.js";
import { getTargetElem } from "../utils.js";

export const HORIZONTAL = "horizontal";
export const VERTICAL = "vertical";
export const UP = "up";
export const DOWN = "down";
export const LEFT = "left";
export const RIGHT = "right";

const defaultSettings = {
	swipeMinPath: 15, // px
	swipeMaxDuration: 500, // Ms
	swipeMinSpeed: 0.1, // path / duration
	directionDetectionPath: 6, // px
	allowDrag: [VERTICAL, HORIZONTAL],
	allowSwipes: [VERTICAL, HORIZONTAL],
	preventDefault: true,
};

export class PointerHandler extends EventEmitter {
	constructor(target, options) {
		super();
		this.settings = assign({}, defaultSettings, options);
			console.log("PointerHandler", options, this.settings);
		this.elem = getTargetElem(target);
		this.resetState();
		this.initEventListeners();
	}
	initEventListeners() {
		if ("ontouchstart" in window) {
			const touchStartHandler = ({ targetTouches, timeStamp }) => {
				if (targetTouches.length > 1) return;
				if (this.state.startTs !== null) {
					this.touchEnd({ endTs: timeStamp });
					this.elem.removeEventListener("touchend", touchMoveHandler);
					this.elem.removeEventListener("touchmove", touchEndHandler);
				}
				this.touchStart({
					type: "touch",
					startTs: timeStamp,
					touchIdentifier: targetTouches[0].identifier,
					startClientX: targetTouches[0].clientX,
					startClientY: targetTouches[0].clientY
				});
				this.elem.addEventListener("touchmove", touchMoveHandler, { passive: false });
				this.elem.addEventListener("touchend", touchEndHandler);
			}
			const touchMoveHandler = (event) => {
				const { changedTouches, timeStamp } = event;
				const matchingTouch = [...changedTouches].find(({ identifier }) => identifier === this.state.touchIdentifier);
				if (!matchingTouch) return;
				this.touchMove(event, {
					endTs: timeStamp,
					endClientX: matchingTouch.clientX,
					endClientY: matchingTouch.clientY
				});
			}
			const touchEndHandler = ({ changedTouches, timeStamp }) => {
				const matchingTouch = [...changedTouches].find(({ identifier }) => identifier === this.state.touchIdentifier);
				if (!matchingTouch) return;
				this.touchEnd({
					endTs: timeStamp,
					endClientX: matchingTouch.clientX,
					endClientY: matchingTouch.clientY
				});
				this.elem.removeEventListener("touchend", touchMoveHandler);
				this.elem.removeEventListener("touchmove", touchEndHandler);
			}
			this.elem.addEventListener("touchstart", touchStartHandler, { passive: false });
		} else {
			const mouseDownHandler = ({ clientX, clientY, timeStamp }) => {
				if (this.state.startTs !== null) {
					this.touchEnd({ endTs: timeStamp });
					this.elem.removeEventListener("mousemove", mouseMoveHandler);
					this.elem.removeEventListener("mouseup", mouseUpHandler);
				}
				this.touchStart({
					type: "mouse",
					startTs: timeStamp,
					startClientX: clientX,
					startClientY: clientY
				});
				this.elem.addEventListener("mousemove", mouseMoveHandler);
				this.elem.addEventListener("mouseup", mouseUpHandler);
			}
			const mouseMoveHandler = (event) => {
				const { clientX, clientY, timeStamp } = event;
				this.touchMove(event, {
					endTs: timeStamp,
					endClientX: clientX,
					endClientY: clientY
				});
			}
			const mouseUpHandler = ({ clientX, clientY, timeStamp }) => {
				this.touchEnd({
					endTs: timeStamp,
					endClientX: clientX,
					endClientY: clientY
				});
				this.elem.removeEventListener("mousemove", mouseMoveHandler);
				this.elem.removeEventListener("mouseup", mouseUpHandler);
			}
			this.elem.addEventListener("mousedown", mouseDownHandler);
		}
	}
	touchStart(payload) {
		Object.assign(this.state, payload);
		this.emit("touchStart", this);
	}
	touchMove(event, payload) {
		Object.assign(this.state, payload);
		this.recalcVectorLength();
		if (this.state.direction === null) {
			if (this.settings.preventDefault && event.cancelable) {
				event.preventDefault();
			}
			if (this.state.vectorLength >= this.settings.directionDetectionPath) {
				this.defineDirection();
			}
		} else {
			this.recalcOffset();
			if (this.settings.preventDefault && event.cancelable) {
				if (this.isDragAllowed() || this.isSwipeAllowed()) {
					event.preventDefault();
				}
			}
			if (this.isDragAllowed()) {
				if (this.state.dragStartTs === null) {
					this.dragStart(payload);
				} else {
					this.dragMove(payload);
				}
			}
		}
		this.emit("touchMove", { instance: this });
	}
	touchEnd(payload) {
		Object.assign(this.state, payload);
		this.recalcOffset();
		this.saveState();
		this.emit("touchEnd", this);
		if (this.state.dragStartTs !== null) {
			this.dragEnd(payload);
		}
		if (this.isSwipeAllowed()) {
			if (this.isSwipeConsistent()) {
				this.swipe();
			}
		}
		this.resetState();
	}
	isSwipeAllowed() {
		return this.settings.allowSwipes && this.settings.allowSwipes.includes(this.state.direction);
	}
	isSwipeConsistent() {
		const swipeDuration = this.state.endTs - this.state.startTs;
		if (swipeDuration > this.settings.swipeMaxDuration) return false;
		const absOffset = Math.abs(this.state.offset);
		if (absOffset < this.settings.swipeMinPath) return false;
		const speed = absOffset / swipeDuration;
			console.log(speed);
		return speed > this.settings.swipeMinSpeed;
	}
	recalcVectorLength() {
		const katA = Math.abs(this.state.endClientX - this.state.startClientX);
		const katB = Math.abs(this.state.endClientY - this.state.startClientY);
		return this.state.vectorLength = Math.sqrt(Math.pow(katA, 2) + Math.pow(katB, 2));
	}
	defineDirection() {
		return this.state.direction = (Math.abs(this.state.endClientX - this.state.startClientX) < Math.abs(this.state.endClientY - this.state.startClientY) ?
			VERTICAL : HORIZONTAL);
	}
	recalcOffset() {
		return this.state.offset = (this.state.direction == VERTICAL ? this.state.endClientY - this.state.startClientY : this.state.endClientX - this.state.startClientX);
	}
	isDragAllowed() {
		return this.settings.allowDrag && this.settings.allowDrag.includes(this.state.direction);
	}
	dragStart({ timeStamp }) {
		this.state.dragStartTs = timeStamp;
		this.emit("dragStart", this);
	}
	dragMove(payload) {
		this.emit("dragMove", this);
	}
	dragEnd(payload) {
		this.emit("dragEnd", this);
	}
	saveState() {
		this.lastState = this.state;
	}
	swipe() {
		const payload = { instance: this };
		if (this.state.direction === HORIZONTAL) {
			payload.direction = this.state.offset < 0 ? LEFT : RIGHT;
		} else {
			payload.direction = this.state.offset < 0 ? DOWN : UP;
		}
		this.emit("swipe", payload);
	}
	resetState() {
		this.state = {
			touchIdentifier: null,
			direction: null,
			startTs: null,
			startClientX: null,
			startClientY: null,
			endTs: null,
			endClientX: null,
			endClientY: null,
			dragStartTs: null,
		};
	}
}