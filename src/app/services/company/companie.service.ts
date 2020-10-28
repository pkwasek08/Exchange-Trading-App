import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Companie } from '../../models/companie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanieService {
apiUrl = environment.apiUrl + 'companie';

  constructor(private _http: HttpClient) { }

  getCompanies(){
    return this._http.get<Companie[]>(this.apiUrl);
  }
}
