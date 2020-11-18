export class CompanyStatistic {
    id: number;
    price: number;
    date: Date;
    volume: number;
    maxPrice: number;
    minPrice: number;
    trendValue: number;

    constructor(id: number, price: number, date: Date, volume: number,
                maxPrice: number, minPrice: number, trendValue: number) {
        this.id = id;
        this.price = price;
        this.date = date;
        this.volume = volume;
        this.maxPrice = maxPrice;
        this.minPrice = minPrice;
        this.trendValue = trendValue;
    }
}
