export interface IProduct {
  id: string;
  description?: string;
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

export interface IOrder {
  email: string;
  address: string;
  phone: string;
  total: number;
}

export interface IBasketModel {
  basketItems: IProduct[],
  order: IOrder,
  total: number
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IOrderResult {
    id: string;
    total: string;
}

export interface IAppState {
  catalog: IProduct[];
  basket: string[];
  preview: string | null;
  order: IOrder | null;
}