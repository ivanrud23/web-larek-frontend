import { IPaymentUI, Payment } from '../../types';
import { ensureAllElements, ensureElement } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { Form } from '../common/Form';

export class PaymentUI extends Form<IPaymentUI> {
	protected elementAddress: HTMLElement;
	protected orderPayment: Payment;
	protected elementPaymentButtons: HTMLElement[];

	constructor(container: HTMLFormElement, events: EventEmitter) {
		super(container, events);

		this.elementPaymentButtons = ensureAllElements(
			'.button_alt',
			this.container
		) as HTMLElement[];
		this.elementAddress = ensureElement('.form__input', this.container);

		this.elementSubmit.addEventListener('click', () => {
			this.events.emit('basket-contacts:open');
		});

		this.elementPaymentButtons.forEach((button) => {
			button.addEventListener('click', () => {
				this.onInputChange('payment', button.getAttribute('name' as Payment));
			});
		});
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}

	set payment(value: Payment) {
		this.elementPaymentButtons.forEach((button) => {
			this.toggleClass(
				button,
				'button_alt-active',
				button.getAttribute('name') === value
			);
		});
	}
}
