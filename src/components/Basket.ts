import { Category, IItem, Payment, IOrder } from "../types";

export class Basket {
  protected items: IItem[]; 

  constructor () {};

  addItemToBasket(item: IItem) {
    this.items.push(item);
  }

  removeItemFromBasket(id: string) {
    this.items.filter(item => item.id === id);
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

}
