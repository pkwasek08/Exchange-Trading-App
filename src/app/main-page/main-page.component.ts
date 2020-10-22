import { Component, OnInit, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../Components/login/login.component';
import { RegistrationComponent } from '../Components/registration/registration.component';
import { User } from '../models/user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  constructor(private dialog: MatDialog,
    public userService: UserService) { }

  ngOnInit(): void {
  }



  openDialogLogin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(LoginComponent, dialogConfig);
  }

  openDialogReg() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(RegistrationComponent, dialogConfig);
  }

  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
    document.getElementById('main').style.opacity = '0.8';

  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0px';
    document.getElementById('main').style.opacity = '1';
  }

  isLoggedUser(): boolean {
    return this.userService.isLoggedUser();
  }

  getLoggedUser(): User {
    return this.userService.loggedUser;
  }
}
