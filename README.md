# Проектная работа "Веб-ларек"

"Web-ларёк" - это интернет-магазин с товарами для веб-разработчиков. В нём можно посмотреть каталог товаров, добавить товары в корзину и сделать заказ. 

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом
- src/components/common

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

## Архитектура приложения

Приложение построено в соответствии с шаблоном проектирования 
архитектуры приложений MVP (Model-View-Presenter) и представлено 
тремя слоями, что обеспечивает разделение ответственности между 
слоями так, чтобы изменения в одном из них не влияли на другие:

- слой данных (Model) отвечает за хранение и изменение данных;
- слой представления (View) занимается отображением данных на странице;
- слой презентера (Presenter) обеспечивает взаимодействие между 
представлением и данными.

## Ключевые типы данных.

Описание интерфейса карточки продукта
```
interface IProduct {
  id: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
```

Описание интерфейса для превью карточки продукта
```
interface IProductPreview {
  description: string;
}
```

Описание типа для карточки товара в корзине
```
type IBasketItem = Pick<IProduct, 'id' | 'title' | 'price'>;
```

Описание интерфейса корзины
```
interface IBasket {
  products: string[];
  totalPrice: number;
}
```

Описание интерфейса для всех данных приложения

```
interface IAppState {
    catalog: IProduct[];
    basket: string[];
    preview: string | null;
    order: IOrder | null;
}
```

Интерфейс для модального окна

```
interface IModalData {
  content: HTMLElement;
}
```

Интерфейс для формы заказа

```
interface IOrderForm {
  email: string;
  address: string;
  phone: string;
  payment: string;
}
```

Интерфейс для объекта валидации формы заказа

```
export interface IForm {
  valid: boolean;
  errors: string[];
}
```

Интерфейс для объекта заказа, отправляемого на сервер

```
interface IOrder extends IOrderForm {
    items: string[];
    total: number;
}
```

Интерфейс 
Интерфейс для модального окна после оформления заказа

```
interface IOrderResult {
    id: string;
    total: string;
}
```

Описание типа ошибок формы

```
type FormErrors = Partial<Record<keyof IOrder, string>>;
```

Интерфейс для окна с сообщением об успешном заказе

```
interface ISuccsess {
  total: number;
}
```

Интерфейс для объекта события `actions`

```
interface ISuccessActions {
    onClick: () => void;
}
```

Описание интерфейса открытой корзины

```
interface IPage {
    counter: number;
    catalog: HTMLElement[];
}

```

### Базовый код

#### Класс EventEmitter
---

Реализует паттерн «Наблюдатель» и позволяет подписываться на события и уведомлять подписчиков о наступлении события.

Поле класса:

`_events` - принимает название события и список подписчиков.

Методы класса: 

- `on` — для подписки на событие, 
- `off` - для отписки от события,
- `emit` - уведомления подписчиков о наступлении события.
- `onAll` - для подписки на все события,
- `offAll` - для отмены подписок всех подписчиков.
- `trigger` - генерирует заданное событие с заданными аргументами. Это позволяет передавать его в качестве обработчика события в другие классы. Эти классы будут генерировать события, не будучи при этом напрямую зависимыми от класса  EventEmitter.

#### Класс Api
---

Содержит в себе базовую логику отправки запросов серверу. В конструктор класса передаётся базовый адрес сервера и опциональный объект с заголовками запросов.

В полях класса хранятся следующие данные: 

- `readonly baseUrl` - принимает и хранит изменяющуюся часть url-адреса.
- `protected options` - дополнительный параметр, который может содержать заголовки запроса.

Методы класса: 

- `protected handleResponse` - обработчик ответа сервера,
- `get` - выполняет GET-запрос на указанный в параметрах адрес и возвращает промис с объектом ответа от сервера,
- `post` - примнимает объект с данными, которые будут переданы в теле JSON запроса по адресу, указанному в параметрах запроса при вызове метода. По умолчанию метод определён как `POST` запрос, но может быть переопределён заданием третьего параметра при вызове (`PUT`, `DELETE`).

#### Класс Component<T>
---
 Абстрактный класс дженерик для создания компонентов пользовательского интерфейса.

 Конструктор класса `protected constructor(protected readonly container: HTMLElement, protected readonly events: IEvents)` принимает HTML-элемент контейнера, в который будет помещён компонент и брокер событий.
 
 Методы класса:
 - `toggle class` - метод для переключения класса элемента,
 - `set disabled` - метод для блокирования или разблокирования,переданного элемента в зависимости от значения state (true/false),
 - `set text` - метод для присваивания текста переданному элементу,
 - `set image` - метод для установки изображения элемента и атрибута `alt`,
 - `render` - метод для отрисовки DOM-элемента.

### Компоненты модели данных (Model)
Позволяют хранить и обрабатывать данные, полученные от сервера и от пользователя.

#### Класс AppState
---
Класс, описывающий состояние приложения, реализует интерфейс `IAppState`.

В полях класса хранятся следующие данные:
- `basket` - данные товара, добавленного в корзину,
- `catalog` - данные списка товаров, полученных от сервера,
- `order` - данные заказа для отправки на сервер,
- `preview` - данные товара, выбранного пользователем для просмотра,
- `formErrors` - данные ошибок полей формы.

Методы класса:
- `set product` - добавляет товар в корзину,
- `delete product` - удаляет товар из корзины,
- `clear basket` - очищает корзину от данных пользователя,
- `set catalog` - сохраняет коллекцию товаров, полученную от сервера,
- `set preview` - сохраняет карточку для просмотра в модальном окне,
- `get counter` - возвращает количество товаров в корзине,
- `get totalPrice` - возвращает общую стоимость товаров в корзине (должен учитывать возможность появления бесценного товара, то есть товара со стоимостью null, в составе массива товаров и как единственного товара. В случае, если бесценный товар единственный в корзине, стоимость товаров приравнивается к нулю, товар исключается из массива товаров для отправки на сервер).

### Компоненты представления (View)
Позволяют отображать элементы страницы с полученными данными и взаимодействовать с пользователем.

#### Класс Product
---
Класс, описывающий карточку товара. Отображается в каталоге товаров на 
главной странице, в модальном окне с просмотром выбранной карточки и в 
корзине. Расширяется базовым абстрактным классом `Component<T>`, должен
соответствовать интерфейсу `IProduct`.

Методы класса:
- `set id` - устанавливает id продукта,
- `get id` - получает id продукта,
- `set title` - устанавливает название продукта,
- `set category` - устанавливает катгорию продукта,
- `set image` - устанавливает изображение товара,
- `set price` - устанавливает цену товара,
- `set description` - устанавливает описание товара.

#### Класс ProductPreview
---
Класс отображает карточку товара в модальном окне просмотра, соответствует интерфейсу `IProductPreview`.

Метод класса:
- `set description` - устанавливает текст описания продукта.

#### Класс BasketItem
---
Класс отвечает за отображение единицы товара в корзине, объект должен соответствовать интерфейсу `IBasketItem`.

Методы класса:
- `set title` - устанавливает название продукта,
- `set price` - устанавливает цену продукта,
- `set orderNumber` - устанавливает порядковый номер товара в корзине.

#### Класс Page
---
Отображает данные на главной странице - каталог товаров, счётчик товаров, добавленных в корзину. 

Поля класса:
- `protected _counter: HTMLElement` - разметка счётчика товаров,
- `protected _catalog: HTMLElement` - разметка каталога товаров,
- `protected _wrapper: HTMLElement` - разметка обёртки страницы,
- `protected _basket: HTMLElement` - разметка кнопки корзины.

Конструктор класса принимает в качестве параметров HTML-элемент и брокер событий:
`constructor(container: HTMLElement, protected events: IEvents)`.

Методы класса: 
- `set counter` - отрисовка счётчика товаров в корзине,
- `set catalog` - отрисовка списка товаров.

#### Класс Modal
---
Класс для реализации модального окна. Расширяется базовым классом `Component<T>` по интерфейсу `IModalData`.

Поля класса:
- `_closeButton: HTMLButtonElement` - хранит разметку кнопки закрытия модального окна,
- `_content: HTMLElement` - хранит разметку контейнера для модального окна.

Конструктор принимает контейнер типа `HTMLElement` и брокер событий: c`constructor(container: HTMLElement, protected events: IEvents)`, устанавливает слушатели событий на кнопку закрытия модального окна, клавишу `Esc` и оверлей. 

Методы класса:
- `set content` - устанавливает контент модального окна,
- `open` - реализует открытие модального окна,
- `close` - реализует закрытие модального окна,
- `render` - отрисовка данных контента открытого модального окна.

#### Класс Basket 
---
Класс отвечает за отрисовку корзины. Расширяется базовым абстрактным классом `Component<T>` по интерфейсу `IBasket`.

Поля класса:
-  `protected list: HTMLElement` - контейнер для отрисовки списка продуктов в корзине,
- `protected _total: HTMLElement` - контейнер для отрисовки итоговой суммы заказа,
- `protected button: HTMLElement` - разметка кнопки перехода на следующий этап оформления заказа.

Конструктор класса принимает контейнер типа `HTMLElement` и брокер событий:
`constructor(container: HTMLElement, protected events: IEvents)`.

Методы класса:
- `set list` - отрисовывает список добавленных в корзину товаров,
- `set totalPrice` - отрисовывает итоговую стоиомость всех добавленных товаров.

#### Класс Form<Т>
---
Класс-дженерик отвечает за работу с формой заказа и её валидацию. В переменной <T> принимает тип данных компонента отображения.

Поля класса:
- `protected _submit` - хранит разметку кнопки отправки формы заказа,
- `protected _errors` - хранит разметку контейнера для вывода ошибок валидации.

Конструктор класса принимает контейнер типа `HTMLElement` и брокер событий:
`constructor(container: HTMLElement, protected events: IEvents)`.

Методы класса:
- `set valid` - устанавливает валидность полей ввода,
- `set errors` - устанавливает ошибки,
- `render` - отрисовка ошибок.

#### Класс Order
---
Класс управляет отображением модального окна с данными пользователя
- адрес доставки и способ оплаты.

Поля класса: 
- `_buttons` - хранит разметку кнопок формы оплаты.

Методы класса:
- `set address` - устанавливает адрес пользователя,
- `set payMethod` - устанавливает класс активности на кнопку, соответствующую выбору метода оплаты пользователем.

#### Класс Contacts
---
Класс управляет отображением модального окна с данными пользователя - электронная почта и номер телефона. Расширяется классом `Form<T>` по интерфейсу `IOrderForm`.

Методы класса: 
- `set email` - устанавливает адрес электронной почты пользователя,
- `set phone` - устанавливает номер телефона пользователя.

#### Класс Succsess
---
Класс отвечает за отображение модального окна с уведомлением об успешности оформления заказа.

Поля класса:
- `protected close: HTMLElement` - хранит разметку кнопки закрытия модального окна,
- `price` - сумма заказа.

Конструктор класса принимает контейнер типа `HTMLElement` и объект события `actions` типа `ISuccsessActions`:
`constructor(container: HTMLElement, actions: ISuccsessActions)`.

Метод класса:
- `set price` - отображает итоговую стоимость заказа.

### Презентер (Presenter)
Презентер отвечает за обеспечение связи и взаимодействия между представлением и данными. Он не выделен в отдельный файл и будет описан в файле index.ts.

#### Класс AppApi
---
Класс обеспечивает работу с сетевыми запросами в проекте. Наследуется от базового класса Api.

Методы класса:
- `get productList` - получение массива с карточками товаров от сервера,
- `order products` - отправка объекта с данными заказа на сервер.

#### Список всех событий, которые могут генерироваться в приложении.

`products:change` - изменение массива товаров каталога,
`product:select` - выбор карточки для просмотра в модальном окне,
`product:basket` - добавление товара в корзину,
`preview:change` - изменение модального окна превью в зависимости от товара, который откроют,
`basket:open` - открытие модального окна корзины,
`basket:close`  - закрытие модального окна с корзиной,
`basket:change` - изменение списка товаров в корзинеб
`modal:open` - открытие любого модального окна,
`modal:close` - закрытие любого модального окна,
`order:open` - открытие окна с оформлением заказа,
`order:change` - изменение полей формы заказа,
`contacts:change` - изменение полей с данными пользователя,
`order:submit` - отправка post-запроса на сервер для подтверждения заказа и открытие окна, уведомляющего о его успешном оформлении, очистка корзины.