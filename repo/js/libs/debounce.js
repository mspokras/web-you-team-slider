const defaultSettings = { leadingCall: true };
export const debounce = (callback, delay, options) => {
	const settings = options ? Object.assign(defaultSettings, options) : defaultSettings;
	let timeOut = null;

	return (...args) => {
		if (timeOut) {
			clearTimeout(timeOut);
			timeOut = setTimeout(() => {
				timeOut = null;
				callback(...args);
			}, delay);
		} else {
			timeOut = setTimeout(() => timeOut = null, delay);
			if (settings.leadingCall) {
				callback(...args);
			}
		}
	}
}