import { ItemUI } from './ItemUI';
import { ensureElement } from '../utils/utils';
import { Category, IItem } from '../types';
import { EventEmitter } from './base/events';

interface IItemUICatalog {
	image: string;
}

export class ItemUICatalog<IItemUICatalog> extends ItemUI<IItemUICatalog> {
	protected elementCategory: HTMLElement;
	protected elementImage: HTMLImageElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container, events);

		this.elementCategory = ensureElement('.card__category', this.container);
		this.elementImage = ensureElement<HTMLImageElement>(
			'.card__image',
			this.container
		);

		this.container.addEventListener('click', () => {
			this.events.emit('page-item:open', { id: this.cardId });
		});
	}

	set category(value: Category) {
		this.setText(this.elementCategory, value);
	}

	set image(value: string) {
		this.setImage(this.elementImage, value, this.title);
	}
}
