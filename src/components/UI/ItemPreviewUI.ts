import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/events";
import { ItemCatalogUI } from "./ItemCatalogUI";

interface IItemPreviewUI {
  description: string;
  addedToBasket: boolean;
}

export class ItemPreviewUI extends ItemCatalogUI<IItemPreviewUI> {
  protected descriptionElement: HTMLElement;
  protected addToBasket: HTMLButtonElement;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container, events);

    this.descriptionElement = ensureElement('.card__text', this.container);
    this.addToBasket = ensureElement('.card__button', this.container) as HTMLButtonElement;
    
    this.addToBasket.addEventListener('click', () => {
      this.events.emit('item:addedToBasket', {id: this.cardId});
    })


  }

  set description(value: string) {
    this.setText(this.descriptionElement, value);
  }
}