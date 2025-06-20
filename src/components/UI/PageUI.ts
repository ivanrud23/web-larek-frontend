import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { EventEmitter } from '../base/events';

interface IPage {
	counter: number;
	items: HTMLElement[];
	// locked: boolean;
	basket: HTMLButtonElement;
}

export class PageUI extends Component<IPage> {
	protected elementCounter: HTMLElement;
	protected elementItems: HTMLElement;
	protected elementWrapper: HTMLElement;
	protected elementBasket: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this.elementCounter = ensureElement<HTMLElement>('.header__basket-counter');
		this.elementItems = ensureElement<HTMLElement>('.gallery');
		this.elementWrapper = ensureElement<HTMLElement>('.page__wrapper');
		this.elementBasket = ensureElement<HTMLButtonElement>('.header__basket');

		this.elementBasket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	set counter(value: number) {
		this.setText(this.elementCounter, value);
	}

	set items(value: HTMLElement[]) {
		this.elementItems.replaceChildren(...value);
	}

	set locked(value: boolean) {
		if (value) {
			this.elementWrapper.classList.add('page__wrapper_locked');
		} else {
			this.elementWrapper.classList.remove('page__wrapper_locked');
		}
	}
}
