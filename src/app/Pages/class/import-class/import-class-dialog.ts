import { Component, OnInit } from "@angular/core";
import { exportExcel, normalizeExcelData } from "../../../helper";
import { CommonExcludeKeys } from "../enums/enums";
import { start } from "repl";
import { ClassService } from "../../../Services/class/class.service";
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { KloudNotificationService } from "../../../Components/kloud-notification/kloud-notification.service";

@Component({
  templateUrl: "import-class-dialog.html",
  styleUrls: ["import-class-dialog.scss"]
})

export class ImportClassDialog implements OnInit{
  apiLoading: boolean = false;
  exportLoading: boolean = false;

  excelData: any

  constructor(
    private readonly _classService: ClassService,
    private dialogRef: MatDialogRef<ImportClassDialog>,
    private _kloudNoti: KloudNotificationService,
    private classService: ClassService,
  ) {
  }

  private readonly templateCell = [{
    "Tên lớp học": "",
    "Học kỳ": "",
    "NOTE": `
    !Không sửa vào cột này! 
Học kỳ vui lòng nhập đúng định dạng: YYYY-YYYY. 
Ví dụ: 2021-2022
    `
  }]

  ngOnInit(): void {
  }

  async handleExportTemplate(){
    this.exportLoading = true
    await exportExcel(this.templateCell, "import_classes_template")
    this.exportLoading = false
  }

  async handleRecieveExcelData(data: any[]){
    const normalizeCol = {
      "Tên lớp học": "name",
      "Học kỳ": "semester",
    }
    this.excelData = normalizeExcelData(data, normalizeCol)
  }

  handleImportExcel(){
    this.classService.handleAddClass(this.excelData).subscribe(
      res => {
        this._kloudNoti.success("Thêm mới lớp học thành công")
        this.apiLoading = false
        this.dialogRef.close('success')
      },
      err => {
        this._kloudNoti.error(err)
        this.apiLoading = false
      }
    )
  }

}