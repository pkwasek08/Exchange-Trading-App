import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { StockUserTableView } from 'src/app/models/stockUserTableView';
import { User } from 'src/app/models/user';
import { StockService } from 'src/app/services/stock/stock.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedUser: User;
  stockUserList: StockUserTableView[];
  constructor(private userService: UserService,
    private stockService: StockService) {
  }

  ngOnInit(){
    this.loggedUser = this.userService.loggedUser;
    this.stockService.getStockByUserIdTableView(this.loggedUser.id).subscribe(stockList => this.stockUserList = stockList);
  }

  getProfit() {
    let profit = 0;
    if (this.stockUserList != null) {
      this.stockUserList.forEach(stock => profit += stock.purchase);
    }
    return profit;
  }
}
