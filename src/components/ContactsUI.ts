import { IContactsUI, Payment } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { EventEmitter } from './base/events';
import { FormUI } from './common/FormUI';

export class ContactsUI extends FormUI<IContactsUI> {
	// protected elementSubmit: HTMLElement;

	constructor(container: HTMLFormElement, protected events: EventEmitter) {
		super(container, events);

		// this.elementSubmit = ensureElement('.button', this.container) as HTMLButtonElement;

		this.elementSubmit.addEventListener('click', () => {
			this.events.emit('success:open');
		});
	}

	set activeButton(value: boolean) {
		this.setDisabled(this.elementSubmit, value);
	}
}
