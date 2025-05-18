import { ensureElement } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { ItemUI } from './ItemUI';

interface IItemUIBasket {
	index: number;
}

export class ItemUIBasket extends ItemUI<IItemUIBasket> {
	protected elementButton: HTMLButtonElement;
	protected elementIndex: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container, events);

		this.elementButton = ensureElement(
			'.card__button',
			this.container
		) as HTMLButtonElement;
		this.elementIndex = ensureElement('.basket__item-index', this.container);

		this.elementButton.addEventListener('click', () => {
			this.events.emit('item:removeFromBasket', { id: this.cardId });
		});
	}

	set index(value: number) {
		this.setText(this.elementIndex, value);
	}
}
