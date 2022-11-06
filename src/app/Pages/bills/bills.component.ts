import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { BillDialog } from "./dialog/crud/bill-dialog";
import { FormGroup } from "@angular/forms";
import { StudentService } from "../../Services/students/student.service";
import * as moment from "moment";

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {
  displayColumn = [{
    key: ""
  }]

  constructor(
    private readonly dialog: MatDialog,
    private readonly studentService: StudentService,
  ) { }

  studentInformation: any
  studentFilter: any

  ngOnInit(): void {

  }

  openDialog(){
    this.dialog.open(BillDialog)
  }

  handleGetAllStudent(search_string?: string): void {
    let query = {
      limit: 5,
      page: 1,
      search_string
    }

    this.studentService.getStudentsInfo(query).subscribe(
      (res: any) => {
        this.studentInformation = res.data
      }, error => {

      }
    )
  }

  onGetStudentInfo(): void{
    if(!this.studentInformation){
      this.handleGetAllStudent()
    }
  }

  onSearchStudentInfoChange($event: any){

  }

  onSelectionStudentFilterChange(){
    console.log(this.studentFilter)
  }

}
