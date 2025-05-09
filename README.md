# Проектная работа "Веб-ларек"

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
## Описание данных
#### Интерфейс IItem
Поля:
+ id: string — уникальный номер товара, 
+ title: string — название товара,
+ description: string — описание отвара,
+ category: Category — категория товара,
+ image: string — изображение товара

#### Тип Category
тип возможных категорий товаров —
'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил' 

#### Интерфейс IOrder
Поля:
+ address: string — адрес покупателя в форме оформления заказа
+ email: string — электронная почта в форме оформления заказа
+ phone: string  — телефон покупателя в форме оформления заказа
+ payment: Payment — способ оплаты в форме оформления заказа

## Модель данных
#### Класс Item
Поля:
+ catalog: Item[] — массив каталога товаров
  
Методы:
+ setItems(items: IItem[]) — создание каталога товаров
+ addItem(item: IItem) — добавление товара в каталог
+ removeItem(string: id) — удаление товара из каталога

#### Класс Basket
Поля:
+ items: Item[] — массив товаров добавленных в корзину
  
Методы:
+ addItemToBacket(item: IItem) — добавление товара в корзину
+ removeItemFromBucket(string: id) — удаление товара из корзины
+ getTotal(items: Item[]) — получение итоговой суммы товаров в корзине
+ clearBasket() — удалить все товары из корзины

#### Класс Order
Поля:
+ address: string — адрес покупателя
+ phone: string — телефон покупателя
+ email: string — эмейл покупателя
+ payment: Payment — способ оплаты
  
Методы:
+ setAddress(address: string) — сохранить адрес
+ setPhone(phone: string) — сохранить телефон
+ setEmail(email: string) — сохранить эмейл
+ setPayment(payment: Payment) — сохранить способ оплаты

## Компоненты представления
#### Класс ItemCard —
Поля:
+ title: HTMLElement — элемент заголовка
+ description: HTMLElement — элемент описания
+ price: HTMLElement — элемент цены
+ category: HTMLElement — элемент категории
+ image: HTMLElement — элемент изображения

Методы:
+ set title(title: string) — задать значение элемента заголовка
+ get title(): string — получить заголовок товара из модели
+ set description(value: string) — задать значение элемента описания
+ get description(): string — получить описание товара из модели
+ set price(price: num) — задать значение элемента стоимости
+ get price(): number — получить стоимость товара из модели
+ set payment(price: number) — задать значение элемента способа оплаты
+ get payment(): Payment — получить способ оплаты из модели
+ set image(value: string) — задать изображение

#### Класс Basket —
Поля:
+ items: HTMLElement — массив элементов товаров в корзине
+ total: HTMLElement — стоимость всех товаров в корзине
+ button: HTMLElement — кнопка отправки формы
  
Методы:
+ set items(items: HTMLElement[]) — задать значение списка элементов товаров в корзине
+ get items(items: IItem) — получить список товара из модели корзины
+ set total(total: number) — задать значение элемента общей стоимости в корзине
+ get total(): number — получить общую стоимость товаров в корзине из модели
+ set button() — изменить активность элемента кнопки 

#### Класс Page —
Поля:
+ catalog: HTMLElement  — массив элементов товаров
+ basket: HTMLElement  — количество товаров в корзине

Методы:
+ set counter(value: number) — задать значение элемента количества товаров в корзине
+ get counter(): number — получить количество товаров в корзине из модели
+ set catalog(items: HTMLElement[]) — задать значение массива элементов каталога товаров
+ get catalog(): Items[] — задать значение массива элементов каталога товаров
+ set locked(value: boolean) — включить / отключить прокрутку каталога товаров

#### Класс OrderPayment —
Поля:
+ payment: HTMLElement — выбор способа оплаты
+ address: HTMLElement — адрес покупателя

Методы:
+ set payment(value: Payment) — задать значение элемента оплаты
+ get payment(): Payment — получить способ оплаты из модели
+ set address(value: string) — задать значение элемента адреса
+ get address(): string — получить адрес из модели


#### Класс OrderContact —
Поля:
+ phone: HTMLElement — телефон покупателя
+ email: HTMLElement — почта покупателя

Методы:
+ set phone(value: string) — задать значение элемента телефон
+ get phone(): string — получить телефон из модели
+ set email(value: string) — задать значение элемента email
+ get email(): string — получить email из модели

#### Класс Success —
Поля:
+ content: HTMLElement — контент модалки после оформления заказа

## Базовые классы
#### Класс Component —
базовый класс для всех элементов представления
Методы:
+ toggleClass() — добавить / удалить класс элемента
+ setText() — установить текстовое содержимое
+ setDisabled() — заблокировать / разблокировать элемент
+ setHidden() — скрыть элемент
+ setVisible() — показать элемент
+ setImage() — установить изображение
+ render() — отобразить элемент

#### Класс Modal —
базовый класс для всех модальных окон
Поля:
+ closeButton: HTMLButtonElement — кнопка закрытия формы
+ content: HTMLElement— контент формы

Методы:
+ open() — открыть модалку
+ close() — закрыть модалку
+ render() — отобразить модалку

## Описание событий
- **items: changed** — изменение каталога товаров
- **items: selected** — открыть / закрыть модалку товара
- **basket: add** — добавить товар в корзину
- **basket: remove** — удалить товар из корзины
- **basket: changed** — изменения списка товаров в корзине
- **basket: selected** — открыть / закрыть модалку корзины
- **orderPayment: selected** — открыть / закрыть модалку выбора оплаты и адреса
- **orderContact: selected** — открыть / закрыть модалку контактов
- **success: selected** — открыть / закрыть модалку заказ оформлен
