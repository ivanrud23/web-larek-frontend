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

export type FormErrors = Partial<Record<keyof IUserData, string>>;

export type Payment = 'card' | 'cash' | '';

export interface IPaymentUI {
	address: string;
	payment: Payment;
}

export interface IContactsUI {
	phone: string;
	email: string;
}

export interface IUserData {
	address: string;
	phone: string;
	email: string;
	payment: Payment;
}

export type IApiOrder = IUserData & {
	total: number;
	items: string[];
};

export interface IOrder {
	id: string;
	total: number;
}
