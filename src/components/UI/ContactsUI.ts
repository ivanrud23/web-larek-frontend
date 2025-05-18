import { IContactsUI, Payment } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { EventEmitter } from '../base/events';
import { FormUI } from '../common/FormUI';

export class ContactsUI extends FormUI<IContactsUI> {
	protected emailInput: HTMLInputElement;
	protected phoneInput: HTMLInputElement;

	constructor(container: HTMLFormElement, protected events: EventEmitter) {
		super(container, events);

		this.emailInput = this.container.querySelector(
			'[name="email"]'
		) as HTMLInputElement;
		this.phoneInput = this.container.querySelector(
			'[name="phone"]'
		) as HTMLInputElement;
	}

	set email(value: string) {
		this.emailInput.value = value;
	}
	set phone(value: string) {
		this.phoneInput.value = value;
	}
}
