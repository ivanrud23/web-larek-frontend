import { Payment } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { EventEmitter } from '../base/events';

interface IFormState {
	valid: boolean;
	errors: string;
}

export class Form<T> extends Component<IFormState & T> {
	protected elementSubmit: HTMLButtonElement;
	protected elementErrors: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: EventEmitter) {
		super(container);

		this.elementSubmit = ensureElement(
			'.button',
			this.container
		) as HTMLButtonElement;
		this.elementErrors = ensureElement('.form__errors', this.container);

		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
	}

	protected onInputChange(field: keyof T, value: string) {
		this.events.emit(`order.${String(field)}:change`, {
			field,
			value,
		});
	}

	set valid(value: boolean) {
		this.elementSubmit.disabled = !value;
	}

	set errors(value: string) {
		this.setText(this.elementErrors, value);
	}

	render(state?: Partial<T & IFormState>) {
		return super.render(state);
}
	
}
