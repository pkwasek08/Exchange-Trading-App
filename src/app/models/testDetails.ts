import { TestPriceDetails } from "./testPriceDetails";

export class TestDetails {
    testName: string;
    exeTime: number;
    dbTime: number;
    fullTestTime: number;
    userNumber: number;
    series: number;
    date: Date;
    numberOfRequests: number;
    priceDetails: TestPriceDetails;
    constructor(testName: string,
        exeTime: number,
        dbTime: number,
        fullTestTime: number,
        userNumber: number,
        series: number,
        date: Date,
        numberOfRequests: number,
        priceDetails: TestPriceDetails) {
        this.testName = testName;
        this.exeTime = exeTime;
        this.dbTime = dbTime;
        this.fullTestTime = fullTestTime;
        this.userNumber = userNumber;
        this.series = series;
        this.date = date;
        this.numberOfRequests = numberOfRequests;
        this.priceDetails = priceDetails;
    }
}