import moduleManager from "../ModuleManager/index.js";
import { apiUrl } from "./config.js";
import  { errorOnBadResponce } from "./errors.js";
import { isNotEmptyString } from "../utils.js";

export async function fetchDepartmentEmployees(departmentId) {
	const store = moduleManager.use("pageStore");
	const sortEmployees = (a, b) => {
			const aOrder = a.crb_order;
			const bOrder = b.crb_order;
			if (isNotEmptyString(aOrder) && isNotEmptyString(bOrder)) {
				return Number(aOrder) - Number(bOrder);
			} else if (isNotEmptyString(aOrder)) {
				return -1;
			} else if (isNotEmptyString(bOrder)) {
				return 1;
			} else {
				return 0;
			}
		};
	store.update((state) => {
		return {
			...state,
			employees: { ...state.employees, status: "loading" }
		};
	});
	const employees = (await fetchEmployees(`categories=${departmentId}`)).sort(sortEmployees);
	employees.forEach((data, idx) => data.__idx = idx);
	store.update((state) => {
		return {
			...state,
			employees: { ...state.employees, status: "idle", data: employees }
		};
	});
	return employees;
}
export async function fetchEmployees(query) {
	const store = moduleManager.use("pageStore");
	try {
		const response = await fetch(`${apiUrl}/employees?per_page=100&${query}`, {
			method: "GET"
		});
		errorOnBadResponce(response);
		return response.json();
	} catch (ex) {
		console.error("Error while fetcheeng employees");
	}
}
export async function fetchDepartments() {
	const store = moduleManager.use("pageStore");
	const langMap = {
		"en-US": "en",
		"pl-PL": "pl",
	};
	const lang = document.documentElement.getAttribute("lang");
		console.log(lang);
	store.update((state) => {
		return {
			...state,
			departments: { ...state.departments, status: "loading" }
		};
	});
		console.log(langMap[lang]);
	const employeesCategory = await fetchCategory(`employees-${langMap[lang]}`);
		console.log(employeesCategory);
	const departmentsList = await fetchCategories(`parent=${employeesCategory.id}`);
	store.update((state) => {
		return {
			...state,
			departments: { ...state.departments, status: "idle", data: departmentsList }
		};
	});
}
export async function fetchCategory(slug) {
	const store = moduleManager.use("pageStore");
		console.log(`fetchCategory. slug: ${slug}`);
	const query = `slug=${slug}`;
	return (await fetchCategories(query))[0];
}
export async function fetchCategories(query) {
	const store = moduleManager.use("pageStore");
	try {
		const response = await fetch(`${apiUrl}/categories?${query}`, {
			method: "GET"
		});
		errorOnBadResponce(response);
		return response.json();
	} catch (ex) {
		console.error("Error while fetching categories", ex);
	}
}