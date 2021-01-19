import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../../models/company';
import { environment } from 'src/environments/environment';
import { CompanyInfo } from 'src/app/models/companyInfo';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
apiUrl = environment.apiUrl + 'company';

  constructor(private http: HttpClient) { }

  getCompanies(){
    return this.http.get<Company[]>(this.apiUrl);
  }

  getCompaniesInfo(){
    return this.http.get<CompanyInfo[]>(this.apiUrl + "/simpleInfoList");
  }
}
