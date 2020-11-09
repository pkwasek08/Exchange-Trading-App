export class StockUserTableView {
    companyName: string;
    industry: string;
    actualPrice: number;
    amount: number;
    purchase: number;
    trend: number;
    profit: number;

    constructor(companyName: string, industry: string, actualPrice: number, amount: number,
                purchase: number, profit: number, trend: number) {
        this.companyName = companyName;
        this.industry = industry;
        this.actualPrice = actualPrice;
        this.amount = amount;
        this.purchase = purchase;
        this.profit = profit;
        this.trend = trend;
    }
}
