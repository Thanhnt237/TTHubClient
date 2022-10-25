import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { KloudNotificationService } from "../../../Components/kloud-notification/kloud-notification.service";
import { UsersService } from "../../../Services/users/users.service";

@Component({
  selector: 'add-user-dialog',
  templateUrl: 'add-user-dialog.html',
})
export class AddUserDialog implements OnInit{
  apiLoading: boolean = false
  closeDialog: boolean = false

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _kloudNoti: KloudNotificationService,
    private userService: UsersService
  ) {
  }

  ngOnInit(
  ) {
    this.apiLoading = false
    this.closeDialog = false
  }

  addUserForm: FormGroup = this._formBuilder.group({
    name : new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  })

  onOK(){
    if(!this.addUserForm.valid) {
      return
    }else {
      this.apiLoading = true
      this.handleAddUser()
    }
  }

  handleAddUser(){
    this.userService.handleAddUser([this.addUserForm.value]).subscribe(
      (res: any) => {
        this.closeDialog = true
        this._kloudNoti.success("Thêm mới người dùng thành công")
      }, err => {
        this._kloudNoti.error(err)
        this.apiLoading = false
      }
    )
  }


}