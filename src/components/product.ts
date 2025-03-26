import { Component } from "./base/component";
import { ensureElement } from "../utils/utils";
import { IProduct, IProductPreview, IBasketItem } from "../types";
import { IEvents } from "./base/events";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class Product<T> extends Component<IProduct> {
    protected _title: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _description?: HTMLElement;
    protected _button?: HTMLButtonElement;
    protected _price: HTMLElement;

    constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions, events?: IEvents) {
        super(container, events);

        this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
        this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
        this._button = container.querySelector(`.${blockName}__button`);
        this._description = container.querySelector(`.${blockName}__description`);

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    set image(value: string) {
        this.setImage(this._image, value, this.title)
    }

    set price(value: string) {
        if(value === null) {
          this.setText(this._price, `Бесценно`);
        } else {
          this.setText(this._price, `${value} синапсов`);
        }
      }

    set description(value: string | string[]) {
        if (Array.isArray(value)) {
            this._description.replaceWith(...value.map(str => {
                const descTemplate = this._description.cloneNode() as HTMLElement;
                this.setText(descTemplate, str);
                return descTemplate;
            }));
        } else {
            this.setText(this._description, value);
        }
    }
}

export class ProductPreview extends Product<IProductPreview> {
    protected _description: HTMLElement;
    protected _button:HTMLButtonElement;
    
    constructor(container: HTMLElement, actions?: ICardActions) {
      super('card', container, actions);

      this._button = container.querySelector(`.card__button`);
      this._description = ensureElement<HTMLElement>(`.card__text`, container);
  
      if (actions?.onClick) {
        if (this._button) {
            container.removeEventListener('click', actions.onClick);
            this._button.addEventListener('click', actions.onClick);
        } 
      }
    }
  
    set description(value: string) {
      this.setText(this._description, value);
    }
  }
  
  export class BasketItem extends Component<IBasketItem> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;
    protected _orderNumber: HTMLElement;
    
    constructor(container: HTMLElement, actions?: ICardActions, events?: IEvents) {
      super(container, events);
      this._title = ensureElement<HTMLElement>(`.card__title`, container);
      this._price = ensureElement<HTMLElement>(`.card__price`, container);
      this._orderNumber = ensureElement<HTMLElement>(`.basket__item-index`, container);
      this._button = container.querySelector(`.card__button`);
  
      if (actions?.onClick) {
        if (this._button) {
            container.removeEventListener('click', actions.onClick);
            this._button.addEventListener('click', actions.onClick);
        } 
      }
    }
  
    set orderNumber(value: number) {
      this._orderNumber.textContent = (value + 1).toString();
    }
  
    set title(value: string) {
      this.setText(this._title, value);
    }
  
    set price(value: string) {
      if(value === null) {
        this.setText(this._price, `Бесценно`);
      } else {
        this.setText(this._price, `${value} синапсов`);
      }
    }
  }