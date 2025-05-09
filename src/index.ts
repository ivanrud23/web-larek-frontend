import { Items, CatalogChangeEvent } from './components/Items';
import { AppDataApi } from './components/AppDataApi';
import './scss/styles.scss';
import { API_URL, CDN_URL} from './utils/constants';
import { ItemUIPreview } from './components/ItemUIPreview';
import { cloneTemplate } from './utils/utils';
import { ItemUICatalog } from './components/ItemUICatalog';
import { EventEmitter } from './components/base/events';
import { Page } from './components/PageUI';
import { Basket } from './components/Basket';
import { IItem } from './types';

const events = new EventEmitter();
const catalog = new Items(events);
const api = new AppDataApi(CDN_URL, API_URL);
const basket = new Basket()
const page = new Page(document.body);

// events.onAll(({ eventName, data }) => {
//   console.log(eventName, data);
// })

// Все шаблоны
const itemCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;


// Изменения в каталоге карточек на главной
events.on<CatalogChangeEvent>('itemsCatalog:changed', () => {
  const itemsHTMLArray = catalog.getItems()
  .map(item => new ItemUICatalog(cloneTemplate(itemCatalogTemplate), events)
  .render(item));
  page.render({
    catalog: itemsHTMLArray
  })
})

// Открыть карточку товара по клику
events.on('item:check', (item: IItem) => {
  console.log(item)
  // page.render
})


  api.getCatalog()
  .then(data => {
    catalog.setItems(data)
    // data.forEach(item => console.log(item.image))
  })
  .catch(err => console.log(err))