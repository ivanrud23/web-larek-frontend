import { ItemUICatalog } from './ItemUICatalog';
import { ensureElement } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { ItemUI } from './ItemUI';

interface IItemUIPreview {
	description: string;
	addToBasket: boolean;
}

export class ItemUIPreview extends ItemUICatalog<IItemUIPreview> {
	protected elemntDescription: HTMLElement;
	protected elemntButon: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container, events);
		this.elemntDescription = ensureElement('.card__text', this.container);
		this.elemntButon = ensureElement('.card__button', this.container);

		this.elemntButon.addEventListener('click', () => {
			this.events.emit('item:addToBasket', { id: this.cardId });
		});
	}

	set addToBasket(value: boolean) {
		this.setDisabled(this.elemntButon, value);
	}

	set description(value: string) {
		this.setText(this.elemntDescription, value);
	}
}
