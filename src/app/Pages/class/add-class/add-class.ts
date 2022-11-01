import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { KloudNotificationService } from "../../../Components/kloud-notification/kloud-notification.service";
import { ClassService } from "../../../Services/class/class.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
    selector: 'add-class-dialog',
    templateUrl: 'add-class-dialog.html',
    styleUrls: ['add-class-dialog.scss']
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
        semester: new FormControl("", [Validators.required]),
        isLock: new FormControl()
    })

    onOK(){
        if(!this.addClassForm.valid) {
            return
        }else {
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
            console.log(this.classRecordData)
            this.isNew = false
            this.addClassForm.patchValue(this.classRecordData)
        }
    }
}