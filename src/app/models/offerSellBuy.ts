import { ComponentFactory } from '@angular/core';
import { Companie } from './companie';

export class OfferSellBuy {
    id: number;
    amount: number;
    price: number;
    companie: Companie;
    type: string;

    constructor(id: number, amount: number, price: number, companie: Companie, type: string) {
        this.id = id;
        this.amount = amount;
        this.price = price;
        this.companie = companie;
        this.type = type;
    }
}
