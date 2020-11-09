import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Companie } from 'src/app/models/companie';
import { OfferSellBuy } from 'src/app/models/offerSellBuy';
import { OfferSellBuyLimit } from 'src/app/models/offerSellBuyLimit';
import { OfferTableView } from 'src/app/models/offerTableView';
import { Stock } from 'src/app/models/stock';
import { User } from 'src/app/models/user';
import { CompanieStatisticService } from 'src/app/services/companieStatistic/companie-statistic.service';
import { OfferSellBuyService } from 'src/app/services/offerSellBuy/offer-sell-buy.service';
import { OfferSellBuyLimitService } from 'src/app/services/offerSellBuyLimit/offer-sell-buy-limit.service';
import { StockService } from 'src/app/services/stock/stock.service';
import { UserService } from 'src/app/services/user/user.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
@Component({
  selector: 'app-sell-buy',
  templateUrl: './sell-buy.component.html',
  styleUrls: ['./sell-buy.component.css']
})
export class SellBuyComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [{ data: [], label: "Price" }];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  loggedUser: User;
  company: Companie;
  amountOrder = 0;
  amountLimitOrder = 0;
  priceLimit = 0;
  typeOrder: string = null;
  typeLimitOrder: string = null;
  sellLimitOrder: OfferTableView[];
  buyLimitOrder: OfferTableView[];
  priceOrder = 0;
  stockUser: Stock;
  stockUserValue = 0;

  constructor(private userService: UserService,
    private companieStatisticService: CompanieStatisticService,
    private offerSellBuyService: OfferSellBuyService,
    private offerSellBuyLimitService: OfferSellBuyLimitService,
    private stockService: StockService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.company = this.userService.selectedCompanie;
    this.loggedUser = this.userService.loggedUser;
    this.initData();
  }

  updatePriceOrder() {
    if (this.typeOrder === 'Sell' && this.buyLimitOrder.length === 0) {
      this.snackBar.open('There are no stock for buy order', 'x', {
        panelClass: 'custom-css-class-warming',
        duration: 3000,
      });
      return;
    }
    if (this.typeOrder === 'Buy' && this.sellLimitOrder.length === 0) {
      this.snackBar.open('There are no stock for sell order', 'x', {
        panelClass: 'custom-css-class-warming',
        duration: 3000,
      });
      return;
    }
    this.priceOrder = this.getActualValueStock(this.amountOrder, this.typeOrder);
  }

  validateOffer(amount: number, price: number, type: string) {
    if (type === 'Buy') {
      if (this.loggedUser.cash == null || (this.loggedUser.cash != null && amount * price > this.loggedUser.cash)) {
        this.snackBar.open('You don\'t have enough money to accept this transaction', 'x', {
          panelClass: 'custom-css-class-warming',
          duration: 3000,
        });
        return false;
      }
    }
    if (type === 'Sell') {
      if (this.stockUser == null || (this.stockUser.amount != null && amount > this.stockUser.amount)) {
        this.snackBar.open('You don\'t have enough stock to accept this transaction', 'x', {
          panelClass: 'custom-css-class-warming',
          duration: 3000,
        });
        return false;
      }
    }
    return true;
  }

  getPriceOrderLimit() {
    return this.amountLimitOrder * this.priceLimit;
  }

  onClickSellBtn() {
    document.getElementById('sellBtn').style.border = '6px solid rgb(252 189 189)';
    document.getElementById('sellBtn').style.background = '#c52323';
    document.getElementById('buyBtn').style.border = '0';
    document.getElementById('buyBtn').style.background = '#6c757d';
    document.getElementById('submitOrderId').textContent = 'Submit sell order';
    this.typeOrder = 'Sell';
    this.updatePriceOrder();
  }

  onClickBuyBtn() {
    document.getElementById('sellBtn').style.border = '0';
    document.getElementById('sellBtn').style.background = '#6c757d';
    document.getElementById('buyBtn').style.background = 'green';
    document.getElementById('buyBtn').style.border = '6px solid #b9f3b4';
    document.getElementById('submitOrderId').textContent = 'Submit buy order';
    this.typeOrder = 'Buy';
    this.updatePriceOrder();
  }

  onClickSellLimitBtn() {
    document.getElementById('sellLimitBtn').style.border = '6px solid rgb(252 189 189)';
    document.getElementById('sellLimitBtn').style.background = '#c52323';
    document.getElementById('buyLimitBtn').style.border = '0';
    document.getElementById('buyLimitBtn').style.background = '#6c757d';
    document.getElementById('submitOrderLimitId').textContent = 'Submit sell order';
    this.typeLimitOrder = 'Sell';
  }

  onClickBuyLimitBtn() {
    document.getElementById('sellLimitBtn').style.border = '0';
    document.getElementById('sellLimitBtn').style.background = '#6c757d';
    document.getElementById('buyLimitBtn').style.background = 'green';
    document.getElementById('buyLimitBtn').style.border = '6px solid #b9f3b4';
    document.getElementById('submitOrderLimitId').textContent = 'Submit buy order';
    this.typeLimitOrder = 'Buy';
  }

  getSubmitPriceOffer() {
    return this.priceOrder / this.amountOrder;
  }

  onClickSubmitBtn() {
    if (!this.validateOffer(this.amountOrder, this.priceOrder, this.typeOrder)) {
      return;
    }
    if (this.priceOrder === 0) {
      this.snackBar.open('No offers for ' + this.typeOrder.toLowerCase() + ' orders', 'x', {
        panelClass: 'custom-css-class-info',
        duration: 5000,
      });
      return;
    }
    const newOrder = new OfferSellBuy(0, this.amountOrder, this.getSubmitPriceOffer(), this.company,
      this.loggedUser, this.typeOrder, new Date());
    this.offerSellBuyService.addOffer(newOrder)
      .subscribe(
        (response) => {
          this.snackBar.open('Your order is completed', 'x', {
            panelClass: 'custom-css-class-success',
            duration: 5000,
          });
          this.initData();
          this.refreshOffersComponents();
        },
        (error) => {
          this.snackBar.open(error.status + ' error :(', 'x', {
            panelClass: 'custom-css-class-error',
            duration: 5000,
          });
        }
      )
  }

  onClickSubmitLimitBtn() {
    if (!this.validPriceOrderLimit()) {
      this.snackBar.open('Order limit price must be higher than first offer price on the list.', 'x', {
        panelClass: 'custom-css-class-warming',
        duration: 3000,
      });
      return;
    }
    if (!this.validateOffer(this.amountLimitOrder, this.priceLimit, this.typeLimitOrder)) {
      return;
    }
    const newOrderLimit = new OfferSellBuyLimit(0, this.amountLimitOrder, this.priceLimit,
      this.priceLimit, this.company, this.loggedUser, this.typeLimitOrder, new Date(), true);
    this.offerSellBuyLimitService.addOfferLimit(newOrderLimit)
      .subscribe(
        (response) => {
          this.snackBar.open('Your order has been accepted', 'x', {
            panelClass: 'custom-css-class-success',
            duration: 5000,
          });
          this.initData();
          this.refreshOffersComponents();
        },
        (error) => {
          this.snackBar.open(error.status + ' error :(', 'x', {
            panelClass: 'custom-css-class-error',
            duration: 5000,
          });
        }
      )
  }

  isValidOrder() {
    if (this.amountOrder !== 0 && this.typeOrder != null && this.priceOrder !== 0) {
      return true;
    }
    else {
      return false;
    }
  }

  validPriceOrderLimit() {
    if (this.typeLimitOrder === 'Sell') {
      if (this.buyLimitOrder.length != 0 && this.buyLimitOrder[0].price >= this.priceLimit) {
        this.snackBar.open('Order limit price must be lover than first offer price on the list.', 'x', {
          panelClass: 'custom-css-class-warming',
          duration: 3000,
        });
        return false;
      }
    } else {
      if (this.sellLimitOrder.length != 0 && this.sellLimitOrder[0].price <= this.priceLimit) {
        this.snackBar.open('Order limit price must be higher than first offer price on the list.', 'x', {
          panelClass: 'custom-css-class-warming',
          duration: 3000,
        });
        return false;
      }
    }
    return true;
  }

  isValidOrderLimit() {
    if (this.amountLimitOrder !== 0 && this.priceLimit !== 0 && this.typeLimitOrder != null) {
      return true;
    }
    return false;
  }

  updateUserCash() {
    this.loggedUser = this.userService.updateUserCash();
  }

  initData() {
    this.loggedUser = this.userService.updateUserCash();
    this.companieStatisticService.getCompanieStatisticByCompanieId(this.company.id).
      subscribe(companieStatisticList => {
        this.company.companieStatisticArray = companieStatisticList;
        let priceList: number[] = [];
        this.lineChartLabels = [];
        companieStatisticList.forEach(cs => {
          priceList.unshift(cs.price);
          const dateCompanieStatistic = new Date(cs.date);
          const formattedDate = dateCompanieStatistic.getDate() + '/' + (dateCompanieStatistic.getMonth() + 1) + '/'
           + dateCompanieStatistic.getFullYear()
          this.lineChartLabels.unshift(formattedDate);
        });
        this.lineChartData = [
          { data: priceList, label: 'Price' },
        ];
      });
    this.offerSellBuyLimitService.getOffersSellLimitByCompanieId(this.company.id).subscribe(order => this.sellLimitOrder = order);
    this.offerSellBuyLimitService.getOffersBuyLimitByCompanieId(this.company.id).subscribe(order => this.buyLimitOrder = order);
    this.stockService.getStockByUserIdAndCompanyId(this.loggedUser.id, this.company.id).subscribe(stock => {
      if (stock != null) {
        this.stockUser = stock;
        this.stockUserValue = this.getActualValueUserStock();
      }
    });

  }

  refreshOffersComponents() {
    document.getElementById('sellBtn').style.border = '0';
    document.getElementById('sellBtn').style.background = '#6c757d';
    document.getElementById('buyBtn').style.background = '#6c757d';
    document.getElementById('buyBtn').style.border = '0';
    document.getElementById('sellLimitBtn').style.background = '#6c757d';
    document.getElementById('sellLimitBtn').style.border = '0';
    document.getElementById('buyLimitBtn').style.background = '#6c757d';
    document.getElementById('buyLimitBtn').style.border = '0';
    this.amountOrder = 0;
    this.amountLimitOrder = 0;
    this.priceLimit = 0;
    this.priceOrder = 0;
    this.typeOrder = '';
    this.typeLimitOrder = '';
    document.getElementById('submitOrderLimitId').textContent = 'Submit (select type)';
    document.getElementById('submitOrderId').textContent = 'Submit (select type)';
  }

  getActualValueUserStock() {
    return this.getActualValueStockFromLimitOrderList(this.stockUser.amount, this.buyLimitOrder, false);
  }

  getActualValueStock(amount: number, type: string) {
    if (type === 'Sell') {
      return this.getActualValueStockFromLimitOrderList(amount, this.buyLimitOrder, true);
    }
    else {
      return this.getActualValueStockFromLimitOrderList(amount, this.sellLimitOrder, true);
    }
  }

  getActualValueStockFromLimitOrderList(amount: number, limitOrderList: OfferTableView[], isOrder: boolean) {
    if (limitOrderList.length !== 0) {
      let valueStockUser = 0;
      let amountStock = amount;
      for (const order of limitOrderList) {
        if (order.amount >= amount) {
          valueStockUser += amountStock * order.price;
          amountStock = 0;
          break;
        } else {
          valueStockUser += order.amount * order.price;
          amountStock -= order.amount;
        }
      }
      if (amountStock !== 0 && isOrder) {
        this.amountOrder -= amountStock;
        this.snackBar.open('Only ' + this.amountOrder + ' stocks are available', 'x', {
          panelClass: 'custom-css-class-warming',
          duration: 3000,
        });
      }
      return valueStockUser;
    } else {
      return 0;
    }
  }

}
