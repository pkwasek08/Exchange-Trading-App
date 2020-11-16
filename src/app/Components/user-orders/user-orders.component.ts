import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OfferSellBuy } from 'src/app/models/offerSellBuy';
import { OfferSellBuyLimit } from 'src/app/models/offerSellBuyLimit';
import { User } from 'src/app/models/user';
import { OfferSellBuyService } from 'src/app/services/offerSellBuy/offer-sell-buy.service';
import { OfferSellBuyLimitService } from 'src/app/services/offerSellBuyLimit/offer-sell-buy-limit.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  offers: OfferSellBuy[];
  offersLimit: OfferSellBuyLimit[];
  loggedUser: User;
  offerHistoryPageSize = 10;
  offerHistoryPageIndex = 0;
  offerHistoryPageNumber = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  constructor(private offerSellBuyService: OfferSellBuyService,
    private offerSellBuyLimitService: OfferSellBuyLimitService,
    private userService: UserService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loggedUser = this.userService.getUser();
    this.offerSellBuyLimitService.getOffersLimitByUserId(this.loggedUser.id).subscribe(offersLimitList => {
      this.offersLimit = offersLimitList;
    });
    this.offerSellBuyService.getOffersByUserId(this.loggedUser.id, 0, this.offerHistoryPageSize).subscribe(offersList => {
      this.offerHistoryPageNumber = offersList['totalElements'];
      this.offers = offersList['content'];
    });
  }

  getPurchase(amount: number, price: number): number {
    return amount * price;
  }

  onClickHistory() {
    document.getElementById('offersLimitBtnId').className = 'btn btn-secondary';
    document.getElementById('historyBtnId').className = 'btn btn-primary';
    document.getElementById('limitOffersTabled').style.display = 'none';
    document.getElementById('offersTableId').style.display = '';
  }

  onClickLimitOffers() {
    document.getElementById('offersLimitBtnId').className = 'btn btn-primary';
    document.getElementById('historyBtnId').className = 'btn btn-secondary';
    document.getElementById('limitOffersTabled').style.display = '';
    document.getElementById('offersTableId').style.display = 'none';
  }

  onClickRemove(offerLimitId: number) {
    this.offerSellBuyLimitService.removeOfferLimit(offerLimitId).subscribe(
      (response) => {
        this._snackBar.open("The offer has been removed", "x", {
          panelClass: 'custom-css-class-success',
          duration: 5000,
        });
        this.offerSellBuyLimitService.getOffersLimitByUserId(this.loggedUser.id).subscribe(offersLimitList => {
          this.offersLimit = offersLimitList;
        });
      },
      (error) => {
        this._snackBar.open(error.status + " error :(", "x", {
          panelClass: 'custom-css-class-error',
          duration: 5000,
        });
      }
    );
  }

  setHistoryOfferPage(event?: PageEvent) {
    this.offerSellBuyService.getOffersByUserId(this.loggedUser.id, event.pageIndex, event.pageSize)
      .subscribe(page => {
        this.offers = page['content'];
        this.offerHistoryPageNumber = page['totalElements'];
        this.offerHistoryPageIndex = page['number'];
        this.offerHistoryPageSize = page['size'];
      });
    return event;
  }
}
