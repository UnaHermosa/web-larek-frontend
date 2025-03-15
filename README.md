# Проектная работа "Веб-ларек"

"Web-ларёк" - это интернет-магазин с товарами для веб-разработчиков. В нём можно посмотреть каталог товаров, добавить товары в корзину и сделать заказ. 

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Ключевые типы данных.

Описание интерфейса карточки товара

```
interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
};
```
Описание интерфейса пользователя

```
interface IUser {
  address: string;
  email: string;
  phone: string;
  isOnline: boolean;
}
```

Хранение коллекции карточек товаров

```
interface IProductsData {
  products: IProduct[],
  preview: string | null;
}
```

Данные карточки в форме добавления товара в корзину

```
type TProductInfo = Pick<IProduct, 'description' | 'category' | 'title' | 'image' | 'price'>;
```

Данные пользователя в форме заказа - адрес и способ оплаты, выбранный им 

```
type TUserAddress = Pick<IUser, 'address' | 'isOnline'>;
```

Данные пользователя в форме заказа - контактная информация

```
type TUserContacts = Pick<IUser, 'email' | 'phone'>;
```
