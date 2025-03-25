import { ensureElement } from '../../utils/utils';
import { Component } from '../base/component';
import { ISuccess, ISuccessActions } from '../../types';
import { IEvents } from '../base/events';

export class Success extends Component<ISuccess> {
	protected _price: HTMLElement;
	protected _close: HTMLElement;

	constructor(
		container: HTMLElement,
		actions: ISuccessActions,
		events: IEvents
	) {
		super(container, events);

		this._close = ensureElement<HTMLElement>(
			'.order-success__close',
			this.container
		);

		this._price = ensureElement<HTMLElement>(
			'.order-success__description',
			this.container
		);

		if (actions?.onClick) {
			this._close.addEventListener('click', actions.onClick);
		}
	}

	set total(value: string) {
		this._price.textContent = `Списано ${value} синапсов`;
	}
}
