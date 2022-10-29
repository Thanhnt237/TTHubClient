import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { endpoints } from "../../constants/endpoints";
import { createQueryUrl } from "../../helper";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly getAllUserUrl = `${endpoints.base_url}${endpoints.get_all_user_api}`
  private readonly addNewUserUrl = `${endpoints.base_url}${endpoints.add_new_user_api}`

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  handleGetUser(query?: any){
    return this.http.get(createQueryUrl(this.getAllUserUrl, query))
  }

  handleAddUser(data:any){
    return this.http.post(this.addNewUserUrl, { data })
  }
}
