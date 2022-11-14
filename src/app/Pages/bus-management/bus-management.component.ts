import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { KloudNotificationService } from "../../Components/kloud-notification/kloud-notification.service";
import { UsersService } from "../../Services/users/users.service";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DateFormat } from "../../constants/date-format";
import { extendMoment } from "moment-range";
import * as Moment from 'moment-timezone'
import { BusRegisterDialog } from "./student-register/bus-register-dialog";
import {BusManagementService} from "../../Services/bus-management/bus-management.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ClassService} from "../../Services/class/class.service";
const moment = extendMoment(Moment);

@Component({
  selector: 'app-bus-management',
  templateUrl: './bus-management.component.html',
  styleUrls: ['./bus-management.component.scss'],
  providers: [{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE]
  }, {
    provide: MAT_DATE_FORMATS,
    useValue: DateFormat
  }]
})

export class BusManagementComponent implements OnInit {
  readonly rawDisplayedColumn = ["tenant_code", "name"]
  displayedColumn: any = this.rawDisplayedColumn.slice()

  dateCount = [...moment().range(moment(new Date()).startOf('week'), moment(new Date()).endOf('week')).by("days")].map(c => c.format('DD-MM-YY'))

  apiLoading: boolean = false

  selectedDriverModel: any
  driverDataSource: any

  selectedSemesterModel: any
  semesterDataSource: any

  driverBusManagementSource: MatTableDataSource<any>

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator

  constructor(
    private readonly dialog: MatDialog,
    private readonly _formBuilder: FormBuilder,
    private readonly _userService: UsersService,
    private readonly _classService: ClassService,
    private readonly _busService: BusManagementService,
    private readonly _kloudNoti: KloudNotificationService
  ) {
    this.driverBusManagementSource = new MatTableDataSource<any>()
  }

  ngOnInit(): void {
    this.handleGetSemester()
    this.handleGetDriver()
    this.handleUpdateDisplayColumn()
  }

  ngAfterViewInit() {
    this.driverBusManagementSource.paginator = this.paginator;
  }

  handleUpdateDisplayColumn(){
    this.displayedColumn = this.rawDisplayedColumn.concat(this.dateCount)
  }

  handleGetSemester(){
    this._classService.getSemester().subscribe(
        (res: any) => {
          this.semesterDataSource = res
          if(this.semesterDataSource?.length){
            this.selectedSemesterModel = this.semesterDataSource[0].semester
          }
        }, error => {
          this._kloudNoti.error(error)
        }
    )
  }

  handleGetDriver(){
    this.apiLoading = true;
    this._userService.handleGetUser().subscribe(
      (res) => {
        this.driverDataSource = res
        this.apiLoading = false;
      }, (error) => {
        this._kloudNoti.error(error)
      }
    )
  }

  dateFilter: FormGroup = this._formBuilder.group({
    start: new FormControl(moment(new Date()).startOf('week')),
    end: new FormControl(moment(new Date()).endOf('week'))
  })

  openBusRegisterDialog(){
    this.dialog.open(BusRegisterDialog, {
      data: {
        allDriver: this.driverDataSource,
        selectedDriver: this.selectedDriverModel,
        allSemester: this.semesterDataSource,
        selectedSemester: this.selectedSemesterModel,
        studentsData: this.driverBusManagementSource.data
      },
      width: "1600px"
    })
      .afterClosed().subscribe(async (res) => {
      if(res === 'success') this.handleGetListBusManagement()
    });
  }

  applyDatePickerFilter(){
    if(this.dateFilter.valid){
      let {start, end} = this.dateFilter.value
      this.dateCount = [...moment().range(start,end).by("days")]
          .map(c => c.format('DD-MM-YY'))
      this.displayedColumn = this.rawDisplayedColumn.concat(this.dateCount)
      // this.handleGetAllCheckin()
    }
  }

  handleUpdateToday(){
    this.dateCount = [moment().format('DD-MM-YY')]
    this.handleUpdateDisplayColumn()
  }

  handleSemesterChange(){
    console.log(this.selectedSemesterModel)
  }

  onClickCheckin(){

  }

  onClickDriverToggle(){
    this.handleGetListBusManagement()
  }

  handleGetListBusManagement(){
    const query = {
      driverId: this.selectedDriverModel?.id,
      semester: this.selectedSemesterModel
    }

    this._busService.getAll(query).subscribe(
        (res: any) => {
          this.driverBusManagementSource.data = res?.data
        }, error => {
          this._kloudNoti.error(error)
        }
    )
  }

}
