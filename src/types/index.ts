export interface IItemServer {
  id: string;
  description: string;
  image: string;
  title: string;
  category: Category;
  price: number;
}

export interface IItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: Category;
  price: number;
  addedToBasket: boolean;
}

export interface IOrder {
  id: string;
  total: number;
}

export type Category =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';