import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { endpoints } from "../../constants/endpoints";

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private readonly getAllClassUrl = `${endpoints.base_url}`

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  handleGetClasses(){
    return this.http.get(this.getAllClassUrl)
  }

  handleAddClass(){

  }

  handleUpdateClass(){

  }

}
