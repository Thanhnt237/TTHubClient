import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { AddStudentDialog } from "./add-student/add-student";
import { StudentService } from "../../Services/students/student.service";
import { KloudNotificationService } from "../../Components/kloud-notification/kloud-notification.service";
import { keys } from "../../constants/keys";
import { componentKey } from "../../constants/component_key";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  lockApiLoading: boolean = false;
  deleteApiLoading: boolean = false

  studentsDataSource: any

  displayedColumn = [{
    key: componentKey.check_box_col
  },{
    key: "tenant_code",
    name: "Mã học sinh"
  },{
    key: "name",
    name: "Họ và tên"
  },{
    key: "DoB",
    name: "Ngày sinh"
  },{
    key: "gender",
    name: "Giới tính"
  },{
    key: "address",
    name: "Địa chỉ"
  },{
    key: "religion",
    name: "Dân tộc"
  },{
    key: "ethnic",
    name: "Tôn giáo"
  }, {
    key: "joinDate",
    name: "Ngày nhập học"
  }, {
    key: componentKey.actions_col,
    stickyEnd: true
  }]

  constructor(
      private readonly dialog: MatDialog,
      private readonly studentService: StudentService,
      private readonly kloudNoti: KloudNotificationService
  ) { }

  ngOnInit(): void {
    this.handleGetAllStudents()
  }

  handleGetAllStudents(search_string?: string): void {
    let query = {
      limit: 10000000,
      page: 1,
      search_string: ""
    }

    if(search_string){
      query["search_string"] = search_string
    }

    this.studentService.getStudentsInfo().subscribe(
      (res: any) => {
        this.studentsDataSource = res.data
      }, (error) => {
        this.kloudNoti.error(error)
      })
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(AddStudentDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'success') this.handleGetAllStudents()
    });
  }

  handleClickedRow(record: any){

  }

  handleClickEditRecord(record: any){
    const dialogRef = this.dialog.open(AddStudentDialog, {
      data: record
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'success') this.handleGetAllStudents()
    });
  }

  handleClickDeleteRecord(record: any){

  }

  handleClickLockRecord(record: any){

  }

}
