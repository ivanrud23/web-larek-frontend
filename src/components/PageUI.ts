import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { EventEmitter } from './base/events';

interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
	basket: HTMLButtonElement;
}

export class PageUI extends Component<IPage> {
	protected elementCounter: HTMLElement;
	protected elementCatalog: HTMLElement;
	protected elementWrapper: HTMLElement;
	protected elementBasket: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this.elementCounter = ensureElement(
			'.header__basket-counter',
			this.container
		);
		this.elementBasket = ensureElement(
			'.header__basket',
			this.container
		) as HTMLButtonElement;
		this.elementCatalog = ensureElement('.gallery', this.container);
		this.elementWrapper = ensureElement('.page__wrapper');

		this.elementBasket.addEventListener('click', () => {
			this.events.emit('page-basket:select');
		});
	}

	set counter(value: number) {
		this.setText(this.elementCounter, value);
	}

	set catalog(items: HTMLElement[]) {
		this.elementCatalog.replaceChildren(...items);
	}

	set locked(value: boolean) {
		if (value) {
			this.elementWrapper.classList.add('page__wrapper_locked');
		} else {
			this.elementWrapper.classList.remove('page__wrapper_locked');
		}
	}
}
