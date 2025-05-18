import { FormErrors, IOrder, Payment } from '../types';
import { IEvents } from './base/events';
import { Model } from './base/Model';

export class Order extends Model<IOrder> {
	protected order: IOrder;
	protected formErrors: FormErrors;

	constructor(protected events: IEvents) {
		super({}, events);
		this.order = {
			address: '',
			phone: '',
			email: '',
			payment: '',
		};
		this.formErrors = {};
	}

	setOrderField<T extends keyof IOrder>(field: T, value: IOrder[T]) {
		this.order[field] = value;
		this.emitChanges('order:changed', { field });
	}

	validateOrder() {
		const errors: FormErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		if (this.order.payment === '') {
			errors.payment = 'Необходимо выбрать способ оплаты';
		}
		return errors;
	}

	getOrder() {
		return this.order;
	}
}
