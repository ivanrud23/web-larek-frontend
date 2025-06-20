import { createElement, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component"
import { EventEmitter } from "../base/events";

interface IBasket {
  // index: number;
  total: number;
  items: HTMLElement[];
}

export class BasketUI extends Component<IBasket> {
  // protected elementIndex: HTMLElement;
  protected elementTotal: HTMLElement;
  protected orderButton: HTMLButtonElement;
  protected elementItemsList: HTMLElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    // this.elementIndex = ensureElement<HTMLElement>('.basket__item-index');
    this.elementTotal = ensureElement<HTMLElement>('.basket__price');
    this.elementItemsList = ensureElement<HTMLElement>('.basket__list');
    this.elementItemsList.replaceChildren(
			createElement('p', {
				className: 'basket_empty',
				textContent: 'Корзина пуста',
			})
		);
    // this.orderButton = ensureElement<HTMLButtonElement>('.button');
  }

  set items(value: HTMLElement[]) {
			this.elementItemsList.replaceChildren(...value);
	
	}

}