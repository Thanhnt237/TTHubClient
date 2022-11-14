import { Component, OnInit, ViewChild } from "@angular/core";
import { ClassService } from "../../Services/class/class.service";
import { KloudNotificationService } from "../../Components/kloud-notification/kloud-notification.service";
import { StudentService } from "../../Services/students/student.service";
import { MatDialog } from "@angular/material/dialog";
import { StudentCheckinFilterDialog } from "./filter-dialog/student-checkin-filter-dialog";
import { extendMoment } from 'moment-range';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DateFormat } from "../../constants/date-format";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { CheckinService } from "../../Services/checkin/checkin.service";
import * as Moment from 'moment-timezone'
import { exportExcel } from "../../helper";
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
  apiLoading: boolean = false;

  rawDisplayedColumn = ["tenant_code","name"]
  displayedColumn: any = this.rawDisplayedColumn.slice()

  dateCount = [...moment().range(moment(new Date()).startOf('week'), moment(new Date()).endOf('week')).by("days")].map(c => c.format('DD-MM-YY'))

  classDataSource: any
  selectedClassModel: any

  rawStudentDataSource: any;
  studentDataSource: MatTableDataSource<any>

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly classService: ClassService,
    private readonly kloudNoti: KloudNotificationService,
    private readonly studentService: StudentService,
    private readonly matDialog: MatDialog,
    private readonly checkinService: CheckinService
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
    this.apiLoading = true
    this.classService.handleGetClasses().subscribe(
      (res: any) => {
        this.classDataSource = res.data
        this.apiLoading = false
      }, error => {
        this.kloudNoti.error(error)
      }
    )
  }

  // handleGetStudentByClass(classID: string){
  //   let query = {
  //     limit: 10000,
  //     page: 1,
  //     filter_class: classID
  //   }
  //
  //   this.studentService.getStudentsInfo(query).subscribe(
  //     (res: any) => {
  //       this.studentDataSource.data = res.data
  //     }, (error) => {
  //       this.kloudNoti.error(error)
  //     }
  //   )
  // }

  handleGetAllCheckin(){
    if(!this.selectedClassModel) return

    let query = {
      classID: this.selectedClassModel.ID,
      start_date: moment(this.dateCount[0], 'DD-MM-YY').format("YYYY-MM-DD"),
      end_date: moment(this.dateCount[this.dateCount.length-1], 'DD-MM-YY').format("YYYY-MM-DD")
    }

    console.log(query)

    this.checkinService.getAll(query).subscribe(
      (res: any) => {
        this.rawStudentDataSource = this.studentDataSource.data = res?.data?.length ? res.data.map((item: any) => ({
          ...item,
          checkedInDate: item?.checkedIn?.length ?
            item.checkedIn.map((c: any) => {
              if(!c.isLock) return false
              return moment(c.checkinDate).format("DD-MM-YY");
            }) : []
        })) : []
        this.apiLoading = false
      }, error => {
        this.kloudNoti.error(error)
        this.apiLoading = false
      }
    )

  }

  onClickResetFilter(){
    this.dateCount = [
      ...moment().range(moment(new Date()).startOf('week'),
      moment(new Date()).endOf('week')).by("days")
    ].map(c => c.format('DD-MM-YY'))
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
      this.dateCount = [...moment().range(start,end).by("days")]
        .map(c => c.format('DD-MM-YY'))
      this.displayedColumn = this.rawDisplayedColumn.concat(this.dateCount)
      this.handleGetAllCheckin()
    }
  }
  onClickClassToggle(){
    // this.handleGetStudentByClass(this.selectedClassModel.ID)
    this.apiLoading = true;
    this.handleGetAllCheckin()
  }

  dateFilter: FormGroup = this._formBuilder.group({
    start: new FormControl(moment(new Date()).startOf('week')),
    end: new FormControl(moment(new Date()).endOf('week'))
  })

  onClickCheckin(element: any, date: any, isLock: boolean){
    console.log(this.studentDataSource.data.indexOf(element))
    this.apiLoading = true
    this.handleStudentCheckin({
      student: element,
      checkinDate: moment(date, 'DD-MM-YY').format("YYYY-MM-DD"),
      isLock
    })
  }

  handleStudentCheckin(body: any){
    this.checkinService.studentCheckin(body).subscribe(
      res => {
        this.kloudNoti.success("Điểm danh thành công")
        this.handleGetAllCheckin()
      }, error => {
        this.kloudNoti.error(error)
        this.apiLoading = false
      }
    )
  }

  handleExportExcel(){
    console.log(this.studentDataSource.data.flat());
    // exportExcel(this.studentDataSource.data.flat(), "checkin_data")
  }
}
