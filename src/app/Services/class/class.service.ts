import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { endpoints } from "../../constants/endpoints";
import { createQueryUrl } from "../../helper";

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private readonly getAllClassUrl = `${endpoints.base_url}${endpoints.get_all_class_api}`
  private readonly addNewClasUrl = `${endpoints.base_url}${endpoints.add_new_class_api}`
  private readonly updateClassUrl = `${endpoints.base_url}${endpoints.update_class_api}`
  private readonly getSemesterUrl = `${endpoints.base_url}${endpoints.get_semester_api}`
  private readonly multipleDeleteUrl = `${endpoints.base_url}${endpoints.multiple_delete_api}`
  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  handleGetClasses(query?: any){
    return this.http.get(createQueryUrl(this.getAllClassUrl, query))
  }

  handleAddClass(data:any){
    return this.http.post(this.addNewClasUrl, { data })
  }

  handleUpdateClass(ID: any, data: any){
    return this.http.put(`${this.updateClassUrl}${ID}`,data)
  }

  handleMultipleDelete(classIDs: any){
    return this.http.post(this.multipleDeleteUrl, {classIDs})
  }

  getSemester(){
    return this.http.get(this.getSemesterUrl)
  }

}
