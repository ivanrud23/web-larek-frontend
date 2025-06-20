import { IItem, IItemServer } from "../types";
import { Api, ApiListResponse } from "./base/api";

export class AppDataApi extends Api {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getCatalog(): Promise<IItem[]> {
    return this.get('/product/').then((data: ApiListResponse<IItemServer>) => 
      data.items.map((item) => {
        const newItem = {
          ...item,
          image: this.cdn + item.image,
          addedToBasket: false
        }
        return newItem;
      })
    
    )
  }

}