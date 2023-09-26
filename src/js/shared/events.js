import moduleManager, { Module } from "./ModuleManager/index.js";
import EventEmitter from "./patterns/EventEmitter.js";

export const init = () => {
	const module = new Module({
		name: "events",
		entry: () => new EventEmitter(),
	});
	moduleManager.add(module);
}
export default init;