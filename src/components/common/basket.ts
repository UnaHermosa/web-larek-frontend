import { createElement, ensureElement } from '../../utils/utils';
import { Component } from '../base/component';
import { EventEmitter } from '../base/events';
import { IBasket } from '../../types';

export class Basket extends Component<IBasket> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	button: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container, events);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = this.container.querySelector('.basket__price');
		this.button = this.container.querySelector('.basket__button');

		if (this.button) {
			this.button.addEventListener('click', () => {
				events.emit('order:open');
			});
		}

		this.list = [];
	}

	set list(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

	set totalPrice(total: number) {
		this.setText(this._total, `${total} синапсов`);
	}

	setButtonDisabled(itemId: string, isDisabled: boolean, price: number) {
		const buyButton = document.getElementById(
			`buy-button-${itemId}`
		) as HTMLButtonElement;
		if (buyButton) {
			buyButton.disabled = isDisabled || price <= 0;
		}
	}
}
