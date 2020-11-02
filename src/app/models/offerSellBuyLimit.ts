import { Companie } from './companie';
import { User } from './user';

export class OfferSellBuyLimit{
    id: number;
    amount: number;
    price: number;
    limit: number;
    companie: Companie;
    user: User;
    type: string;
    date: Date;
    active: boolean;

    constructor(id: number, amount: number, limit: number, price: number, companie: Companie, user: User, type: string,
                date: Date, active: boolean) {
        this.id = id;
        this.amount = amount;
        this.price = price;
        this.limit = limit;
        this.companie = companie;
        this.user = user;
        this.type = type;
        this.date = date;
        this.active = active;
    }
}
