import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Companie } from 'src/app/models/companie';
import { OfferSellBuy } from 'src/app/models/offerSellBuy';
import { OfferSellBuyLimit } from 'src/app/models/offerSellBuyLimit';
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
  limit = 0;
  typeOrder: string;
  typeLimitOrder: string;

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
  }

  getPriceOrder() {
    if (this.company.companieStatisticArray != null) {
      return this.amountOrder * this.company.companieStatisticArray[0].price;
    }
  }

  getPriceOrderLimit() {
    return this.amountLimitOrder * this.limit;
  }

  onClickSellBtn() {
    document.getElementById('sellBtn').style.border = '6px solid rgb(252 189 189)';
    document.getElementById('sellBtn').style.background = '#c52323';
    document.getElementById('buyBtn').style.border = '0';
    document.getElementById('buyBtn').style.background = '#6c757d';
    document.getElementById('submitOrderId').textContent = 'Submit sell order';
    this.typeOrder = 'Sell';
  }

  onClickBuyBtn() {
    document.getElementById('sellBtn').style.border = '0';
    document.getElementById('sellBtn').style.background = '#6c757d';
    document.getElementById('buyBtn').style.background = 'green';
    document.getElementById('buyBtn').style.border = '6px solid #b9f3b4';
    document.getElementById('submitOrderId').textContent = 'Submit buy order';
    this.typeOrder = 'Buy';
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
    const newOrder = new OfferSellBuy(null, this.amountOrder, this.getPriceOrder(), this.company, this.typeOrder);
    this.offerSellBuyService.addOffer(newOrder)
    .subscribe(
      (response) => {
        this._snackBar.open("Your order is completed", "x", {
          panelClass: 'custom-css-class-success',
          duration: 5000,
        });
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
    const newOrderLimit = new OfferSellBuyLimit(null, this.amountLimitOrder, this.limit,
      this.getPriceOrderLimit(), this.company, this.typeLimitOrder);
    this.offerSellBuyLimitService.addOfferLimit(newOrderLimit)
    .subscribe(
      (response) => {
        this._snackBar.open("Your order has been accepted", "x", {
          panelClass: 'custom-css-class-success',
          duration: 5000,
        });
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
    if (this.amountLimitOrder !== 0 && this.limit !== 0 && this.typeLimitOrder != null) {
      return true;
    }
    else {
      return false;
    }
  }
}
