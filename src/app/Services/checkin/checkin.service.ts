import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { endpoints } from "../../constants/endpoints";
import { createQueryUrl } from "../../helper";

@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  private readonly getAllCheckinUrl = `${endpoints.base_url}${endpoints.get_all_checkin_api}`
  private readonly checkinUrl = `${endpoints.base_url}${endpoints.student_checkin}`

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  getAll(query?: any){
    return this.http.get(createQueryUrl(this.getAllCheckinUrl, query))
  }

  studentCheckin(body:any){
    return this.http.post(this.checkinUrl, body)
  }

}
