import { Items, CatalogChangeEvent } from './components/Items';
import { AppDataApi } from './components/AppDataApi';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { ItemUIPreview } from './components/UI/ItemUIPreview';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ItemUICatalog } from './components/UI/ItemUICatalog';
import { EventEmitter } from './components/base/events';
import { PageUI } from './components/UI/PageUI';
import { Basket } from './components/Basket';
import { IItem, IOrder, IOrederUI } from './types';
import { Modal } from './components/common/Modal';
import { BasketUI } from './components/UI/BasketUI';
import { OrderUI } from './components/UI/OredrUI';
import { ContactsUI } from './components/UI/ContactsUI';
import { ItemUIBasket } from './components/UI/ItemUIBasket';
import { Order } from './components/Order';
import { SuccessUI } from './components/UI/SuccessUI';

// Все шаблоны
const itemCatalogTemplate = document.querySelector(
	'#card-catalog'
) as HTMLTemplateElement;
const itemBasketTemplate = document.querySelector(
	'#card-basket'
) as HTMLTemplateElement;
const itemTemplate = document.querySelector(
	'#card-preview'
) as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector(
	'#contacts'
) as HTMLTemplateElement;
const successTemplate = document.querySelector(
	'#success'
) as HTMLTemplateElement;

const events = new EventEmitter();
const catalog = new Items(events);
const basket = new Basket(events);
const order = new Order(events);
const api = new AppDataApi(CDN_URL, API_URL);
const card = new ItemUIPreview(cloneTemplate(itemTemplate), events);
const basketUI = new BasketUI(cloneTemplate(basketTemplate), events);
const orderAddress = new OrderUI(cloneTemplate(orderTemplate), events);
const orderContacts = new ContactsUI(cloneTemplate(contactsTemplate), events);
const success = new SuccessUI(cloneTemplate(successTemplate), events);

const page = new PageUI(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('.modal'), events);

// Изменения в каталоге карточек на главной
events.on('itemsCatalog:changed', () => {
	const items = catalog
		.getItems()
		.map((item) =>
			new ItemUICatalog(cloneTemplate(itemCatalogTemplate), events).render(item)
		);
	page.render({
		catalog: items,
	});
});

//Изменения корзины
events.on('basket:changed', (data: { id: string }) => {
	const item = catalog.getItem(data.id);
	if (!basket.checkItem(item)) {
		basket.addItemToBasket(item);
	} else {
		basket.removeItemFromBasket(item);
	}
	const items = basket.getItems().map((item, index) => {
		const itemUI = new ItemUIBasket(cloneTemplate(itemBasketTemplate), events);
		itemUI.index = index + 1;
		return itemUI.render(item);
	});
	const total = basket.getTotal();
	page.counter = basket.getCount();
	basketUI.render({
		items: items,
		total: total,
		addToOrder: Boolean(!total),
	});
	card.render({
		addToBasket: basket.getItems().some((i) => i.id === item.id),
	});
});

// Открыть карточку товара по клику
events.on('page-item:open', (data: { id: string }) => {
	const item = catalog.getItem(data.id);
	modal.render({
		content: card.render({
			...item,
			addToBasket: basket.getItems().some((i) => i.id === item.id),
		}),
	});
});

events.on('formErrors:change', (errors: Partial<IOrder>) => {
	const { address, phone, email } = errors;
	const activeButtonContacts = phone && email;
	orderAddress.render({
		activeButton: Boolean(address),
		errors: '',
	});
	orderContacts.errors = Object.values({phone, email}).filter(i => !!i).join('; ')
	orderContacts.render({
		activeButton: Boolean(true),
		errors: orderContacts.errors
	});
});

// Изменилось одно из полей
events.on(
	/^order\..*:change/,
	(data: { field: keyof IOrder; value: string }) => {
		order.setOrderField(data.field, data.value);
	}
);

// Открыть корзину по клику
events.on('page-basket:select', () => {
	const items = basket.getItems().map((item, index) => {
		const itemUI = new ItemUIBasket(cloneTemplate(itemBasketTemplate), events);
		itemUI.index = index + 1;
		return itemUI.render(item);
	});
	const total = basket.getTotal();
	modal.render({
		content: basketUI.render({
			items: items,
			total: total,
		}),
	});
});

// открыть модалку оформления заказа
events.on('basket-order:open', () => {
	modal.render({
		content: orderAddress.render(),
	});
});

// открыть модалку контактов
events.on('basket-contacts:open', () => {
	modal.render({
		content: orderContacts.render(),
	});
});

// открыть модалку контактов
events.on('success:open', () => {
	modal.render({
		content: orderContacts.render(),
	});
});

// открыть модалку успешного заказа
events.on('success:open', () => {
	
	api.postOrder(order)
	success.total = basket.getTotal();
	basket.clearBasket();
	page.counter = 0;

	modal.render({
		content: success.render(),
	});
	basketUI.render({
		addToOrder: true,
	});
});

events.on('success:close', () => {
	console.log('success');
	modal.close();
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});

api
	.getCatalog()
	.then((data) => {
		catalog.setItems(data);
	})
	.catch((err) => console.log(err));
