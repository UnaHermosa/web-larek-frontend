export interface IProduct {
  _id: string;
  description?: string;
  image: string;
  title: string;
  category: string;
  price: number;
};

export interface IUser {
  address: string;
  email: string;
  phone: string;
  isOnline: boolean;
}

export interface IProductsData {
  products: IProduct[],
  preview: string | null;
}

export type TProductInfo = Pick<IProduct, 'description' | 'category' | 'title' | 'image' | 'price'>;
export type TUserAddress = Pick<IUser, 'address' | 'isOnline'>;
export type TUserContacts = Pick<IUser, 'email' | 'phone'>;