import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { StudentService } from "../../Services/students/student.service";
import { KloudNotificationService } from "../../Components/kloud-notification/kloud-notification.service";
import { ClassService } from "../../Services/class/class.service";
import { AddStudyDialogComponent } from "./add-study-dialog/add-study-dialog.component";

@Component({
  selector: 'app-study-management',
  templateUrl: './study-management.component.html',
  styleUrls: ['./study-management.component.scss']
})
export class StudyManagementComponent implements OnInit {
  apiLoading: boolean = false
  lockApiLoading: boolean = false;
  deleteApiLoading: boolean = false

  studentDataSource: any[] = [];
  selectedStudentModel: any;

  semesterDataSource: any[] = [];
  selectedSemesterModel: any;

  classesDataSource: any[] = [];
  selectedClassModel: any;

  searchForm: FormGroup = this._formBuilder.group({
    searchField: new FormControl("")
  })

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _formBuilder: FormBuilder,
    private readonly _classService: ClassService,
    private readonly _studentService: StudentService,
    private readonly _kloudNoti: KloudNotificationService
  ) { }

  ngOnInit(): void {
    this.handleGetSemester()
  }

  handleGetStudent(){
    this.apiLoading = true
    const query = {
      filter_semester: this.selectedSemesterModel,
      filter_class: this.selectedClassModel
    }

    this._studentService.getStudentsInfo(query).subscribe(
      (res: any) => {
        console.log(res);
        this.studentDataSource = res?.data
        this.apiLoading = false
      }, error => {
        this._kloudNoti.error(error)
      }
    )
  }

  handleGetSemester(){
    this.apiLoading = true
    this._classService.getSemester().subscribe(
      (res: any) => {
        this.semesterDataSource = res
        if(this.semesterDataSource?.length) this.selectedSemesterModel = this.semesterDataSource[0].semester

        this.handleGetClass()
        this.apiLoading = false
      }, error => {
        this._kloudNoti.error(error)
      }
    )
  }

  handleGetClass(){
    this.apiLoading = true
    const query = {
      semester: this.selectedSemesterModel
    }
    this._classService.handleGetClasses(query).subscribe(
      (res: any) => {
        this.classesDataSource = res?.data
        this.apiLoading = false
      }, error => {
        this._kloudNoti.error()
      }
    )
  }

  onSelectedClass(){
    this.handleGetStudent()
  }

  onSelectedSemester(){
    this.handleGetClass()
  }

  openAddClassDialog(){
    this._dialog.open(AddStudyDialogComponent, {
      width: "1360px"
    })
      .afterClosed()
      .subscribe(res => {
        if(res === 'success') console.log(res);
      })
  }

  handleSearch(){

  }

  onClickClassToggle(){

  }

}
