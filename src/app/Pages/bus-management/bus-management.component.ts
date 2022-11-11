import { Component, OnInit } from '@angular/core';
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

  apiLoading: boolean = false

  selectedDriverModel: any
  driverDataSource: any

  constructor(
    private readonly dialog: MatDialog,
    private readonly _formBuilder: FormBuilder,
    private readonly _userService: UsersService,
    private readonly _kloudNoti: KloudNotificationService
  ) { }

  ngOnInit(): void {
    this.handleGetDriver()
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
        selectedDriver: this.selectedDriverModel
      },
      width: "1600px"
    })
      .afterClosed().subscribe(async (res) => {
      console.log(res);
    });
  }

  applyDatePickerFilter(){

  }

  onClickClassToggle(){

  }

}
