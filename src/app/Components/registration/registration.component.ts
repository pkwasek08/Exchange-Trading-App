import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User;
  status: string;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  lastnameFormControl = new FormControl('', [
    Validators.required
  ]);
  birthdayFormControl = new FormControl(null, [
    Validators.required
  ]);
  countryFormControl = new FormControl('', [
    Validators.required
  ]);
  loginFormControl = new FormControl('', [
    Validators.required
  ]);
  securityCodeFormControl = new FormControl(null, [
    Validators.required,
    Validators.pattern('[1-9]*'),
    Validators.maxLength(8)
  ]);
  constructor(
    private dialogRef: MatDialogRef<RegistrationComponent>,
    private userService: UserService,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  login() {
    this.user = new User(null, this.nameFormControl.value, this.lastnameFormControl.value, this.birthdayFormControl.value, new Date(),
      this.emailFormControl.value, this.loginFormControl.value, this.passwordFormControl.value);
    this.doRegistration();
    this.dialogRef.close();
  }

  doRegistration(): void {
    this.userService.doRegistration(this.user)
      .subscribe(
        (response) => {
          this._snackBar.open("Successed registration", "x", {
            panelClass: 'custom-css-class-success',
            duration: 5000,
          });
        },
        (error) => {
          this._snackBar.open(error.status + " error", "x", {
            panelClass: 'custom-css-class-error',
            duration: 5000,
          });
        }
      )
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  close() {
    this.dialogRef.close();
  }

  isValid(): boolean {
    if (this.emailFormControl.valid && this.passwordFormControl.valid && this.loginFormControl.valid
      && this.nameFormControl.valid && this.birthdayFormControl.valid
      && this.lastnameFormControl.valid) {
      return true;
    }
    return false;
  }


}
