import {IItem} from '../types/index';
import {IEvents} from "./base/events";

export class Items{
  protected items: IItem[] = [];

  constructor( protected events: IEvents) {
    // Object.assign(this, data);
  }

  setItems(items: IItem[]) {
		this.items.push(...items);
		this.events.emit('items:changed');
	}

  getItems() {
    return this.items;
  }

  getItemById(id: string): IItem {
		return this.items.find((item) => item.id === id);
	}

  getBasketCount() {
    return this.items.reduce((count, item) => count + (item.addedToBasket ? 1 : 0), 0);
  }


}