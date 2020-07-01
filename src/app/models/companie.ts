export class Companie {
    id: number;
    name: string;
    industry: string;
    revenue: number;
    capital: number;

    constructor(id: number, name: string,
                industry: string,
                revenue: number,
                capital: number) {
        this.id = id;
        this.name = name;
        this.industry = industry;
        this.revenue = revenue;
        this.capital = capital;
    }
}
