import { Component, OnInit, ViewChild } from "@angular/core";
import { ClassService } from "../../Services/class/class.service";
import { KloudNotificationService } from "../../Components/kloud-notification/kloud-notification.service";
import { StudentService } from "../../Services/students/student.service";
import { MatDialog } from "@angular/material/dialog";
import { StudentCheckinFilterDialog } from "./filter-dialog/student-checkin-filter-dialog";
import * as Moment from 'moment-timezone'
import { extendMoment } from 'moment-range';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DateFormat } from "../../constants/date-format";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
const moment = extendMoment(Moment);

@Component({
  selector: 'app-timekeeping',
  templateUrl: './timekeeping.component.html',
  styleUrls: ['./timekeeping.component.scss'],
  providers: [{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE]
  }, {
    provide: MAT_DATE_FORMATS,
    useValue: DateFormat
  }]
})
export class TimekeepingComponent implements OnInit {
  rawDisplayedColumn = ["tenant_code","name"]
  displayedColumn: any = this.rawDisplayedColumn.slice()

  dateCount = [...moment().range(moment(new Date()).startOf('week'), moment(new Date()).endOf('week')).by("days")].map(c => c.format('DD-MM-YY'))

  classDataSource: any
  selectedClassModel: any

  studentDataSource: MatTableDataSource<any>

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly classService: ClassService,
    private readonly kloudNoti: KloudNotificationService,
    private readonly studentService: StudentService,
    private readonly matDialog: MatDialog,
  ) {
    this.studentDataSource = new MatTableDataSource<any>()
  }

  ngOnInit(): void {
    this.handleGetClass()
    this.handleUpdateDisplayColumn()
  }

  handleUpdateDisplayColumn(){
    this.displayedColumn = this.rawDisplayedColumn.concat(this.dateCount)
  }

  ngAfterViewInit(){
    this.studentDataSource.paginator = this.paginator;
  }

  handleGetClass(){
    this.classService.handleGetClasses().subscribe(
      (res: any) => {
        this.classDataSource = res.data
      }, error => {
        this.kloudNoti.error(error)
      }
    )
  }

  handleGetStudentByClass(classID: string){
    let query = {
      limit: 10000,
      page: 1,
      filter_class: classID
    }

    this.studentService.getStudentsInfo(query).subscribe(
      (res: any) => {
        this. studentDataSource.data = res.data
      }, (error) => {
        this.kloudNoti.error(error)
      }
    )
  }

  onClickResetFilter(){
    this.dateCount = [...moment().range(moment(new Date()).startOf('week'), moment(new Date()).endOf('week')).by("days")].map(c => c.format('DD-MM-YY'))
    this.handleUpdateDisplayColumn()
  }

  onClickHandleFilterToToday(){
    this.dateCount = [moment().format('DD-MM-YY')]
    this.handleUpdateDisplayColumn()
  }

  onClickOpenFilter(){
    this.matDialog.open(StudentCheckinFilterDialog, {
      data: this.dateCount
    })
  }

  applyDatePickerFilter(){
    if(this.dateFilter.valid){
      let {start, end} = this.dateFilter.value
      this.dateCount = [...moment().range(start,end).by("days")].map(c => c.format('DD-MM-YY'))
      this.displayedColumn = this.rawDisplayedColumn.concat(this.dateCount)
    }
  }

  onClickClassToggle(){
    this.handleGetStudentByClass(this.selectedClassModel.ID)
  }

  handlePatchValueToDateFilter(){

  }

  dateFilter: FormGroup = this._formBuilder.group({
    start: new FormControl(moment(new Date()).startOf('week')),
    end: new FormControl(moment(new Date()).endOf('week'))
  })


}
