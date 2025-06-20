import { Category } from "../../types";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/events";
import { ItemUI } from "./ItemUI";

interface IItemCatalogUI {
  image: string;
  category: Category;
}

export class ItemCatalogUI<IItemCatalogUI> extends ItemUI<IItemCatalogUI> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container, events);

    this.imageElement = ensureElement('.card__image', container) as HTMLImageElement;
    this.categoryElement = ensureElement('.card__category', container);
    this.container.addEventListener('click', () => 
    this.events.emit('item-catalog:click', {
      id: this.cardId
    })

  );
  }

  set image(value: string) {
    this.setImage(this.imageElement, value);
  }

  set category(value: Category) {
    this.setText(this.categoryElement, value);
  }

}