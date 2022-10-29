import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { endpoints } from "../../constants/endpoints";
import { createQueryUrl } from "../../helper";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly getAllStudentUrl = `${endpoints.base_url}${endpoints.get_all_student_information}`
  private readonly addStudentUrl = `${endpoints.base_url}${endpoints.add_new_student_information}`
  private readonly updateStudentUrl = `${endpoints.base_url}${endpoints.update_student_information}`

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  getStudentsInfo(query?: any) {
    return this.http.get(createQueryUrl(this.getAllStudentUrl, query))
  }

  addStudentInfo(body: any){
    return this.http.post(this.addStudentUrl, { data: body })
  }

  updateStudentInfo(body: any){
    return this.http.post(this.updateStudentUrl, body)
  }

}
