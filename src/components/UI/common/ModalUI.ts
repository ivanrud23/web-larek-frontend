import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/events";

interface IModalUI {
  content: HTMLElement;
}

export class ModalUI extends Component<IModalUI> {
  protected closeButton: HTMLButtonElement;
  protected contentElement: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
    this.contentElement = ensureElement<HTMLElement>('.modal__content', container);

    this.closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
    this.contentElement.addEventListener('click', (event) => event.stopPropagation());
  }

  set content(value: HTMLElement) {
    this.contentElement.replaceChildren(value);
  }

  open() {
    this.container.classList.add('modal_active');
    this.events.emit('modal:open');
  }

  close() {
		this.container.classList.remove('modal_active');
		this.content = null;

	}

  render(data: IModalUI): HTMLElement {
    super.render(data);
    this.open();
    return this.container;
    
  }

  
}