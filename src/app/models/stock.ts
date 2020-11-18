import { Company } from './company';

export class Stock {
    id: number;
    amount: number;
    company: Company;

    constructor(id: number, amount: number, company: Company) {
        this.id = id;
        this.amount = amount;
        this.company = company;
    }
}
