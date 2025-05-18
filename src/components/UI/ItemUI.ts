import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { EventEmitter } from '../base/events';

interface IItemUI {
	title: string;
	price: number;
	id: string;
}

export abstract class ItemUI<T> extends Component<IItemUI & T> {
	protected itemTitle: HTMLElement;
	protected itemPrice: HTMLElement;
	protected cardId: string;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this.itemTitle = ensureElement('.card__title', this.container);
		this.itemPrice = ensureElement('.card__price', this.container);
	}

	set title(value: string) {
		this.setText(this.itemTitle, value);
	}

	set price(value: number | null) {
		if (value === null) {
			this.setText(this.itemPrice, 'Бесценно');
		} else {
			this.setText(this.itemPrice, value + ' синапсов');
		}
	}

	set id(value: string) {
		this.cardId = value;
	}
}
