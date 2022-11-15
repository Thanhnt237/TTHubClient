import { Component, Inject, OnInit } from "@angular/core";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from "@angular/material-moment-adapter";
import { MY_FORMATS } from "../../class/add-class/add-class";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { KloudNotificationService } from "../../../Components/kloud-notification/kloud-notification.service";
import { StudentService } from "../../../Services/students/student.service";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { SelectionModel } from "@angular/cdk/collections";
import { Observable } from "rxjs";
import { ClassService } from "../../../Services/class/class.service";
import { BusManagementService } from "../../../Services/bus-management/bus-management.service";

@Component({
  selector: 'bus-register',
  templateUrl: 'bus-register-dialog.html',
  styleUrls: ['bus-register-dialog.scss'],
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
export class BusRegisterDialog implements OnInit{
  driverDataSource: any;

  semesterDataSource: any;

  studentDataSource = new MatTreeNestedDataSource<any>();
  studentTreeControl = new NestedTreeControl<any>(node => node.children);

  studentCheckListSelection = new SelectionModel<any>(true)

  apiLoading: boolean = false

  isNew: boolean = true

  checkedStudentDisplayCol = [{
    key: "STT",
    name: ""
  },{
    key: "tenant_code",
    name: "Mã học sinh"
  },{
    key: "name",
    name: "Họ và tên"
  }, {
    key: "address",
    name: "Địa chỉ"
  },{
    key: "gender",
    name: "Giới tính"
  },{
    key: "className",
    name: "lớp"
  }]

  checkedStudentTableDataSource: any

  constructor(
    private readonly dialogRef: MatDialogRef<BusRegisterDialog>,
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _kloudNoti: KloudNotificationService,
    private readonly studentService: StudentService,
    private readonly classService: ClassService,
    private readonly busService: BusManagementService,
    @Inject(MAT_DIALOG_DATA) public readonly busRegisterData: any
  ) {
    // this.checkedStudentTableDataSource = this.studentCheckListSelection.selected
  }

  busRegisterManagementForm: FormGroup = this._formBuilder.group({
    driver: new FormControl('', [Validators.required]),
    students: new FormControl([], [Validators.required]),
    semester: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    this.handleGetStudentGroupByClass()
    // this.handleGetSemester()

    if(this.busRegisterData){
      this.driverDataSource = this.busRegisterData?.allDriver ? this.busRegisterData.allDriver : []
      this.semesterDataSource = this.busRegisterData?.allSemester ? this.busRegisterData.allSemester : []

      this.busRegisterManagementForm.patchValue({
        semester: this.busRegisterData.selectedSemester,
        driver: this.busRegisterData.selectedDriver
      })
    }
  }

  handleExistedStudentsData(){
    const normalizeData = this.busRegisterData.studentsData.map((c: any) => ({
      ID: c.s_ID,
      tenant_code: c.s_tenant_code,
      name: c.s_name,
      classID: c.classID,
      address: c.s_address,
      gender: c.s_gender,
      className: c.c_name
    })).map((i: any) => {
      this.studentCheckListSelection.select(i)
    })

    this.handleUpdateCheckedStudentTableDataSource()
  }

  handleUpdateCheckedStudentTableDataSource(){
    this.checkedStudentTableDataSource =
      this.studentCheckListSelection
        .selected
        .filter(c => !c.children).map((c, index) => ({...c, STT: index + 1}))
  }

  handleGetStudentGroupByClass(){
    this.apiLoading = true

    const query = {
      semester: this.busRegisterData?.selectedSemester
    }

    this.studentService.getStudentGroupByClass(query).subscribe(
      (res: any) => {
        this.studentDataSource.data = res.data
        if(this.busRegisterData?.studentsData){
          this.handleExistedStudentsData()
        }
        this.apiLoading = false
      }, error => {
        this._kloudNoti.error(error)
      }
    )
  }

  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;
  getChildren = (node: any) => this.studentTreeControl.getChildren(node)

  onStudentLeafItemSelectionToggle(node: any){
    console.log(node)
    this.studentCheckListSelection.toggle(node)
    this.handleUpdateCheckedStudentTableDataSource()
  }

  onStudentBranchItemSelectionToggle(node: any){
    this.studentCheckListSelection.toggle(node)

    for (const branch of node.children) {
      this.studentCheckListSelection.toggle(branch)
      if(branch.children){
        for (const leaf of branch.children) {
          this.studentCheckListSelection.toggle(leaf)
        }
      }
    }

    this.handleUpdateCheckedStudentTableDataSource()
  }

  descendantsAllSelected(node: any): boolean {
    const descendants = this.studentTreeControl.getDescendants(node);

    return descendants.length > 0 && descendants.every(child => {
      return this.studentCheckListSelection.isSelected(child);
    })
  }

  descendantsPartiallySelected(node: any): boolean {
    const descendants = this.studentTreeControl.getDescendants(node);
    const result = descendants.some(child => this.studentCheckListSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  // onOK(){
  //   console.log(this.studentCheckListSelection);
  // }

  onOK(){
    const selectedValue = this.studentCheckListSelection.selected
    const normalizeData = selectedValue.filter(c => !c.children)
    if(!normalizeData?.length) this._kloudNoti.error(new Error(),"Không học sinh nào được chọn")
    this.busRegisterManagementForm.patchValue({students: normalizeData}, {emitEvent: false})

    if(!this.busRegisterManagementForm.valid){
      return this.busRegisterManagementForm.markAllAsTouched()
    }else{
      this.apiLoading = true
      this.handleRegisBus()
    }
  }

  handleRegisBus(){
    this.busService.registerNewBusManagement(this.busRegisterManagementForm.value)
      .subscribe(
        res => {
          this._kloudNoti.success("Thao tác thành công!")
          this.apiLoading = false
          this.dialogRef.close("success")
        },error => {
          this._kloudNoti.error("Thao tác thất bại")
          this.apiLoading = false
        }
      )
  }


}