import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { keys } from "../../constants/keys";
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  loggedIn() {
    return !!localStorage.getItem(keys.token_key);
  }

  doLogout(){
    localStorage.removeItem(keys.token_key);
    this._router.navigate(['/login']);
  }

  getToken(){
    return localStorage.getItem(keys.token_key);
  }

  setToken(token: any){
    localStorage.setItem(keys.token_key, token)
  }
}