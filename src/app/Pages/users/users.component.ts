import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UsersService } from "../../Services/users/users.service";
import { KloudNotificationService } from "../../Components/kloud-notification/kloud-notification.service";
import { AddUserDialog } from "./add-user/add-user";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any = []

  displayColumn = [{
    key: "tenant_code",
    name: "Mã người dùng"
  },{
    key: "name",
    name: "Họ và tên"
  },{
    key: "phone",
    name: "Số điện thoại"
  },{
    key: "role",
    name: "Chức vụ"
  }]

  constructor(
    private readonly kloudNoti: KloudNotificationService,
    private readonly userService: UsersService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.handleGetUser()
  }

  ngOnChange(): void {

  }

  async handleGetUser(){
    this.userService.handleGetUser().subscribe(
      res => {
        this.users = res
      }, err => {
        this.kloudNoti.error(err)
      }
    )
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(AddUserDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

  closeDialog(): void{

  }


}
