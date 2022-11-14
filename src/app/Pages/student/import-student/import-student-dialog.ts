import { Component, OnInit } from "@angular/core";
import { exportExcel } from "../../../helper";

@Component({
  templateUrl: "import-student-dialog.html",
  styleUrls: ["import-student-dialog.scss"]
})
export class ImportStudentDialog implements OnInit{
  apiLoading: boolean = false;
  exportLoading: boolean = false;

  excelData: any

  /**
   * {
   *     "DoB": "1999-07-23 00:00:00.000",
   *     "address": "35 Le Van Thiem",
   *     "ethnic": "",
   *     "gender": "nu",
   *     "name": "Can Van Dat",
   *     "religion": "Kinh",
   *     "tenant_code": "TTHS20220003",
   *     "isLock": false,
   *     "father_information": {
   *         "DoB": null,
   *         "email": null,
   *         "phone": null,
   *         "ethnic": null,
   *         "religion": null,
   *         "job": null,
   *         "name": null,
   *         "national_identifier": null,
   *         "national_identifier_provide_date": null
   *     },
   *     "mother_information": {
   *         "DoB": null,
   *         "email": null,
   *         "phone": null,
   *         "ethnic": null,
   *         "religion": null,
   *         "job": null,
   *         "name": null,
   *         "national_identifier": null,
   *         "national_identifier_provide_date": null
   *     },
   *     "contact_information": {
   *         "name": "Can Tuan Thanh",
   *         "phone": "0329378946",
   *         "email": "thanhnt@bytesoft.net"
   *     },
   *     "class": {
   *         "ID": "7a80ef72-c597-4f51-ba5c-c240b9d24877"
   *     },
   *     "ID": "35ed1f4a-bdec-4edb-8696-53368653d6a1"
   * }
   */

  private readonly templateCell = [{
    "Họ và tên": "",
    "Ngày sinh": "",
    "Giới tính": "",
    "Dân tộc": "",
    "Tôn giáo": "",
    "Địa chỉ": "",
    "Lớp": {
      "Tên lớp": ""
    },
  }]

  ngOnInit(): void {
  }

  async handleExportTemplate(){
    this.exportLoading = true
    await exportExcel(this.templateCell, "import_students_template")
    this.exportLoading = false
  }

}