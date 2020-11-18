import { CompanyStatistic } from './companyStatistic';

export class Company {
    id: number;
    name: string;
    industry: string;
    revenue: number;
    capital: number;
    companyStatisticLatest: CompanyStatistic;
    companyStatisticArray: CompanyStatistic[];

    constructor(id: number, name: string,
                industry: string,
                revenue: number,
                capital: number,
                companyStatisticLatest: CompanyStatistic,
                companyStatisticArray: CompanyStatistic[]) {
        this.id = id;
        this.name = name;
        this.industry = industry;
        this.revenue = revenue;
        this.capital = capital;
        this.companyStatisticLatest = companyStatisticLatest;
        this.companyStatisticArray = companyStatisticArray;
    }
}
