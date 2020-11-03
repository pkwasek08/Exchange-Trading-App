import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Companie } from 'src/app/models/companie';
import { OfferSellBuy } from 'src/app/models/offerSellBuy';
import { OfferSellBuyLimit } from 'src/app/models/offerSellBuyLimit';
import { OfferTableView } from 'src/app/models/offerTableView';
import { User } from 'src/app/models/user';
import { CompanieStatisticService } from 'src/app/services/companieStatistic/companie-statistic.service';
import { OfferSellBuyService } from 'src/app/services/offerSellBuy/offer-sell-buy.service';
import { OfferSellBuyLimitService } from 'src/app/services/offerSellBuyLimit/offer-sell-buy-limit.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sell-buy',
  templateUrl: './sell-buy.component.html',
  styleUrls: ['./sell-buy.component.css']
})
export class SellBuyComponent implements OnInit {

  loggedUser: User;
  company: Companie;
  amountOrder = 0;
  amountLimitOrder = 0;
  priceLimit = 0;
  typeOrder: string;
  typeLimitOrder: string;
  sellLimitOrder: OfferTableView[];
  buyLimitOrder: OfferTableView[];
  priceOrder = 0;

  constructor(private userService: UserService,
              private companieStatisticService: CompanieStatisticService,
              private offerSellBuyService: OfferSellBuyService,
              private offerSellBuyLimitService: OfferSellBuyLimitService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.company = this.userService.selectedCompanie;
    this.companieStatisticService.getCompanieStatisticByCompanieId(this.company.id).
      subscribe(companieStatisticList => this.company.companieStatisticArray = companieStatisticList);
    this.loggedUser = this.userService.loggedUser;
    this.offerSellBuyLimitService.getOffersSellLimitByCompanieId(this.company.id).subscribe(order => this.sellLimitOrder = order);
    this.offerSellBuyLimitService.getOffersBuyLimitByCompanieId(this.company.id).subscribe(order => this.buyLimitOrder = order);
  }

  updatePriceOrder() {
    if (this.typeOrder === 'Sell') {
      if (this.buyLimitOrder.length !== 0) {
        this.priceOrder = this.amountOrder * this.buyLimitOrder[0].price;
      }
    }
    if (this.typeOrder === 'Buy') {
      if (this.sellLimitOrder.length !== 0) {
        this.priceOrder = this.amountOrder * this.sellLimitOrder[0].price;
      }
    }
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

  onClickSubmitBtn() {
    if(this.priceOrder === 0){
      this._snackBar.open("No offers", "x", {
        panelClass: 'custom-css-class-success',
        duration: 5000,
      });
      return ;
    }
    const newOrder = new OfferSellBuy(null, this.amountOrder, this.priceOrder, this.company,
      this.loggedUser, this.typeOrder, new Date());
    this.offerSellBuyService.addOffer(newOrder)
      .subscribe(
        (response) => {
          this._snackBar.open("Your order is completed", "x", {
            panelClass: 'custom-css-class-success',
            duration: 5000,
          });
          this.updateData();
        },
        (error) => {
          this._snackBar.open(error.status + " error :(", "x", {
            panelClass: 'custom-css-class-error',
            duration: 5000,
          });
        }
      )
  }

  onClickSubmitLimitBtn() {
    const newOrderLimit = new OfferSellBuyLimit(null, this.amountLimitOrder, this.priceLimit,
      this.priceLimit, this.company, this.loggedUser, this.typeLimitOrder, new Date(), true);
    this.offerSellBuyLimitService.addOfferLimit(newOrderLimit)
      .subscribe(
        (response) => {
          this._snackBar.open("Your order has been accepted", "x", {
            panelClass: 'custom-css-class-success',
            duration: 5000,
          });
          this.updateData();
        },
        (error) => {
          this._snackBar.open(error.status + " error :(", "x", {
            panelClass: 'custom-css-class-error',
            duration: 5000,
          });
        }
      )
  }

  isValidOrder(): boolean {
    if (this.amountOrder !== 0 && this.typeOrder != null) {
      return true;
    }
    else {
      return false;
    }
  }

  isValidOrderLimit(): boolean {
    if (this.amountLimitOrder !== 0 && this.priceLimit !== 0 && this.typeLimitOrder != null) {
      return true;
    }
    else {
      return false;
    }
  }

  updateUserCash() {
    this.loggedUser = this.userService.updateUserCash();
  }

  updateData() {
    this.loggedUser = this.userService.updateUserCash();
    this.companieStatisticService.getCompanieStatisticByCompanieId(this.company.id).
      subscribe(companieStatisticList => this.company.companieStatisticArray = companieStatisticList);
    this.offerSellBuyLimitService.getOffersSellLimitByCompanieId(this.company.id).subscribe(order => this.sellLimitOrder = order);
    this.offerSellBuyLimitService.getOffersBuyLimitByCompanieId(this.company.id).subscribe(order => this.buyLimitOrder = order);
  }
}
