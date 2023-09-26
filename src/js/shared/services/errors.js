export class BadResponseError extends Error {
	constructor(response, msg) {
		super(msg || "Bad response (not ok)");
		this.response = response;
	}
}
export function errorOnBadResponce(response) {
	if (!response.ok) throw new BadResponseError(response);
}