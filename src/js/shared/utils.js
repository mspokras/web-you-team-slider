export function isString(value) {
	return typeof value === "string";
}
export function isNotEmptyString(value) {
	return isString(value) && value.length > 0;
}