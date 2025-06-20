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


## Базовые классы
### Api — класс взаимодействия с сервером
__Поля__
__baseUrl__: string — базовый адрес ссылки
__options__: RequestInit — опции запроса (хэдеры)

__Методы__
__handleResponse__(response: Response): Promise<object> — 
метод обработки ответа
__get__(uri: string) — метод запрашивающий данные с сервера
__post__(uri: string, data: object, method: ApiPostMethods = 'POST') — метод передающий данные на сервер

### Model — 


## Модели данных
### Item
__id__: string — 
__description__: string — 
__image__: string — 
__title__: string — 
__category__: Category — 
__price__: number — 
__addedToBasket__: boolean — 

### User
payment: string
address: string
email: string
phone: string
