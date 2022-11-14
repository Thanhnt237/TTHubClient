import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { AddStudentDialog } from "./add-student/add-student";
import { StudentService } from "../../Services/students/student.service";
import { KloudNotificationService } from "../../Components/kloud-notification/kloud-notification.service";
import { componentKey } from "../../constants/component_key";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { exportExcel } from "../../helper";
import { ImportStudentDialog } from "./import-student/import-student-dialog";
import { uniqBy } from 'lodash'
import { ClassService } from "../../Services/class/class.service";
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  apiLoading: boolean = false
  lockApiLoading: boolean = false;
  deleteApiLoading: boolean = false

  multipleSelectedRows: any[] = []

  genderFilterModel: string = "";

  classFilterModel: any
  classFilterDataSource: any = []

  semesterFilterModel: any
  semesterFilterDataSource: any = []

  rawStudentDataSource: any = []
  studentsDataSource: any = []

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
  },
  //   {
  //   key: "ethnic",
  //   name: "Tôn giáo"
  // }, {
  //   key: "createdAt",
  //   name: "Ngày nhập học",
  //   useFormatDateTime: true
  // },
    {
    key: componentKey.actions_col,
    stickyEnd: true
  }]

  constructor(
      private readonly dialog: MatDialog,
      private readonly formBuilder: FormBuilder,
      private readonly studentService: StudentService,
      private readonly _classService: ClassService,
      private readonly kloudNoti: KloudNotificationService
  ) { }

  ngOnInit(): void {
    this.handleGetSemester()
  }

  handleGetSemester(){
    this._classService.getSemester().subscribe(
      (res: any) => {
        this.semesterFilterDataSource = res
        if(this.semesterFilterDataSource.length) this.semesterFilterModel = this.semesterFilterDataSource[0].semester
        this.handleGetClass()
      }, error => {
        this.kloudNoti.error()
      }
    )
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
      search_string: "",
      filter_class: this.classFilterModel ? this.classFilterModel : "",
      filter_semester: this.semesterFilterModel ? this.semesterFilterModel : ""
    }

    this.apiLoading = true
    if(search_string){
      query["search_string"] = search_string
    }

    this.studentService.getStudentsInfo(query).subscribe(
      (res: any) => {
        this.rawStudentDataSource = this.studentsDataSource = res?.data?.length ? res.data.map((item: any) => ({
          ...item,
          className: item?.class?.name ? item.class.name : "",
          gender: this.convertGender(item.gender)
        })) : []

        this.apiLoading = false
      }, (error) => {
        this.kloudNoti.error(error)
      })
  }

  convertGender(gender: string){
    switch (gender){
      case "nam":
        return "Nam";
      case "nu":
        return "Nữ";
      case "Nam":
        return "nam";
      case "Nữ":
        return 'nu';
      default:
        return "";
    }
  }

  handleGetClass() {
    const query = {
      semester: this.semesterFilterModel
    }

    this._classService.handleGetClasses(query)
      .subscribe(
        (res: any) => {
          this.classFilterDataSource = res.data
          this.handleGetAllStudents()
        }, error => {
          this.kloudNoti.error(error)
        }
      )
  }

  onChangeSelectClass(record: any){
    this.handleGetAllStudents()
  }

  onChangeSelectSemester(){
    this.classFilterModel = null;
    this.genderFilterModel = ""
    this.handleGetClass()
  }

  onChangeSelectGender(){
    console.log(this.rawStudentDataSource);
    if(this.genderFilterModel) this.studentsDataSource = this.rawStudentDataSource.filter((c: any) => c.gender === this.genderFilterModel)
      else this.studentsDataSource = this.rawStudentDataSource.slice()
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
    const dialogData = JSON.parse(JSON.stringify(record))

    dialogData.gender = this.convertGender(record.gender)

    const dialogRef = this.dialog.open(AddStudentDialog, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'success') this.handleGetAllStudents()
    });
  }

  resetAllFilter(){

  }

  handleClickDeleteRecord(record: any){
    this.apiLoading = true

    this.studentService.updateStudentInfo({
      ID: record.ID,
      isActive: false
    }).subscribe(
      (res: any) => {
        this.kloudNoti.success("Xóa thành công")
        this.handleGetAllStudents()
        this.apiLoading = false
      }, error => {
        this.kloudNoti.error(error)
      }
    )
  }

  handleClickLockRecord(record: any){
    this.apiLoading = true

    this.studentService.updateStudentInfo({
      ID: record.ID,
      isLock: !record.isLock
    }).subscribe(
      (res: any) => {
        this.kloudNoti.success("Khóa thành công")
        this.handleGetAllStudents()
        this.apiLoading = false
      }, error => {
        this.kloudNoti.error(error)
      }
    )
  }

  handleSelectedRows(record: any){
    this.multipleSelectedRows = record
  }

  handleMultipleDelete(){
    console.log(this.multipleSelectedRows);
  }

}
