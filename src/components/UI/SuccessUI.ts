import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { EventEmitter } from '../base/events';

interface ISuccess {
	total: number;
}

export class SuccessUI extends Component<ISuccess> {
	protected elementTotal: HTMLElement;
	protected elementButton: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this.elementTotal = ensureElement(
			'.order-success__description',
			this.container
		);
		this.elementButton = ensureElement('.order-success__close', this.container);

		this.elementButton.addEventListener('click', () => {
			this.events.emit('success:close');
		});
	}

	set total(value: number) {
		this.setText(this.elementTotal, value + ' синапсов');
	}
}
