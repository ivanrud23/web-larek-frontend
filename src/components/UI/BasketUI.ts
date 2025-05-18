import { IItem } from '../../types';
import { Component } from '../base/Component';
import { EventEmitter } from '../base/events';
import { createElement, ensureElement } from '../../utils/utils';
import { ItemUIBasket } from '../UI/ItemUIBasket';

interface IBasketUI {
	items: HTMLElement[];
	total: number;
	addToOrder: boolean;
}

export class BasketUI extends Component<IBasketUI> {
	protected elementItemsList: HTMLElement;
	protected elementSubmit: HTMLButtonElement;
	protected elementTotal: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this.elementItemsList = ensureElement('.basket__list', this.container);
		this.elementItemsList.replaceChildren(
			createElement('p', {
				className: 'basket_empty',
				textContent: 'Корзина пуста',
			})
		);
		this.elementTotal = ensureElement('.basket__price', this.container);
		this.elementSubmit = ensureElement(
			'.basket__button',
			this.container
		) as HTMLButtonElement;

		this.elementSubmit.addEventListener('click', () => {
			this.events.emit('basket-order:open');
		});

		this.setDisabled(this.elementSubmit, true);
	}

	set items(value: HTMLElement[]) {
		if (value.length === 0) {
			this.elementItemsList.replaceChildren(
				createElement('p', {
					className: 'basket_empty',
					textContent: 'Корзина пуста',
				})
			);
		} else {
			this.elementItemsList.replaceChildren(...value);
		}
	}

	set total(value: number) {
		this.setText(this.elementTotal, value);
		if (value > 0) {
			this.setDisabled(this.elementSubmit, false);
		} else {
			this.setDisabled(this.elementSubmit, true);
		}
	}
}
