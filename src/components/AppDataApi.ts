import { Api, ApiListResponse } from './base/api';
import { IApiOrder, IItem, IUserData, IOrder } from '../types';
import { UserData } from './UserData';

export class AppDataApi extends Api {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getCatalog(): Promise<IItem[]> {
		return this.get('/product/').then((data: ApiListResponse<IItem>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	postOrder(order: IApiOrder): Promise<IOrder> {
		return this.post('/order', order).then(
			(data: IOrder) => data
		)
	}

}
