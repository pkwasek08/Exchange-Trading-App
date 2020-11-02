import { NumberSymbol } from '@angular/common';

export class OfferTableView {
    price: number;
    amount: number;
    purchase: number;

    constructor(price: number, amount: number, purchase: number) {
        this.price = price;
        this.amount = amount;
        this.purchase = purchase;
    }
}
