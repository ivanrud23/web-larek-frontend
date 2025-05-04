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
-  + id: string — уникальный номер товара, 
-  + title: string — название товара,
-  + description: string — описание отвара,
-  + category: Category — категория товара,
- + image: string — изображение товара
Методы:
- + toggleItem() — добавление / удаление товара в каталог

#### Тип Category
тип возможных категорий товаров —
'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил' 

#### Интерфейс IOrderForm
Поля:
-  + address: string — адрес покупателя в форме оформления заказа
+ + phone: string  — телефон покупателя в форме оформления заказа
+ + payment: Payment — способ оплаты в форме оформления заказа

#### Интерфейс IOrder 
Расширяет интерфейс IOrderForm, добавляет поле товаров в заказе: 
-  + items: string[] — Массив id товаров добавленных в корзину

## Модель данных
#### Класс AppState
Поля:
-  + catalog: Item[] — массив каталога товаров
+ + basket: string[] — массив id товаров добавленных в корзину
+ + currentItem: Item — товар который открывается в модальном окне, после того как по нему кликнут в каталоге
+ + order : IOrder — объект заказа
Методы:
-  + setItems() — создать каталог товаров 
-  + setAddress(address: string) — добавить в заказ адрес покупателя
- + setPhone(phone: string) — добавить в заказ телефон покупателя
- + setPayment(payment: Payment) — добавить в заказ способ оплаты
+ + addItem(item: Item) — добавить товар в каталог
+ + removeItem(id) — удалить товар из каталога
+ + toggleBasket() — добавить / удалить id товара в массив items в корзине
+ + getTotal() — посчитать стоимость всех товаров в корзине
+ + clearBasket() — очистить массив id товаров items в корзине, после оформления заказа

## Компоненты представления
#### Класс ItemCard —
Поля:
- # title: HTMLElement — элемент заголовка
- # description: HTMLElement — элемент описания
- # price: HTMLElement — элемент цены
- # category: HTMLElement — элемент категории
- # image: HTMLElement — элемент изображения

#### Класс Basket —
Поля:
-  # items: HTMLElement — массив элементов товаров в корзине
-  # total: HTMLElement — стоимость всех товаров в корзине
-  # button: HTMLElement — кнопка отправки формы

#### Класс Page —
Поля:
- # catalog: HTMLElement  — массив элементов товаров
- # basket: HTMLElement  — количество товаров в корзине

#### Класс OrderPayment —
Методы:
- # submit: HTMLElement — отправка формы
- # payment: HTMLElement — выбор способа оплаты
- # address: HTMLElement — адрес покупателя
- # errors: HTMLElement — валидация адреса

#### Класс OrderContact —
Поля:
- # submit: HTMLElement — отправка формы
- # phone: HTMLElement — телефон покупателя
- # email: HTMLElement — почта покупателя
- # errors: HTMLElement — валидация полей

#### Класс Success —
Поля:
- # content: HTMLElement — контент модалки после оформления заказа

## Базовые классы
#### Класс Component —
базовый класс для всех элементов представления
Методы:
- + toggleClass() — добавить / удалить класс элемента
-  # setText() — установить текстовое содержимое
- + setDisabled() — заблокировать / разблокировать элемент
-  # setHidden() — скрыть элемент
-  # setVisible() — показать элемент
-  # setImage() — установить изображение
-  # render() — отобразить элемент

#### Класс Modal —
базовый класс для всех модальных окон
Поля:
- # closeButton: HTMLButtonElement — кнопка закрытия формы
- # content: HTMLElement— контент формы
Методы:
-  + open() — открыть модалку
-  + close() — закрыть модалку
- + render() — отобразить модалку

## Описание событий
- **items:selected** — добавить / удалить в поле **currentItem** модели данных товар по которому кликнули
- **items:buy** — добавить / удалить товар из корзины
- **basket:selected** — открыть / закрыть модалку корзины
- **basket:order** — открыть / закрыть модалку оплаты заказа
- **contact:selected** — открыть / закрыть модалку контактов заказа
- **success:selected** — открыть / закрыть модалку заказ оформлен
