import { Element, Ion, Klass } from './JSONTypes'
import Cookies from 'js-cookie';

export function getElementsList(): Promise<Element[]> {
	const url = 'elements_list/';

	return sendGetRequest<Element[]>(url);
}

export function getElements(): Promise<Element[]> {
	const url = 'elements/';

	return sendGetRequest<Element[]>(url);
}

export function getElement(atomicNumber: number): Promise<Element> {
	const url = 'elements/' + atomicNumber + '/';

	return sendGetRequest<Element>(url);
}

export function getCations(): Promise<Ion[]> {
	const url = 'cations';

	return sendGetRequest<Ion[]>(url);
}

export function getAnions(): Promise<Ion[]> {
	const url = 'anions';

	return sendGetRequest<Ion[]>(url);
}

export function getKlassesList(): Promise<Klass[]> {
	const url = 'klasses_list';

	return sendGetRequest<Klass[]>(url);
}

export function getKlasses(): Promise<Klass[]> {
	const url = 'klasses';

	return sendGetRequest<Klass[]>(url);
}

export function getKlass(klass: string): Promise<Klass> {
	const url = 'klass/' + klass

	return sendGetRequest<Klass>(url);
}

async function sendPostRequest<T, R>(url: string, body: T): Promise<R> {
	const options = {
		method: 'POST',
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
