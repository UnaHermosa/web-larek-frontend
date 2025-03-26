import { Form } from "./common/form";
import { IOrderForm } from "../types";
import { IEvents } from "./base/events";
import { ensureAllElements } from "../utils/utils";

export class Order extends Form<IOrderForm> {
    protected _buttons: HTMLButtonElement[];

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this._buttons = ensureAllElements<HTMLButtonElement>('.button_alt', container);
        this._buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.payment = button.name;
                events.emit('payment:chgange', button);
            })
        })
    }

    set payment(name: string) {
        this._buttons.forEach(button => {
          this.toggleClass(button, 'button_alt-active', button.name === name);
        });
    }
    
      set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }
}

export class Сontacts extends Form<IOrderForm> {
    constructor(container: HTMLFormElement, events: IEvents) {
      super(container, events);
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }

    set phone(value: string) {
      (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }
  }