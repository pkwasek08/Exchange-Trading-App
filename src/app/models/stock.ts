import { Companie } from './companie';

export class Stock {
    id: number;
    amount: number;
    company: Companie;

    constructor(id: number, amount: number, company: Companie) {
        this.id = id;
        this.amount = amount;
        this.company = company;
    }
}
