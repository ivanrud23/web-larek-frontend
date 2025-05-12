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
	}

	removeItemFromBasket(value: IItem) {
		this.items = this.items.filter((item) => item !== value);
	}

	getTotal(): number {
		return this.items.reduce((a, c) => a + c.price, 0);
	}

	clearBasket() {
		this.items = [];
	}

	getCount(): number {
		return this.items.length;
	}

	checkItem(item: IItem): boolean {
		return this.items.includes(item);
	}

	getItems(): IItem[] {
		return this.items;
	}
}
