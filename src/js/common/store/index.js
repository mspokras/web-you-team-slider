import moduleManager, { Module } from "../../shared/ModuleManager/index.js";
import { Store } from "../../shared/store/index.js";
const initialState = {};
export const init = () => {
	const module = new Module({
		name: "commonStore",
		entry: () => new Store(initialState),
	});
	moduleManager.add(module);
}
export default init;