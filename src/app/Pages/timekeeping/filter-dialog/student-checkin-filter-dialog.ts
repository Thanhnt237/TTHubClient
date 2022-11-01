import { Component, Inject, OnInit } from "@angular/core";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DateFormat } from "../../../constants/date-format";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { KloudNotificationService } from "../../../Components/kloud-notification/kloud-notification.service";
import * as Moment from 'moment-timezone'
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

@Component({
  selector: 'student-checkin-filter-dialog',
  templateUrl: 'student-checkin-filter-dialog.html',
  styleUrls: ['student-checkin-filter-dialog.scss'],
  providers: [{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE]
  }, {
    provide: MAT_DATE_FORMATS,
    useValue: DateFormat
  }]
})
export class StudentCheckinFilterDialog implements OnInit{

  apiLoading: boolean = false;

  constructor(
    private readonly matRef: MatDialogRef<StudentCheckinFilterDialog>,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _kloudNoti: KloudNotificationService,
    @Inject(MAT_DIALOG_DATA) public dateRange: any
  ) {

  }

  ngOnInit() {
    if(this.dateRange){
      let minDate = moment(this.dateRange[0], 'DD-MM-YY')
      let maxDate = moment(this.dateRange[this.dateRange.length-1], 'DD-MM-YY')

      this.dateFilter.patchValue({
        start: minDate,
        end: maxDate
      })

    }
  }

  fackDateRange(startDate: any, endDate: any) {
    const month = moment('20-12-2022', 'DD-MM-YYYY');
    const range = moment().range(startDate, endDate);

    const days = range.by('days');

    console.log([...days].map(date => date.format('DD-MM-YYYY')));
  }

  dateFilter: FormGroup = this._formBuilder.group({
      start: new FormControl(''),
      end: new FormControl('')
  })

  onOK(){
    console.log(this.dateFilter.value);
  }


}