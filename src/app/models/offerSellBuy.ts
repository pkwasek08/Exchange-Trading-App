import { ComponentFactory } from '@angular/core';
import { Company } from './company';
import { User } from './user';

export class OfferSellBuy {
    id: number;
    amount: number;
    price: number;
    company: Company;
    user: User;
    type: string;
    date: Date;
    active: boolean;

    constructor(id: number, amount: number, price: number, company: Company, user: User, type: string, date: Date) {
        this.id = id;
        this.amount = amount;
        this.price = price;
        this.company = company;
        this.user = user;
        this.type = type;
        this.date = date;
    }
}
