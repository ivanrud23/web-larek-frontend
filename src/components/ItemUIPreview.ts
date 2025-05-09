import {ItemUICatalog} from "./ItemUICatalog";
import { ensureElement } from "../utils/utils";
import { EventEmitter } from "./base/events";




export class ItemUIPreview extends ItemUICatalog {
  protected description: HTMLElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container, events);
    this.description = ensureElement('.card__text', this.container);
  }


}