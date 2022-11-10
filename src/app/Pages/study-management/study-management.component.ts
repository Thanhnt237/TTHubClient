import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { StudentService } from "../../Services/students/student.service";
import { KloudNotificationService } from "../../Components/kloud-notification/kloud-notification.service";
import { ClassService } from "../../Services/class/class.service";

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
    this.handleGetClass()
  }

  handleGetStudent(){
    this._studentService.getStudentsInfo().subscribe(
      (res: any) => {
        this.studentDataSource = res.data
      }, error => {
        this._kloudNoti.error(error)
      }
    )
  }

  handleGetSemester(){

  }

  handleGetClass(){
    this._classService.handleGetClasses().subscribe(
      (res: any) => {
        console.log(res);
      }, error => {
        this._kloudNoti.error()
      }
    )
  }

  handleSearch(){

  }

  onClickClassToggle(){

  }

}
