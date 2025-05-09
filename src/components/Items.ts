import { IItem } from "../types";
import { IEvents } from "./base/events";
import { Model } from "./base/Model";

export type CatalogChangeEvent = {
  catalog: IItem[]
};



export class Items extends Model<IItem> {
  protected items: IItem[] = [];
  preview: string | null;

  constructor (protected events: IEvents) {
    super({}, events);
  };

  setItems(items: IItem[]) {
    this.items.push(...items);
    this.events.emit('itemsCatalog:changed');
  }

  setPreview(item: IItem) {
    this.preview = item.id;
    this.emitChanges('preview:changed', item);
}

  addItem (item: IItem) {
    this.items.unshift(item);
    this.events.emit('itemsCatalog:changed');
  }

  deleteItem (id: string) {
    this.items = this.items.filter(item => item.id !== id);
    this.events.emit('itemsCatalog:changed');
  }

  getItem (id: string): IItem {
    return this.items.find(item => item.id === id);
  }

  getItems(): IItem[] {
    return this.items;
  }

}

