import { Item, CatalogChangeEvent } from './components/Items';
import { AppDataApi } from './components/AppDataApi';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { ItemUIPreview } from './components/UI/ItemUIPreview';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ItemUICatalog } from './components/UI/ItemUICatalog';
import { EventEmitter } from './components/base/events';
import { PageUI } from './components/UI/PageUI';
import { Basket } from './components/Basket';
import { IItem, IUserData, IPaymentUI } from './types';
import { Modal } from './components/common/Modal';
import { BasketUI } from './components/UI/BasketUI';
import { PaymentUI } from './components/UI/PaymentUI';
import { ContactsUI } from './components/UI/ContactsUI';
import { ItemUIBasket } from './components/UI/ItemUIBasket';
import { UserData } from './components/UserData';
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
const catalog = new Item(events);
const basket = new Basket(events);
const userData = new UserData(events);
const api = new AppDataApi(CDN_URL, API_URL);
const card = new ItemUIPreview(cloneTemplate(itemTemplate), events);
const basketUI = new BasketUI(cloneTemplate(basketTemplate), events);
const orderAddress = new PaymentUI(cloneTemplate(orderTemplate), events);
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

// Добавить товар в корзину
events.on('item:addToBasket', (data: { id: string }) => {
	const item = catalog.getItem(data.id);
	basket.addItemToBasket(item);
});

// Удалить товар из корзины
events.on('item:removeFromBasket', (data: { id: string }) => {
	const item = catalog.getItem(data.id);
	basket.removeItemFromBasket(item);
});

// Открыть карточку товара по клику
events.on('page-item:open', (data: { id: string }) => {
	const item = catalog.getItem(data.id);
	modal.render({
		content: card.render({
			...item,
			addToBasket:
				basket.getItems().some((i) => i.id === item.id) || !item.price,
		}),
	});
});

// Оформление заказа, заполнение форм
events.on('order:changed', (data: { field: keyof IUserData }) => {
	if (data.field === 'address' || data.field === 'payment') {
		const errors = userData.validateUserData();
		const { address, payment } = errors;
		const isValid = !(address || payment);
		orderAddress.render({
			address: userData.getUserData().address,
			payment: userData.getUserData().payment,
			valid: isValid,
			errors: Object.values({ payment, address })
				.filter((i) => !!i)
				.join('; '),
		});
	} else {
		const errors = userData.validateUserData();
		const { email, phone } = errors;
		const isValid = !(email || phone);
		orderContacts.render({
			email: userData.getUserData().email,
			phone: userData.getUserData().phone,
			valid: isValid,
			errors: Object.values({ email, phone })
				.filter((i) => !!i)
				.join('; '),
		});
	}
});

// Изменилось одно из полей
events.on(
	/^order\..*:change/,
	(data: { field: keyof IUserData; value: string }) => {
		userData.setDataField(data.field, data.value);
	}
);

// Открыть корзину по клику
events.on('basket:changed', () => {
	page.render({ counter: basket.getCount() });
	const items = basket.getItems().map((item, index) => {
		const itemUI = new ItemUIBasket(cloneTemplate(itemBasketTemplate), events);
		itemUI.index = index + 1;
		return itemUI.render(item);
	});
	const total = basket.getTotal();
	content: basketUI.render({
		items: items,
		total: total,
	});
});

events.on('page-basket:select', () => {
	modal.render({
		content: basketUI.render(),
	});
});

// открыть модалку выбор оплаты
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


// открыть модалку успешного заказа
events.on('contacts:submit', () => {
	const oredrData = {
		...userData.getUserData(),
		total: basket.getTotal(),
		items: basket.getItemsId(),
	};
	api.postOrder(oredrData).then((data) => {
		success.total = data.total;
		modal.render({
			content: success.render(),
		});
		basket.clearBasket();
	}).catch;
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
