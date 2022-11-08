import { Component, Inject, OnInit } from "@angular/core";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from "@angular/material-moment-adapter";
import { MY_FORMATS } from "../../class/add-class/add-class";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { KloudNotificationService } from "../../../Components/kloud-notification/kloud-notification.service";
import { StudentService } from "../../../Services/students/student.service";
import * as moment from "moment-timezone";

@Component({
  selector: 'bus-register',
  templateUrl: 'bus-register-dialog.html',
  styleUrls: ['bus-register-dialog.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS
    },
  ]
})
export class BusRegisterDialog implements OnInit{
  driverDataSource: any;
  studentDataSource: any;

  apiLoading: boolean = false

  isNew: boolean = true

  constructor(
    private readonly dialogRef: MatDialogRef<BusRegisterDialog>,
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _kloudNoti: KloudNotificationService,
    private readonly studentService: StudentService,
    @Inject(MAT_DIALOG_DATA) public readonly busRegisterData: any
  ) {
  }

  semesterFilter = new FormControl("")

  ngOnInit(): void {
    if(this.busRegisterData){
      this.driverDataSource = this.busRegisterData?.allDriver ? this.busRegisterData.allDriver : []
    }

    this.handleGetAllStudent()
  }

  handleGetAllStudent(){
    this.studentService.getStudentsInfo().subscribe(
      (res: any) => {
        this.studentDataSource = res.data
      }, error => {
        this._kloudNoti.error(error)
      }
    )
  }

  onOK(){

  }


}