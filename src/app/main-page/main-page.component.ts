import { Component, OnInit, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
              public userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.setCompanyTable();
  }


  setCompanyTable(){
    this.router.navigateByUrl('/company');
    this.closeNav();
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

  isLoggedAdmin(): boolean {
    return this.userService.isLoggedAdmin();
  }

  getLoggedUser(): User {
    return this.userService.getUser();
  }

  onClickSignOut(){
    this.userService.signOutUser();
    this.snackBar.open("Successful sign out", "x", {
      panelClass: 'custom-css-class-success',
      duration: 3000,
    });
  }
}
