import { customApiUrl } from "./config.js";
import  { errorOnBadResponce } from "./errors.js";

export async function sendContactRequest(data) {
	const response = await fetch(`${customApiUrl}/contact-request/`, {
		method: "POST",
		body: data,
	});
	errorOnBadResponce(response);
	return response.json();
}