import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UsersService } from "../../Services/users/users.service";
import { KloudNotificationService } from "../../Components/kloud-notification/kloud-notification.service";
import { AddUserDialog } from "./add-user/add-user";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { map } from "rxjs";

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
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  classDialogRef: any
  apiLoading: boolean = false
  roleEnum = RoleEnum

  users: any = []

  displayColumn = [{
    key: "checkBoxCols"
  },{
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
  },{
    key: "actionsCol",
    stickyEnd: true
  }]

  searchForm: FormGroup = this.formBuilder.group({
    searchField: new FormControl("")
  })

  constructor(
    private readonly kloudNoti: KloudNotificationService,
    private readonly userService: UsersService,
    private readonly dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  async handleSearch() {
    await this.handleGetUser(this.searchForm?.value?.searchField)
  }

  ngOnInit(): void {
    this.handleGetUser()
  }

  async handleGetUser(search_string?: string){
    let query = {
      limit: 15,
      page: 1,
      search_string: ""
    }
    this.apiLoading = true;

    if(search_string){
      query["search_string"] = search_string
    }

    this.userService.handleGetUser(query).subscribe(
      (res: any) => {
        this.users = res?.map((c:any) => ({
          ...c,
          role: this.convertRole(c.role)
        }))
        this.apiLoading = false
      }, err => {
        this.kloudNoti.error(err)
      }
    )
  }

  convertRole(role: string): string{
    switch (role){
      case this.roleEnum.SuperAdmin:
        return "Super admin";
      case this.roleEnum.Admin:
        return "Hội đồng quản trị";
      case this.roleEnum.Manager:
        return "Quản lý"
      case this.roleEnum.Teacher:
        return "Giáo viên"
      case this.roleEnum.Driver:
        return "Lái xe"
      case this.roleEnum.Member:
        return "Phụ huynh học sinh"
      default:
        return "Thành viên"
    }
  }

  openDialog(): void{
    this.classDialogRef = this.dialog.open(AddUserDialog);

    this.classDialogRef.afterClosed().subscribe(async (result: any) => {
      if(result === 'success') await this.handleGetUser()
    });
  }

  handleClickedEdit(record: any){
    this.dialog.open(AddUserDialog, {
      data: record
    }).afterClosed().subscribe(async (result: any) => {
      if(result === 'success') await this.handleGetUser()
    })
  }

  handleClickedLock(record: any){

  }

  handleClickedDelete(record: any){

  }

  handleClickedRow($event: any){

  }

}
