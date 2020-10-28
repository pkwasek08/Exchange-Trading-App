import { Companie } from './companie';

export class OfferSellBuyLimit{
    id: number;
    amount: number;
    price: number;
    limit: number;
    companie: Companie;
    type: string;

    constructor(id: number, amount: number, limit: number, price: number, companie: Companie, type: string) {
        this.id = id;
        this.amount = amount;
        this.price = price;
        this.limit = limit;
        this.companie = companie;
        this.type = type;
    }
}
