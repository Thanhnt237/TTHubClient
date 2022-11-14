import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { KloudNotificationService } from "../../../Components/kloud-notification/kloud-notification.service";
import { UsersService } from "../../../Services/users/users.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AddClassDialog } from "../../class/add-class/add-class";

enum RoleEnum{
  SuperAdmin = "SUPER_ADMIN",
  Admin = "ADMIN",
  Manager = "MANAGER",
  Teacher = "TEACHER",
  Driver = "DRIVER",
  Student = "STUDENT",
  Member = "MEMBER"
}

@Component({
  selector: 'add-user-dialog',
  templateUrl: 'add-user-dialog.html',
  styleUrls: ['add-user-dialog.scss']
})
export class AddUserDialog implements OnInit{
  isNew: boolean = true
  apiLoading: boolean = false

  listRole = RoleEnum

  constructor(
    private dialogRef: MatDialogRef<AddClassDialog>,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _kloudNoti: KloudNotificationService,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public userRecordData: any
  ) {
  }

  ngOnInit(
  ) {
    this.apiLoading = false
    if(this.userRecordData){
      this.isNew = false
      this.addUserForm.patchValue(this.userRecordData)
    }

  }

  addUserForm: FormGroup = this._formBuilder.group({
    name : new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    role: new FormControl(this.listRole.Member)
  })

  onOK(){
    if(!this.addUserForm.valid) {
      return
    }else {
      this.apiLoading = true
      // console.log(this.addUserForm.value)
      this.handleAddUser()
    }
  }

  handleAddUser(){
    this.userService.handleAddUser([this.addUserForm.value]).subscribe(
      (res: any) => {
        this._kloudNoti.success("Thêm mới người dùng thành công")
        this.apiLoading = false
        this.dialogRef.close('success')
      }, err => {
        this._kloudNoti.error(err)
        this.apiLoading = false
      }
    )
  }

}