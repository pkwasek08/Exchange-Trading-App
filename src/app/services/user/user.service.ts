import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedUser: User;
  apiUrl = environment.apiUrl + 'user';

  constructor(private http: HttpClient) {
    this.loggedUser = null;
  }

  public doRegistration(user: User) {
    return this.http.post(this.apiUrl, user);
  }

  public doLogin(email: string, password: string) {
    const params = new HttpParams().set('email', email).set('password', password);
    return this.http.get<User>(this.apiUrl + '/login?' + params);

  }

  public setLoggedUser(user: User) {
    this.loggedUser = user;
  }

  public isLoggedUser(): boolean {
    return (this.loggedUser != null);
  }
}
