import { AppDataApi } from './components/AppDataApi';
import { EventEmitter } from './components/base/events';
import { Items } from './components/Item';
import { BasketUI } from './components/UI/BasketUI';
import { ModalUI } from './components/UI/common/ModalUI';
import { ItemBasketUI } from './components/UI/ItemBasketUI';
import { ItemCatalogUI } from './components/UI/ItemCatalogUI';
import { ItemPreviewUI } from './components/UI/ItemPreviewUI';
import { PageUI } from './components/UI/PageUI';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

const itemCatTempl = ensureElement<HTMLTemplateElement>('#card-catalog');
const itemPrevTempl = ensureElement<HTMLTemplateElement>('#card-preview');
const itemBasketTempl = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');

const events = new EventEmitter();
const api = new AppDataApi(CDN_URL, API_URL);

const items = new Items(events);

const page = new PageUI(document.body, events);
const modal = new ModalUI(ensureElement<HTMLElement>('#modal-container'), events);
const itemPrev = new ItemPreviewUI(cloneTemplate(itemPrevTempl), events);
// const basket = new BasketUI(cloneTemplate(itemBasketTempl), events);
const basket = new BasketUI(cloneTemplate(basketTemplate), events);


// создаем каталог
events.on('items:changed', () => {
  const itemElements = items.getItems().map(item => 
    new ItemCatalogUI(cloneTemplate(itemCatTempl), events).render(item)
  )
  // console.log(itemElements);
page.render({
    items: itemElements
  })
})

// открываем карточку товара
events.on('item-catalog:click', (item: {id: string}) => {
  // console.log(items.getItemById(item.id));
  modal.render({
    content: itemPrev.render({
      ...items.getItemById(item.id)
    })
  })
})

// добавляем товар в корзину
events.on('item:addedToBasket', (item: {id: string}) => {
  items.getItemById(item.id).addedToBasket = true;
  page.render({
    counter: items.getBasketCount()
  })
})

// открываем корзину
events.on('basket:open', () => {
  // console.log(items.getItems().filter(item => item.addedToBasket === true))
  // const itemPart = items.getItems()
  // .filter(item => item.addedToBasket === true)
  // .map(item => 
  //   new ItemBasketUI(cloneTemplate(itemBasketTempl), events))
  const itemElements = items.getItems()
  .filter(item => item.addedToBasket === true)
  .map(item => 
    new ItemBasketUI(cloneTemplate(itemBasketTempl), events).render(item)
  )
  console.log(itemElements);
  console.log(basket.render({
    items: itemElements
  }));
  modal.render({
    content: basket.render({
      items: itemElements
    })
  })
})



// Блокируем прокрутку страницы если открыта модалка
// events.on('modal:open', () => {
// 	page.locked = true;
// });

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});

api.getCatalog()
  .then((data) => {
    items.setItems(data);
    // console.log(data);
  })
  .catch(err => {
    console.error(err);
});