import { ComponentFactory } from '@angular/core';
import { Companie } from './companie';
import { User } from './user';

export class OfferSellBuy {
    id: number;
    amount: number;
    price: number;
    companie: Companie;
    user: User;
    type: string;
    date: Date;
    active: boolean;

    constructor(id: number, amount: number, price: number, companie: Companie, user: User, type: string, date: Date) {
        this.id = id;
        this.amount = amount;
        this.price = price;
        this.companie = companie;
        this.user = user;
        this.type = type;
        this.date = date;
    }
}
