import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UsersService } from "../../Services/users/users.service";
import { KloudNotificationService } from "../../Components/kloud-notification/kloud-notification.service";
import { AddUserDialog } from "./add-user/add-user";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  classDialogRef: any

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
    if(this.searchForm?.value?.searchField) await this.handleGetUser(this.searchForm?.value?.searchField)
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

    if(search_string){
      query["search_string"] = search_string
    }

    this.userService.handleGetUser(query).subscribe(
      (res: any) => {
        this.users = res
      }, err => {
        this.kloudNoti.error(err)
      }
    )
  }

  openDialog(): void{
    this.classDialogRef = this.dialog.open(AddUserDialog);

    this.classDialogRef.afterClosed().subscribe(async (result: any) => {
      await this.handleGetUser()
    });
  }

  handleClickedEdit(record: any){
    this.dialog.open(AddUserDialog, {
      data: record
    })
  }

  handleClickedLock(record: any){

  }

  handleClickedDelete(record: any){

  }

  handleClickedRow($event: any){

  }

}
