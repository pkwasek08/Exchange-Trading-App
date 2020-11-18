import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from 'src/app/models/company';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl + 'user';

  constructor(private http: HttpClient) {
  }

  public getUser(): User {
    const localStorageItem = JSON.parse(localStorage.getItem('user'));
    return localStorageItem === null ? null : localStorageItem.user;
  }

  public doRegistration(user: User) {
    return this.http.post(this.apiUrl, user);
  }

  public doLogin(email: string, password: string) {
    const params = new HttpParams().set('email', email).set('password', password);
    return this.http.get<User>(this.apiUrl + '/login?' + params);

  }

  public setLoggedUser(user: User) {
    this.setUser(user);
  }

  public isLoggedUser(): boolean {
    return (this.getUser() != null);
  }

  public updateUserCash() {
    this.http.get<User>(this.apiUrl + '/' + this.getUser().id).subscribe(user => {
      this.setUser(user);
    });
    return this.getUser();
  }

  public setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify({ user: user }));
  }

  public getSelectedCompany(){
    const localStorageItem = JSON.parse(localStorage.getItem('selectedCompany'));
    return localStorageItem === null ? null : localStorageItem.selectedCompany;
  }

  public setSelectedCompany(selectedCompany: Company){
    localStorage.setItem('selectedCompany', JSON.stringify({ selectedCompany: selectedCompany }));
  }

  public signOutUser(){
    localStorage.removeItem('user');
  }

}
