import { isString } from "../utils.js";
import { error, warn, debug } from "../logger/index.js";
import { MainScopeIsBusyError, ModuleIsNotReadyToUseError } from "./errors.js";
import EventEmitter from "../patterns/EventEmitter.js";
const initialStruct = {
	__app__: true,
	context: {},
	registered: new Map(),
	ready: new Map(),
	dependencies: {},
};
export class Module extends EventEmitter {
	constructor(props) {
		super();
			debug(`Construct module > props: ${JSON.stringify(props)}`, ` Module: ${JSON.stringify(this)};`);
		this.state = {
			registered: false,
			ready: false,
		};
		Object.assign(this, props);
		const { name, entry, required, cleanup } = props;
	}
	get ready() {
		return this.state.ready;
	}
	set ready(value) {
		this.state.ready = value;
		this.emit("ready", this);
	}
	get registered() {
		return this.state.registered;
	}
	set registered(value) {
		this.state.registered = value;
	}
	init(context) {
			debug(`Init module > context: ${context}`, ` Module: ${this};`);
		if (!this.registered) return warn("Module is unregistered");
		this.context = this.entry(context);
		this.ready = true;
	}
	detouch() {
			debug(`Detouch module;`, ` Module: ${this};`);
		if (!this.registered) return warn("Module is unregistered");
		if (this.ready) {
			this.ready = false;
			this.cleanup();
		}
		this.registered = false;
	}
}
export class ModuleManager extends EventEmitter {
	constructor() {
		super();
		if (window.__app__ === undefined) {
			Object.assign(this, initialStruct);
			window.__app__ = this;
		} else {
			if (window.__app__.__app__) {
				return window.__app__;
			} else {
				throw new MainScopeIsBusyError();
			}
		}
	}
	isReady(target) {
		return isString(target) ? this.ready.has(target) : target.every(item => this.ready.has(item));
	}
	isRegistered(target) {
		return isString(target) ? this.registered.has(target) : target.every(item => this.registered.has(item));
	}
	setAsReady(module) {
		this.context[module.name] = module.context;
		this.ready.set(module.name, module);
		this.emit("ready", module);
	}
	setAsRegistered(module) {
		this.registered.set(module.name, module);
	}
	addDependencies(srcName, target) {
		const add = (targetName) => {
			if (targetName in this.dependencies) {
				this.dependencies[targetName].add(srcName);
			} else {
				this.dependencies[targetName] = new Set(srcName);
			}
		}
		return isString(target) ? add(target) : target.forEach(item => add(item));
	}
	removeDependencies(srcName, target) {
		const remove = (targetName) => {
			if (targetName in this.dependencies) {
				this.dependencies[targetName].remove(srcName);
			}
		}
		return isString(target) ? remove(target) : target.forEach(item => remove(item));
	}
	hasReferences(name) {
		return this.getReferences(name)?.size;
	}
	getReferences(name) {
		return this.dependencies[name];
	}
	get(name) {
		return this.registered.get(name);
	}
	use(name) {
		if (!this.isReady(name)) throw new ModuleIsNotReadyToUseError(module);
		return this.context[name];
	}
	add(module) {
		if (this.isRegistered(module.name)) return warn(`The module is already registered: ${module.name}`);
		module.on("ready", () => this.setAsReady(module));
		if (module.required) this.addDependencies(module.name, module.required);
		module.on("beforeDetouch", () => this.setAsReady(module));
		module.registered = true;
		this.setAsRegistered(module);
		if (!module.required || this.isReady(module.required)) {
			module.init(this.context);
		} else {
			this.on("ready", ({ name }) => {
				if (isReady(module.required)) {
					module.init(this.context);
				}
			});
		}
	}
	detouch(name, force = true) {
		if (hasReferences(name) && !force) {
			return error(`Module can't be detouched. There are references to this module: ${Array.from(this.getReferences(name)).join(", ")}`);
		}
		get(name)?.detouch();
	}
}
export default new ModuleManager();