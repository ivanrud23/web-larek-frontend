import { Category, IItem, Payment } from '../types';
import { Model } from './base/Model';
import { IEvents } from './base/events';

interface IBasket {
	items: IItem[];
}

export class Basket extends Model<IBasket> {
	protected items: IItem[];

	constructor(protected events: IEvents) {
		super({}, events);
		this.items = [];
	}

	addItemToBasket(item: IItem) {
		this.items.push(item);
		this.events.emit('basket:changed');
	}

	removeItemFromBasket(value: IItem) {
		this.items = this.items.filter((item) => item !== value);
		this.events.emit('basket:changed');
	}

	getTotal(): number {
		return this.items.reduce((a, c) => a + c.price, 0);
	}

	clearBasket() {
		this.items = [];
		this.events.emit('basket:changed');
	}

	getCount(): number {
		return this.items.length;
	}

	getItems(): IItem[] {
		return this.items;
	}

	getItemsId(): string[] {
		return this.items.map((item) => item.id);
	}
}
