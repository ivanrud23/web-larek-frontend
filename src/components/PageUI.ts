import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

interface IPage {
  counter: number;
  catalog: HTMLElement[];
  locked: boolean;
  basket: HTMLButtonElement;
}

export class Page extends Component<IPage> {
  protected elementCounter: HTMLElement;
  protected elementCatalog: HTMLElement;
  // protected elementWrapper: HTMLElement;
  protected elementBasket: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.elementCounter = ensureElement('.header__basket-counter', this.container);
    this.elementBasket = ensureElement('.header__basket', this.container);
    this.elementCatalog = ensureElement('.gallery', this.container);
    
  }

  set counter(value:number) {
    this.setText(this.elementCounter, value)
  }

  // get counter():number {
  //   return this.setText(this.elementCatalog, value)
  // }

  set catalog(items: HTMLElement[]) {
    this.elementCatalog.replaceChildren(...items)
  }

  // set wrapper()

  // set basket()


}