import { IOrederUI, Payment } from '../../types';
import { ensureElement } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { FormUI } from '../common/FormUI';

export class OrderUI extends FormUI<IOrederUI> {
	protected elementAddress: HTMLElement;
	protected orderPayment: Payment;
	protected elementPaymentButton: HTMLElement;

	constructor(container: HTMLFormElement, events: EventEmitter) {
		super(container, events);

		this.elementPaymentButton = ensureElement(
			'.button_alt',
			this.container
		) as HTMLButtonElement;
		this.elementAddress = ensureElement('.form__input', this.container);

		this.elementSubmit.addEventListener('click', () => {
			this.events.emit('basket-contacts:open');
		});

		this.elementPaymentButton.addEventListener('click', () => {
			this.events.emit('payment:select');
			
		});

		this.elementAddress.addEventListener('input', () => {
			this.events.emit('address:changed');
		});
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}

	

	set activeButton(value: boolean) {
		this.setDisabled(this.elementSubmit, value);
	}
}
