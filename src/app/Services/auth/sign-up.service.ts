import { Injectable } from '@angular/core';
import { endpoints } from "../../constants/endpoints";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private readonly signUpUrl = `${endpoints.base_url}${endpoints.signUp_api}`

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  signUp(data: any){
    return this.http.post(this.signUpUrl, data)
  }
}
