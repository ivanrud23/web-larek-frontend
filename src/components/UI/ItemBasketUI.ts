import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/events";
import { ItemUI } from "./ItemUI";

interface IItemUIBasket {
	index: number;
}

export class ItemBasketUI extends ItemUI<IItemUIBasket> {
  protected elementIndex: HTMLElement;
  protected buttonDelete: HTMLButtonElement;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container, events);

    this.elementIndex = ensureElement<HTMLElement>('.basket__item-index', this.container);
    this.buttonDelete = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
  }
}