import { IItem } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { EventEmitter } from "./base/events";

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export class ItemUIBasket extends Component<IItem> {

  protected itemTitle: HTMLElement;
  protected itemPrice: HTMLElement;
  protected basketButton?: HTMLElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);
    this.itemTitle = ensureElement('.card__title', this.container);
    this.itemPrice = ensureElement('.card__price', this.container);
    // this.basketButton = ensureElement('.card__button', this.container) as HTMLButtonElement;

  //   if (actions?.onClick) {
  //     if (this.basketButton) {
  //         this.basketButton.addEventListener('click', actions.onClick);
  //     } else {
  //         container.addEventListener('click', actions.onClick);
  //     }
  // }
  }

  set title(value: string) {
    this.setText(this.itemTitle, value);
  }

  set price(value: number) {
    this.setText(this.itemPrice, value);
  }

render(data: Partial<ItemUIBasket>): HTMLElement {
  Object.assign(this as Object, data);
  return this.container;
}

}