import { FormErrors, IUserData, Payment } from '../types';
import { IEvents } from './base/events';
import { Model } from './base/Model';

export class UserData extends Model<IUserData> {
	protected userData: IUserData;
	protected formErrors: FormErrors;

	constructor(protected events: IEvents) {
		super({}, events);
		this.userData = {
			address: '',
			phone: '',
			email: '',
			payment: '',
		};
		this.formErrors = {};
	}

	setDataField<T extends keyof IUserData>(field: T, value: IUserData[T]) {
		this.userData[field] = value;
		this.emitChanges('order:changed', { field });
	}

	validateUserData() {
		const errors: FormErrors = {};
		if (!this.userData.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.userData.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		if (!this.userData.address) {
			errors.address = 'Необходимо указать адрес';
		}
		if (this.userData.payment === '') {
			errors.payment = 'Необходимо выбрать способ оплаты';
		}
		return errors;
	}

	getUserData() {
		return this.userData;
	}
}
