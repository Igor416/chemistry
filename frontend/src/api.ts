import { Element, Klass } from "./JSONTypes"
import Cookies from 'js-cookie';

export function getElements(): Promise<Element[]> {
	const url = 'elements/';

	return sendGetRequest<Element[]>(url);
}

export function getElement(symbol: string): Promise<Element> {
	const url = 'elements/' + symbol + '/';

	return sendGetRequest<Element>(url);
}

export function getKlasses(): Promise<Klass[]> {
	const url = 'klasses';

	return sendGetRequest<Klass[]>(url);
}

async function sendPostRequest<T, R>(url: string, body: T): Promise<R> {
	const options = {
		method: "POST",
		headers: {
			'X-CSRFToken': Cookies.get('csrftoken') as string,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	}
	const response = await fetch('api/' + url, options);
	const data = await response.json();
	return data;
}

async function sendGetRequest<T>(url: string): Promise<T> {
	const response = await fetch('api/' + url);
	const data = await response.json();
	return data;
}
