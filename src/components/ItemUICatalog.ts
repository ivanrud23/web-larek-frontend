import {ItemUIBasket} from "./ItemUIBasket";
import { ensureElement } from "../utils/utils";
import { Category, IItem } from "../types";
import { EventEmitter } from "./base/events";

export class ItemUICatalog extends ItemUIBasket {
  protected item?: IItem;

  protected elementCategory: HTMLElement;
  protected elementImage: HTMLImageElement;
  protected elementButton: HTMLButtonElement;
  protected elementItem?: HTMLElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container, events);

    this.elementCategory = ensureElement('.card__category', this.container);
    this.elementImage = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.elementButton = this.container as HTMLButtonElement;

    this.elementButton.addEventListener('click', () => {
      if (this.item) {
        this.events.emit('item:check', this.item);
      }
    });
  }

  set category(value: Category) {
    this.setText(this.elementCategory, value);
  }

  set image(path: string) {
    this.setImage(this.elementImage, path, this.title);
  }

  

}