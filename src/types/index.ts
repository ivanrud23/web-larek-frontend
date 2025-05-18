export type Category =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

export interface IItem {
	id: string;
	title: string;
	description: string;
	price: number;
	category: Category;
	image: string;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export type Payment = 'card' | 'cash' | '';

export interface IOrederUI {
	address: string;
	payment: Payment;
}

export interface IContactsUI {
	phone: string;
	email: string;
}

export interface IOrder {
	address: string;
	phone: string;
	email: string;
	payment: Payment;
}

export type IApiOrder = IOrder & {
	total: number;
	items: string[];
};

export interface IOrderResult {
	id: string;
	total: number;
}
