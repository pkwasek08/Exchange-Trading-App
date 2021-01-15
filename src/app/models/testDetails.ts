import { TestPriceDetails } from "./testPriceDetails";

export class TestDetails {
    testName: string;
    exeTime: number;
    dbTime: number;
    fullTestTime: number;
    userNumber: number;
    series: number;
    date: Date;
    startUserMoney: number;
    startNumberStock: number;
    companyName: string;
    numberOfRequests: number;
    priceDetails: TestPriceDetails;
    constructor(testName: string,
        exeTime: number,
        dbTime: number,
        fullTestTime: number,
        userNumber: number,
        series: number,
        date: Date,
        startUserMoney: number,
        startNumberStock: number,
        companyName: string,
        numberOfRequests: number,
        priceDetails: TestPriceDetails) {
        this.testName = testName;
        this.exeTime = exeTime;
        this.dbTime = dbTime;
        this.fullTestTime = fullTestTime;
        this.userNumber = userNumber;
        this.series = series;
        this.date = date;
        this.startUserMoney = startUserMoney;
        this.startNumberStock = startNumberStock;
        this.companyName = companyName;
        this.numberOfRequests = numberOfRequests;
        this.priceDetails = priceDetails;
    }
}