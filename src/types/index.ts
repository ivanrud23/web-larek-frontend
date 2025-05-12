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

export type Payment = 'онлайн' | 'при получении';

export interface IOrederUI {
	address: string;
	activeButton: boolean;
}

export interface IContactsUI {
	phone: string;
	email: string;
	activeButton: boolean;
}

export interface IOrder {
	address: string;
	phone: string;
	email: string;
}
