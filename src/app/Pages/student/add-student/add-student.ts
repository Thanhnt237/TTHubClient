import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AddClassDialog } from "../../class/add-class/add-class";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { KloudNotificationService } from "../../../Components/kloud-notification/kloud-notification.service";
import { StudentService } from "../../../Services/students/student.service";
import { ClassService } from "../../../Services/class/class.service";
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment-timezone'

export const MY_FORMATS = {
    parse: {
        dateInput: 'DDMMYYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};


@Component({
    selector: 'add-student-dialog',
    templateUrl: 'add-student-dialog.html',
    styleUrls: ['add-student.scss'],
    providers: [{
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE]
    }, {
        provide: MAT_DATE_FORMATS,
        useValue: MY_FORMATS
    }]
})

export class AddStudentDialog implements OnInit{

    apiLoading: boolean = false;

    isNew: boolean = true

    classDataSource: any

    constructor(
      private dialogRef: MatDialogRef<AddClassDialog>,
      private _formBuilder: FormBuilder,
      private _router: Router,
      private _kloudNoti: KloudNotificationService,
      private studentService: StudentService,
      private classService: ClassService,
      @Inject(MAT_DIALOG_DATA) public studentRecordData: any
    ) {
    }

    ngOnInit() {
        this.handleGetClass()
        if(this.studentRecordData){
            this.isNew = false;
            this.handlePatchValueToForm()
        }
    }

    handlePatchValueToForm(){
        this.studentInfoForm.patchValue(this.studentRecordData)
        this.fatherInfoForm.patchValue(this.studentRecordData.father_information)
        this.motherInfoForm.patchValue(this.studentRecordData.mother_information)
        this.classInfoForm.patchValue(this.studentRecordData.class)
    }

    handleGetClass(){
        this.classService.handleGetClasses({limit: 100000}).subscribe(
          (res: any) => {
              this.classDataSource = res.data
          }, err => {

          }
        )
    }

    studentInfoForm: FormGroup = this._formBuilder.group({
        DoB: new FormControl("", [Validators.required]),
        address: new FormControl("", [Validators.required]),
        ethnic: new FormControl("", ),
        gender: new FormControl("", [Validators.required]),
        name: new FormControl("", [Validators.required]),
        religion: new FormControl("", ),
        tenant_code: new FormControl(""),
        isLock: new FormControl(false, [Validators.required])
    })

    fatherInfoForm: FormGroup = this._formBuilder.group({
        DoB: new FormControl(),
        email: new FormControl(),
        phone: new FormControl(),
        ethnic: new FormControl(),
        religion: new FormControl(),
        job: new FormControl(),
        name: new FormControl(),
        national_identifier: new FormControl(),
        national_identifier_provide_date: new FormControl()
    })

    motherInfoForm: FormGroup = this._formBuilder.group({
        DoB: new FormControl(),
        email: new FormControl(),
        phone: new FormControl(),
        ethnic: new FormControl(),
        religion: new FormControl(),
        job: new FormControl(),
        name: new FormControl(),
        national_identifier: new FormControl(),
        national_identifier_provide_date: new FormControl()
    })

    classInfoForm: FormGroup = this._formBuilder.group({
        ID: new FormControl()
    })

    onOK(){
        if(
          !this.studentInfoForm.valid ||
          !this.motherInfoForm.valid ||
          !this.fatherInfoForm.valid ||
          !this.classInfoForm.valid
        ){
            this._kloudNoti.warn('Vui lòng nhập đủ thông tin')
            return
        }else{
            let finalForm = {
                ...this.studentInfoForm.value,
                father_information: this.fatherInfoForm.value,
                mother_information: this.motherInfoForm.value,
                class: this.classInfoForm.value
            }

            if(this.isNew){
                this.handleAddNewStudentInformation(finalForm)
            }else{
                this.handleUpdateStudentInformation(finalForm)
            }

        }
    }

    handleAddNewStudentInformation(finalForm: any){
        this.studentService.addStudentInfo([finalForm]).subscribe(
          (res: any) => {
              this._kloudNoti.success("Thêm mới người dùng thành công")
              this.apiLoading = false
              this.dialogRef.close('success')
          }, err => {
              console.log(err)
              this._kloudNoti.error(err)
              this.apiLoading = false
          }
        )
    }

    handleUpdateStudentInformation(finalForm: any){
        this.studentService.updateStudentInfo(finalForm).subscribe(
          res => {
              this._kloudNoti.success("Thêm mới người dùng thành công")
              this.apiLoading = false
              this.dialogRef.close('success')
          }, error => {
              console.log(error)
              this._kloudNoti.error(error)
              this.apiLoading = false
          }
        )
    }

}