import { Injectable } from '@angular/core';
import { endpoints } from "../../constants/endpoints";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { createQueryUrl } from "../../helper";

@Injectable({
  providedIn: 'root'
})
export class BusManagementService {

  private readonly getAllUrl = `${endpoints.base_url}${endpoints.get_all_bus_management_api}`
  private readonly registerNewUrl = `${endpoints.base_url}${endpoints.register_new_bus_management_api}`

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  getAll(query?: any){
    return this.http.get(createQueryUrl(this.getAllUrl, query))
  }

  registerNewBusManagement(body:any){
    return this.http.post(this.registerNewUrl, body)
  }
}
