export enum datosPersonaje {
	'image' = 'image',
	'name' = 'name',
	'status' = 'status',
	'species' = 'species',
	'type' = 'type',
	'origin' = 'origin',
	'nameep' = 'nameep',
}

class CrearCartoon extends HTMLElement {
	image!: string;
	name!: string;
	status!: string;
	species!: string;
	type!: string;
	origin!: string;
	nameep!: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const atributospersonaje: Record<datosPersonaje, null> = {
			image: null,
			status: null,
			species: null,
			name: null,
			type: null,
			origin: null,
			nameep: null,
		};
		return Object.keys(atributospersonaje);
		//return ['image', 'status', 'species', 'name', 'typ', 'origin', 'nameep'];
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(attrName: datosPersonaje, oldVal: any, newVal: any) {
		this[attrName] = newVal;
		console.log(attrName, newVal);

		// this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `

			<img src="${this.image}">
			<p class="titulo">${this.name}</p>
			<p>Estatus:${this.status}</p>
			<p>Species:${this.species}</p>
			<p>Type:${this.type}</p>
			<p>Origin:${this.origin}</p>
			<p>Episode:${this.nameep}</p>
      `;
		}
	}
}

window.customElements.define('crear-cartoon', CrearCartoon);
export default CrearCartoon;
