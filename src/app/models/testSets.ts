export class TestSets{
    id: number;
    numberOfUsers:number;
    series:number;
    companyId: number;
    companyName: string;
    startUserMoney: number;
    startStockNumber: number;
    days: number;
    testName: string;

    constructor(id: number, numberOfUsers :number, series:number, companyId:number, companyName: string, 
        startUserMoney: number, startStockNumber: number, testName: string, days: number){
            this.id = id;
            this.numberOfUsers = numberOfUsers;
            this.series = series;
            this.companyId = companyId;
            this.companyName = companyName;
            this.startUserMoney = startUserMoney;
            this.startStockNumber = startStockNumber;
            this.testName = testName;
            this.days = days;
        }
}