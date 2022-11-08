import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { KloudNotificationService } from "../../../Components/kloud-notification/kloud-notification.service";
import { ClassService } from "../../../Services/class/class.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from "@angular/material-moment-adapter";
import * as moment from "moment-timezone";

export const MY_FORMATS = {
    parse: {
        dateInput: 'YYYY',
    },
    display: {
        dateInput: 'YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY',
    },
};

@Component({
    selector: 'add-class-dialog',
    templateUrl: 'add-class-dialog.html',
    styleUrls: ['add-class-dialog.scss'],
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
export class AddClassDialog implements OnInit{

    apiLoading: boolean = false

    isNew: boolean = true

    constructor(
      private dialogRef: MatDialogRef<AddClassDialog>,
      private _formBuilder: FormBuilder,
      private _router: Router,
      private _kloudNoti: KloudNotificationService,
      private classService: ClassService,
      @Inject(MAT_DIALOG_DATA) public classRecordData: any
    ) {
        this.apiLoading = false
    }

    addClassForm: FormGroup = this._formBuilder.group({
        name : new FormControl("", [Validators.required]),
        classCode: new FormControl("", [Validators.maxLength(50)]),
        semester: new FormControl(""),
        isLock: new FormControl()
    })

    semesterPickerForm: FormGroup = this._formBuilder.group({
        start: new FormControl(moment().year(), [Validators.required]),
        end: new FormControl(moment().year(), [Validators.required])
    })

    onOK(){
        if(
          !this.addClassForm.valid ||
          !this.semesterPickerForm.valid
        ) {
            return
        }else {
            this.addClassForm.patchValue({
                semester: `${this.semesterPickerForm.value.start.format('YYYY')}-${this.semesterPickerForm.value.end.format('YYYY')}`
            })

            if(this.isNew){
                this.apiLoading = true
                this.handleAddClass()
            }else{
                this.apiLoading = true
                this.handleEditClass()
            }
        }
    }

    handleAddClass(){
        this.classService.handleAddClass([this.addClassForm.value]).subscribe(
          res => {
              this._kloudNoti.success("Thêm mới lớp học thành công")
              this.apiLoading = false
              this.dialogRef.close()
          },
          err => {
              this._kloudNoti.error(err)
              this.apiLoading = false
          }
        )
    }

    handleEditClass(){
        this.classService.handleUpdateClass(this.classRecordData.ID, this.addClassForm.value).subscribe(
          (res:any) => {
              this._kloudNoti.success("Chỉnh sửa lớp học thành công")
              this.apiLoading = false
              this.dialogRef.close()
          }, err => {
              this._kloudNoti.error(err)
              this.apiLoading = false
          }
        )
    }

    ngOnInit(): void {
        if(this.classRecordData){
            this.isNew = false
            this.addClassForm.patchValue(this.classRecordData)

            let semester = this.classRecordData.semester.split("-")
            this.semesterPickerForm.patchValue({
                start: moment(semester[0]),
                end: moment(semester[1])
            })
        }
    }
}