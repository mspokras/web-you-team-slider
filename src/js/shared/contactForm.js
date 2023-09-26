import  { sendContactRequest } from "./services/contactForm.js";

class AntispamBlock {
	constructor(duration) {
		this.duration = duration;
		this.timer = null;
	}
	unset() {
		clearInterval(this.timer);
		this.timer = null;
	}
	set(callback) {
		if (this.active) this.unset();
		this.counter = this.duration;
		this.timer = setInterval(() => {
			const lastCallback = this.counter === 1;
			callback && callback(this.counter, lastCallback);
			if (lastCallback) {
				this.unset();
			} else {
				this.counter--;
			}
		}, 1000);
	}
	get active() {
		return this.timer !== null;
	}
}
const reduceIterator = (iterator, acc = []) => {
		console.log("reduceIterator");
	let current;
	do {
		current = iterator.next();
		acc.push(current.value);
	} while (!current.done);
	return acc;
};
export function initContactForm(formId, pageStore, events) {
	const antispamBlock = new AntispamBlock(5);
	const $msgDataNotSentDisclosure = $(`#${formId} [data-msg-disclosure='data-not-sent']`);
	const $msgSuccessDisclosure = $(`#${formId} [data-msg-disclosure='data-successfully-sent']`);
	const $sendBtn = $(`#${formId} .contact-form__send-btn`);
	const $watsappCallBtn = $(`#${formId} .contact-form__call-btn`);
	const $form = $(`#${formId}`);
	$watsappCallBtn.on("click", (event) => {
		const formData = new FormData($form.get(0));
		if (reduceIterator(formData.values()).some(value => value !== undefined && value.length > 0)) {
			showIsNotSentMsg();
		}
	});
	const validator = $form.validate({
		ignore: [],
		highlight: function(element, errorClass, validClass) {
			$(element).closest(".form-field").addClass(errorClass);
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).closest(".form-field").removeClass(errorClass);
		},
		errorPlacement: function(error, element) {
			error.appendTo(element.closest(".form-input"));
		},
		// Отправляем данные на сервер
		submitHandler: async function(form, event) {
				event.preventDefault();
				if (antispamBlock.active) return false;
			antispamBlock.set((counter, lastCallback) => { if (lastCallback) enableBtns() });
			disableBtns();
			const formData = new FormData(form);
			if (formId == "cv-request-contact-form") {
				const { selectedEmployeeIdx, employees } = pageStore.state;
				if (selectedEmployeeIdx > -1 && employees.data.length) {
					formData.append("employee-id", employees.data[selectedEmployeeIdx].id);
					formData.append("employee-name", employees.data[selectedEmployeeIdx].crb_person_name);
				}
			}
			const response = sendContactRequest(formData);
			$form.get(0).reset();
			$msgDataNotSentDisclosure.removeClass("open");
			showSucccessMsg();
		}
	});
	function disableBtns() {
		$sendBtn.addClass("disabled");
		$watsappCallBtn.addClass("disabled");
	}
	function enableBtns() {
		$sendBtn.removeClass("disabled");
		$watsappCallBtn.removeClass("disabled");
	}
	function showSucccessMsg() {
		$msgSuccessDisclosure.addClass("open");
		setTimeout(() => {
			$msgSuccessDisclosure.removeClass("open");
		}, 5000);
	}
	function showIsNotSentMsg() {
		$msgDataNotSentDisclosure.addClass("open");
	}
	async function send(formData) {
		return await fetch(`${origin}/contact_request`, {
			method: "POST",
			body: formData,
			redirect: 'follow'
		});
	}
}