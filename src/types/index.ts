
export type Category = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

export interface IItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  image: string;
}

export type Payment = 'онлайн' | 'при получении'

export interface IOrder {
  address: string;
  phone: string;
  email: string;
  payment: Payment;
}