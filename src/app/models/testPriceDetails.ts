export class TestPriceDetails{
    minBuyPrice: number;
    maxBuyPrice: number;
    minSellPrice: number;
    maxSellPrice: number;
    volumes: number;
    
    constructor(minBuyPrice: number,
        maxBuyPrice: number,
        minSellPrice: number,
        maxSellPrice: number,
        volumes: number){
           this.minBuyPrice = minBuyPrice;
           this.maxBuyPrice = maxBuyPrice;
           this.minSellPrice = minSellPrice;
           this.maxSellPrice = maxSellPrice;
           this.volumes = volumes;
        }
}