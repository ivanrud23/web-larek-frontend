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
			payment: 'онлайн',
			total: 0,
			items: []
		};
		this.formErrors = {};
	}

	setOrderField<T extends keyof IOrder>(field: T, value: IOrder[T]) {
		this.order[field] = value;
		// this.emitChanges('order:changed', { field });
		this.validateOrder();
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		// if (!this.order.payment) {
		//   errors.payment = 'Необходимо выбрать способ оплаты';
		// }
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);

		return Object.keys(errors).length === 0;
	}

	set address(value: string) {
		this.address = value;
	}

	set phone(value: string) {
		this.phone = value;
	}

	set email(value: string) {
		this.email = value;
	}

	set payment(value: Payment) {
		this.payment = value;
	}

	set total(value: number) {
		this.total = value;
	}

	set items(value: string[]) {
		this.items = value;
	}

}
