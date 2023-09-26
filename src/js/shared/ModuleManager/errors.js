export class MainScopeIsBusyError extends Error {
	constructor() {
		super("Main scope variable is busy");
	}
}
export class ModuleIsNotReadyToUseError extends Error {
	constructor({ name }) {
		super(`Module Is Not Ready To Use: ${name}`);
	}
}