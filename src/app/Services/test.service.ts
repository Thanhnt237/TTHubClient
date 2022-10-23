import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  readonly testURL = 'http://localhost:8080/api/resources/users/getAllUsers'

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  test(){
    return this.http.get<any>(this.testURL)
  }
}