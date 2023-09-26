export default class EventEmitter {
	constructor() {
		this.__subscribers = {};
	}
	on(name, callback) {
		if (!(name in this.__subscribers)) this.__subscribers[name] = [];
		this.__subscribers[name].push(callback);
	}
	off(name, callback) {
		if (name in this.__subscribers) {
			this.__subscribers[name] = this.__subscribers[name].filter(registeredCallback => registeredCallback === callback);
		}
	}
	emit(name, payload) {
		if (name in this.__subscribers) {
			this.__subscribers[name].forEach(callback => callback(payload));
		}
	}
}