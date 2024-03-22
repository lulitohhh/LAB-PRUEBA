import { Personaje } from './data/data.model';
import getcharacter, { getNameEpisode } from './data/dataFetch';
import { CrearCartoon } from './components/indexPadre';
import { datosPersonaje } from './components/personaje/personaje';

class appContainer extends HTMLElement {
	cartoons!: Personaje[];
	cantidadPersonajes?: number;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		return ['cantidadpersonajes'];
	}

	attributeChangedCallback(attrName: string, oldVal: any, newVal: any) {
		if (attrName == 'cantidadpersonajes') this.cantidadPersonajes = newVal ? Number(newVal) : undefined;

		this.render();
	}

	connectedCallback() {
		//this.cartoons = await getcharacter(this.cantidadPersonajes!);
		//this.render();
	}

	async render() {
		this.cartoons = await getcharacter(this.cantidadPersonajes!);
		this.removeAllChilds();
		if (this.shadowRoot) {
			this.cartoons?.forEach(async (personaje: Personaje) => {
				const nameEpisode = await getNameEpisode(personaje.episode[0]);
				const personcard = this.ownerDocument.createElement('crear-cartoon') as CrearCartoon;
				personcard.setAttribute(datosPersonaje.image, personaje.image);
				personcard.setAttribute(datosPersonaje.status, personaje.status);
				personcard.setAttribute(datosPersonaje.species, personaje.species);
				personcard.setAttribute(datosPersonaje.name, personaje.name);
				personcard.setAttribute(datosPersonaje.type, personaje.type);
				personcard.setAttribute(datosPersonaje.origin, personaje.origin.name);
				personcard.setAttribute(datosPersonaje.nameep, nameEpisode.name);
				this.shadowRoot?.appendChild(personcard);
			});
		}
	}

	removeAllChilds() {
		while (this.shadowRoot?.hasChildNodes()) {
			this.shadowRoot?.removeChild(this.shadowRoot.firstChild!);
		}
	}
}

window.customElements.define('app-container', appContainer);
