import EventEmitter from "../patterns/EventEmitter.js";
export class Store extends EventEmitter {
	constructor(initialState = {}) {
		super();
		this.prevState = {};
		this.state = initialState;
	}
	update(reducer) {
		this.prevState = this.state;
		this.state = reducer(this.state);
		this.emit("update", { state: this.state, prevState: this.prevState });
	}
};