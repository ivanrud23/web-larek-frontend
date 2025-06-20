import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/events";

interface IItemUI {
	title: string;
	price: number;
	id: string;
}

export abstract class ItemUI<T> extends Component<IItemUI & T> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;
  protected cardId: string;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this.titleElement = ensureElement('.card__title', container);
    this.priceElement = ensureElement('.card__price', container);
    
  }

  set title(value: string) {
    this.setText(this.titleElement, value);
  }

  set price(value: number) {
    this.setText(this.priceElement, value);
  }

  set id(value: string) {
    this.cardId = value;
  }



}