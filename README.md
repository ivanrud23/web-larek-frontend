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

## Архитектура
При проектировании использовалась MVP архитектура в сочетании с событийно-ориентированной. 
MVP расшифровывается так:
- Model (Модель) - часть приложения, которая хранит данные, работает с данными, проводит вычисления.
- View (Вид или представление) - часть приложения, показывающая пользователю интерфейс и данные из модели на экране.
- Presenter (Представитель) - часть приложения, которая обеспечивает связь, является посредником между моделью и видом.
Код презентера не будет выделен в отдельный класс, а будет размещен в основном скрипте приложения index.ts


## Базовые классы
### Класс Component —
базовый класс для всех элементов представления

__Методы__:
+ toggleClass() — добавить / удалить класс элемента
+ setText() — установить текстовое содержимое
+ setDisabled() — заблокировать / разблокировать элемент
+ setHidden() — скрыть элемент
+ setVisible() — показать элемент
+ setImage() — установить изображение
+ render() — отобразить элемент

### Класс Model —
базовый класс для всех классов моделей данных 

__Методы__:
+ emitChanges: Сообщить всем что модель поменялась

### Класс Modal —
базовый класс для всех модальных окон

__Поля__:
+ closeButton: HTMLButtonElement — кнопка закрытия формы
+ content: HTMLElement— контент формы

__Методы__:
+ open() — открыть модалку
+ close() — закрыть модалку
+ render() — отобразить модалку

### Класс api —
базовый класс для запросов

__Поля__:
+ baseUrl: string — базовый урл
+ options: RequestInit — опции запроса - тело, заголовки

__Методы__:
+ handleResponse\<T>(response: Response): Promise\<T> — обработка ответа сервера
+ get\<T>(uri: string) — запрос получения данных
+ post\<T>(uri: string, data: object, method: ApiPostMethods = 'POST')  — базовый метод передачи/изменения данных на сервере

### Класс AppDataApi —
класс расщиряющий клас api запросов

__Поля__:
+ cdn: string

__Методы__:
+ getCatalog(): Promise<IItem[]> — запрос получения данных
+ postOrder(order: IApiOrder): Promise<IOrderResult>   — базовый метод передачи/изменения данных на сервере


### Класс EventEmitter —
класс обработчика событий

__Поля__:
+ _events: Map<EventName, Set\<Subscriber>>;

__Методы__:
+  on\<T extends object>(eventName: EventName, callback: (event: T) => void) — Установить обработчик на событие
+ off(eventName: EventName, callback: Subscriber) — Снять обработчик с события
+ emit\<T extends object>(eventName: string, data?: T) — Инициировать событие с данными
+ onAll(callback: (event: EmitterEvent) => void) — Слушать все события
+ offAll() — Сбросить все обработчики
+ trigger\<T extends object>(eventName: string, context?: Partial\<T>) — Сделать коллбек триггер, генерирующий событие при вызове

### Класс Form —
класс формы

__Поля__:
+ elementSubmit: HTMLButtonElement;
+ elementErrors: HTMLElement;

__Методы__:
+  onInputChange(field: keyof T, value: string) — метод гененриует событие поля, в котрое внесли изменения
+ set valid(value: boolean) — устанваливает значение valid
+ set errors(value: boolean) — устанваливает значение errors
+ render(state?: Partial\<T & IFormState>) — добавили тип в расширяемый класс Components



## Описание данных
### Интерфейс IItem — интерфейс хранения данных товара
__Поля__:
+ id: string — уникальный номер товара, 
+ title: string — название товара,
+ description: string — описание отвара,
+ category: Category — категория товара,
+ image: string — изображение товара

### Тип Category — тип возможных категорий товаров
'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил' 

### Интерфейс IUserData — интерфейс хранения данных покупателя
__Поля__:
+ address: string — адрес покупателя в форме оформления заказа
+ email: string — электронная почта в форме оформления заказа
+ phone: string  — телефон покупателя в форме оформления заказа
+ payment: Payment — способ оплаты в форме оформления заказа

### Интерфейс IContactsUI — интерфейс данных вводимых в форме контактов
__Поля__:
+ email: string — электронная почта в форме оформления заказа
+ phone: string  — телефон покупателя в форме оформления заказа

### Интерфейс IApiOrder — интерфейс передаваемых данных заказа, расширяет IUserData 2 полями
__Поля__:
+ total: number — общая сумма заказ
+ items: string[]  — id купленных товаров

### Интерфейс IOrder — интерфейс данных заказа, возращаемых сервером, в качестве подтверждения
__Поля__:
+ id: string — id заказа
+ total: number — общая сумма заказ

## Модель данных
### Класс Item — модель данных карточек товара, расширяет базовый класс Model, использует интерфейс IItem
__Поля__:
+ catalog: Item[] — массив карточек
+ preview: string | null — id карточки для превью
  
__Методы__:
+ setItems(items: IItem[]) — создание каталога товаров
+ addItem(item: IItem) — добавление товара в каталог
+ removeItem(string: id) — удаление товара из каталога
+ getItem(id: string): IItem — получение товара
+ getItems(): IItem[] — получение товаров

### Класс Basket — модель данных корзины товаров
__Поля__:
+ items: Item[] — массив товаров добавленных в корзину
  
__Методы__:
+ addItemToBacket(item: IItem) — добавление товара в корзину
+ removeItemFromBucket(string: id) — удаление товара из корзины
+ getTotal(items: Item[]) — получение итоговой суммы товаров в корзине
+ clearBasket() — удалить все товары из корзины
+ getCount(): number — получить общее число товаров в корзине
+ getItems(): IItem[] — получить массив товаров в корзине
+ getItemsId(): string[] — получить массив id товаров в корзине

### Класс UserData — модель данных, хранящая данные пользователя. Расширяет клас Model, ипользует интерфейс IUserData
__Поля__:
+ userData: IUserData — данные покупателя
+ formErrors: FormErrors — ошибки форм

__Методы__:
+ setDataField\<T extends keyof IUserData>(field: T, value: IUserData[T]) — изменение формы
+ validateUserData() — валидация формы
+ getUserData — получить данные пользователя

## Компоненты представления

### Класс BasketUI — класс представления корзины
__Поля__:
+ elementItemsList: HTMLElement — массив элементов товаров в корзине
+ elementSubmit: HTMLButtonElement — стоимость всех товаров в корзине
+ elementTotal: HTMLElement — кнопка перехода к оформлению заказа
  
__Методы__:
+ set items(items: HTMLElement[]) — задать значение списка элементов товаров в корзине
+ set total(total: number) — задать значение элемента общей стоимости в корзине

### Класс ContactsUI — класс представления формы контактов
__Поля__:
+ emailInput: HTMLInputElement — элемент ввода почты
+ phoneInput: HTMLInputElement — элемент ввода телефона
  
__Методы__:
+ set email(value: string) — задать значение почты
+ set phone(value: string) — задать значение телефона

### Класс ItemUI — базовый класс представления товара
__Поля__:
+ itemTitle: HTMLElement — элемент заголовка товара
+ itemPrice: HTMLElement — элемент цены товара
+ cardId: string — id товара
  
__Методы__:
+ set title(value: string) — задать значение заголовка
+ set price(value: number | null) — задать значение цены
+ set id(value: string) — задать значение id

### Класс ItemUIBasket — класс представления товара в модалке корзины, расширяет ItemUI
__Поля__:
+ elementButton: HTMLButtonElement — элемент кнопки оформления заказа
+ elementIndex: HTMLElement — элемент номера позиции товара в корзине
  
__Методы__:
+ set index(value: number) — задать номера позиции

### Класс ItemUICatalog — класс представления товаров в каталоге на странице, расширяет ItemUI
__Поля__:
+ elementCategory: HTMLButtonElement — элемент категории товара
+ elementImage: HTMLElement — элемент изображения карточки товара
  
__Методы__:
+ set category(value: Category) — задать категорию товара
+ set image(value: string) — задать изображение карточки товара

### Класс ItemUIPreview — класс представления карточки товара, расширяет ItemUICatalog
__Поля__:
+ elemntDescription: HTMLElement — элемент описания товара
+ elemntButon: HTMLElement — элемент добавления товара в корзину
  
__Методы__:
+ set addToBasket(value: boolean) — задать флаг добавлен ли товаро в корзину
+ set description(value: string) — задать описание товара

### Класс PaymentUI — класс представления формы оплаты, расширяет Form
__Поля__:
+ elementAddress: HTMLElement — элемент ввода адреса
+ orderPayment: Payment — данные способа оплаты
+ elementPaymentButtons: HTMLElement[] — элемент кнопок выбора оплаты
  
__Методы__:
+ set address(value: string) — задать адрес
+ set payment(value: Payment) — задать способ оплаты


### Класс Page — класс представления главной страницы 
__Поля__:
+ elementCounter: HTMLElement — элемент количества товаров в корзине
+ elementCatalog: HTMLElement — элемент каталога товаров
+ elementWrapper: HTMLElement — элемент прокрутки страницы
+ elementBasket: HTMLElement — элемент корзины

__Методы__:
+ set counter(value: number) — задать значение элемента количества товаров в корзине
+ set catalog(items: HTMLElement[]) — задать значение массива элементов каталога товаров
+ set locked(value: boolean) — включить / отключить прокрутку каталога товаров

### Класс SuccessUI — класс представления модалки успешного оформления заказа
__Поля__:
+ elementTotal: HTMLElement — элемент общей стоимости заказа
+ elementButton: HTMLElement — элемент кнопки закрытия модалки

__Методы__:
+ set total(value: number) — задать значение общей стоимости

## Описание событий
- **itemsCatalog:changed** — изменение каталога товаров
- **item:addToBasket** — добавить товар в корзину
- **item:removeFromBasket** — удалить товар из корзины
- **page-item:open** — открыть модалку карточки товара
- **order:changed** — валидация полей формы
- **/^order\\..*:change/** — изменение поля формы, событие генерируется через регулярное выражение
- **basket:changed** — изменение состава корзины
- **page-basket:select** — открыть / закрыть модалку корзины
- **basket-order:open** — открыть модалку выбора способа оплаты
- **basket-contacts:open** — открыть модалку контактов
- **contacts:submit** — открыть модалку успешного заказа
- **success:close** — сообщаем о закрытии модалки успешного заказа
- **modal:open** — сообщаем об открытии модалки для блокировки прокрутки 
- **modal:close** — сообщаем о закрытии модалки для разблокировки прокрутки 
