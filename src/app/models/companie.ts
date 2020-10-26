import { CompanieStatistic } from './companieStatistic';

export class Companie {
    id: number;
    name: string;
    industry: string;
    revenue: number;
    capital: number;
    companieStatisticLatest: CompanieStatistic;
    companieStatisticArray: CompanieStatistic[];

    constructor(id: number, name: string,
                industry: string,
                revenue: number,
                capital: number,
                companieStatisticArray: CompanieStatistic[],
                companieStatisticLatest: CompanieStatistic) {
        this.id = id;
        this.name = name;
        this.industry = industry;
        this.revenue = revenue;
        this.capital = capital;
        this.companieStatisticLatest = companieStatisticLatest;
        this.companieStatisticArray = companieStatisticArray;
    }
}
