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

  timeout = 1000;

  constructor(
    private readonly dialog: MatDialog,
    private readonly studentService: StudentService,
  ) { }

  studentInformation: any
  studentFilter: any

  ngOnInit(): void {
    // this.handleGetAllStudent()
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
    clearTimeout(this.timeout)

    this.timeout = setTimeout(() => {
      this.handleGetAllStudent($event)
    }, 500);

  }

  onSelectionStudentFilterChange(){
    console.log(this.studentFilter)
  }

}
