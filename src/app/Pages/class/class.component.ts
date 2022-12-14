import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddClassDialog} from "./add-class/add-class";
import { ClassService } from "../../Services/class/class.service";
import { componentKey } from "../../constants/component_key";
import { KloudNotificationService } from "../../Components/kloud-notification/kloud-notification.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ImportClassDialog } from "./import-class/import-class-dialog";
import { exportExcel } from "../../helper";

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})

export class ClassComponent implements OnInit {
  apiLoading: boolean = false
  lockApiLoading = false
  deleteApiLoading = false
  exportLoading: boolean = false;

  semesterFilter: any

  rawClassDataSource: any
  classesDataSource: any

  multipleSelectionRow: any = []

  displayedColumns= [{
    key: componentKey.check_box_col
  },{
    key: "STT",
    name: "STT"
  },{
    key: "classCode",
    name: "Mã lớp học"
  },{
    key: "name",
    name: "Tên lớp học"
  },{
    key: "semester",
    name: "Học kỳ"
  },{
    key: componentKey.actions_col,
    stickyEnd: true
  }];


  searchForm: FormGroup = this.formBuilder.group({
    searchField: new FormControl("")
  })

  constructor(
      private readonly dialog: MatDialog,
      private readonly classService: ClassService,
      private readonly kloudNoti: KloudNotificationService,
      private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.handleGetAllClasses()
    this.handleGetSemester()
  }

  async handleExport(){
    this.exportLoading = true
    await exportExcel(this.classesDataSource, "classes_data")
    this.exportLoading = false
  }

  async handleSearch() {
    await this.handleGetAllClasses(this.searchForm?.value?.searchField)
  }

  async handleGetAllClasses(search_string?: string): Promise<void>{
    this.apiLoading = true
    let query = {
      limit: 15,
      page: 1,
      search_string: ""
    }

    if(search_string){
      query["search_string"] = search_string
    }

    this.classService.handleGetClasses(query).subscribe(
      (res: any) => {
        if(res?.data){
          this.classesDataSource = this.rawClassDataSource = res.data.map((c:any, index: number) => ({
            STT: index + 1,
            ...c
          }))
        }
        this.apiLoading = false
      }, error => {
        this.kloudNoti.error(error)
      }
    )
  }

  handleGetSemester(){

    this.classService.getSemester().subscribe(
      (res: any) => {
        this.semesterFilter = res
      }, error => {

      }
    )
  }

  openDialog(): void {
    this.dialog.open(AddClassDialog)
      .afterClosed().subscribe(async (res) => {
      if(res === 'success') await this.handleGetAllClasses()
    });
  }

  openImportDialog(): void{
    this.dialog.open(ImportClassDialog)
      .afterClosed().subscribe(async (result: any) => {
        if(result === 'success') await this.handleGetAllClasses()
    })
  }

  handleClickLockRecord(record: any){
    this.lockApiLoading = true
    this.classService.handleUpdateClass(record.ID, {isLock: !record.isLock}).subscribe(
      async (res:any) => {
        this.kloudNoti.success("Khóa lớp học thành công")
        await this.handleGetAllClasses()
        this.lockApiLoading = false
      }, err => {
        this.kloudNoti.error(err)
        this.lockApiLoading = false
      }
    )
  }

  handleClickEditRecord(record: any){
    this.dialog.open(AddClassDialog, {
      data: record
    }).afterClosed().subscribe(async (res) => {
      await this.handleGetAllClasses()
    })
  }

  handleClickedRow(record: any): void {
    // console.log(record)
  }

  handleClickedDeleteRecord(record: any) {
    this.deleteApiLoading = true
    this.classService.handleUpdateClass(record.ID, {isActive: false}).subscribe(
      async (res:any) => {
        this.kloudNoti.success("Xóa lớp học thành công")
        await this.handleGetAllClasses()
        this.deleteApiLoading = false
      }, err => {
        this.kloudNoti.error(err)
        this.deleteApiLoading = false
      }
    )
  }

  onSelectedFilterSemester($event: any){
    let filtered = $event.value
    this.classesDataSource = this.rawClassDataSource.filter((item: any) => item.semester === filtered)
  }

  resetFilteredSemester(){
    this.classesDataSource = this.rawClassDataSource
  }

  handleSelectedRow(record: any[]){
    this.multipleSelectionRow = record
  }

  handleMultipleDelete(){
    this.apiLoading = true;
    this.classService.handleMultipleDelete(this.multipleSelectionRow.map((c: any) => c.ID))
      .subscribe(
        (res: any) => {
          this.kloudNoti.success("Xóa thành công")
          this.handleGetAllClasses()
          this.apiLoading = false
        }, (error: any) => {
          this.kloudNoti.error(error)
        }
      )
  }
}
