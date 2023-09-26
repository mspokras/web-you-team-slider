const devMode = false;
const consoleLogs = devMode;
const consoleWarns = devMode;
const consoleDebug = devMode;
const alertOnLog = false; // Alert on log / debug / warn
const alertOnError = devMode;

// Просто логирование какого-то события
export function log(...args) {
	if (consoleLogs) console.log(...args);
	if (alertOnLog) alert(args.join(" :: "));
}
// Особые данные для отладки
export function debug(...args) {
	if (consoleDebug) console.debug(...args);
	if (alertOnLog) alert(args.join(" :: "));
}
// Приложение быстрее всего продолжит работать без сбоев, но эта часть кода не ожидается к выполнению.
export function warn(...args) {
	if (consoleWarns) console.warn(...args);
	if (alertOnLog) alert(args.join(" :: "));
}
// Критическая ошибка в приложении
export function error(...args) {
		console.error(...args);
	if (alertOnError) alert(args.join(" :: "));
}
export const logger = {
	log,
	debug,
	warn,
	error
}
export default logger;