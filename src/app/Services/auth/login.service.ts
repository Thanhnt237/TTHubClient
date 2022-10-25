import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { endpoints } from "../../constants/endpoints";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly loginUrl = `${endpoints.base_url}${endpoints.login_api}`

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  login(data: any){
    return this.http.post(this.loginUrl, data)
  }
}
