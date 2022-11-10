import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { AddStudentDialog } from "./add-student/add-student";
import { StudentService } from "../../Services/students/student.service";
import { KloudNotificationService } from "../../Components/kloud-notification/kloud-notification.service";
import { componentKey } from "../../constants/component_key";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { exportExcel } from "../../helper";
import { ImportStudentDialog } from "./import-student/import-student-dialog";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  apiLoading: boolean = false
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
    name: "Ngày sinh",
    useFormatDateTime: true
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
    key: "className",
    name: "Lớp"
  },{
    key: "ethnic",
    name: "Tôn giáo"
  }, {
    key: "createdAt",
    name: "Ngày nhập học",
    useFormatDateTime: true
  }, {
    key: componentKey.actions_col,
    stickyEnd: true
  }]

  constructor(
      private readonly dialog: MatDialog,
      private readonly formBuilder: FormBuilder,
      private readonly studentService: StudentService,
      private readonly kloudNoti: KloudNotificationService
  ) { }

  ngOnInit(): void {
    this.handleGetAllStudents()
  }

  onClickExportExcel() {
    exportExcel(this.studentsDataSource, "student_data")
  }

  onClickOpenImportStudentDialog(){
    const dialogRef = this.dialog.open(ImportStudentDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'success') this.handleGetAllStudents()
    });
  }

  searchForm: FormGroup = this.formBuilder.group({
    searchField: new FormControl("")
  })

  async handleSearch() {
    await this.handleGetAllStudents(this.searchForm?.value?.searchField)
  }

  handleGetAllStudents(search_string?: string): void {
    let query = {
      limit: 10000000,
      page: 1,
      search_string: ""
    }
    this.apiLoading = true
    if(search_string){
      query["search_string"] = search_string
    }

    this.studentService.getStudentsInfo(query).subscribe(
      (res: any) => {
        this.studentsDataSource = res?.data?.length ? res.data.map((item: any) => ({
          ...item,
          className: item?.class?.name ? item.class.name : ""
        })) : []
        this.apiLoading = false
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
