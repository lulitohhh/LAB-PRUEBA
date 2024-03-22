//const personaje = fetch('https://rickandmortyapi.com/api');

import { Cartoons } from './data.model';

/* personaje
	.then((result) => {
		console.log(result.json());
	})
	.then((data) => {
		console.log(data);
	})
	.catch((error) => {
		console.log(error);
	}); */

const baseUrlRick = 'https://rickandmortyapi.com/api/';

const getcharacter = async (cantidadPersonajes: number) => {
	//Construir el listado de personajes
	let listado = '';
	for (let index = 1; index <= cantidadPersonajes; index++) {
		listado += index + ',';
	}
	console.log('listado', listado);

	try {
		const getdata = await fetch(baseUrlRick + 'character/' + listado).then((respuesta) => {
			return respuesta.json();
		});
		console.log('Respuesta', getdata);

		return getdata;
	} catch (error) {
		console.log(error);
	}
};

export const getNameEpisode = async (url: string) => {
	try {
		const getdata = await fetch(url).then((respuesta) => {
			return respuesta.json();
		});
		console.log('Respuesta name eps', getdata);

		return getdata;
	} catch (error) {
		console.log(error);
	}
};

export default getcharacter;
