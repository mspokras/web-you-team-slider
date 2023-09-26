import moduleManager, { Module } from "../../../shared/ModuleManager/index.js";
import { Store } from "../../../shared/store/index.js";

const initialState = {
	departments: {
		status: "idle",
		data: [],
	},
	selectedEmployeeIdx: null,
	selectedDepartmentId: null,
	employees: {
		status: "idle",
		data: [],
	},
};

export const init = () => {
	const module = new Module({
		name: "pageStore",
		entry: () => new Store(initialState),
	});
	moduleManager.add(module);
}
export default init;