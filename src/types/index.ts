export interface IProduct {
  id: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IProductPreview {
  description: string;
}

export type IBasketItem = Pick<IProduct, 'id' | 'title' | 'price'>;

export interface IBasket {
  products: string[];
  totalPrice: number;
}

export interface IAppState {
    catalog: IProduct[];
    basket: string[];
    preview: string | null;
    order: IOrder | null;
}

export interface IForm {
  valid: boolean;
  errors: string[];
}

export interface IOrderForm {
  email: string;
  address: string;
  phone: string;
  payment: string;
}

export interface IOrder extends IOrderForm {
  items: string[];
  total: number;
}

export interface IModalData {
  content: HTMLElement;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IOrderResult {
    id: string;
    total: string;
}

export interface ISuccsess {
  total: number;
}

export interface ISuccessActions {
  onClick: () => void;
}

export interface IPage {
  counter: number;
  catalog: HTMLElement[];
  locked: boolean;
}