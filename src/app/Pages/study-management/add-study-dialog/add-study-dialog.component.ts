import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { KloudNotificationService } from "../../../Components/kloud-notification/kloud-notification.service";
import { ClassService } from "../../../Services/class/class.service";

import {Moment} from 'moment-timezone';
import { MatDatepicker } from "@angular/material/datepicker";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from "@angular/material-moment-adapter";

const MONTH_YEAR_FORMAT = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'add-study-dialog',
  templateUrl: 'add-study-dialog.component.html',
  styleUrls: ['add-study-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MONTH_YEAR_FORMAT
    },
  ],
})
export class AddStudyDialogComponent implements OnInit{

  apiLoading: boolean = false;
  isNew: boolean = false

  selectedSemesterModel: any;
  selectedClassModel: any;

  constructor(
    private dialogRef: MatDialogRef<AddStudyDialogComponent>,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _kloudNoti: KloudNotificationService,
    private classService: ClassService,
    @Inject(MAT_DIALOG_DATA) public classRecordData: any
  ) {
  }

  studyInformationForm: FormGroup = this._formBuilder.group({
    month: new FormControl("",[Validators.required]),
    user: new FormControl("",[Validators.required]),
    student: new FormControl("",[Validators.required]),
    class: new FormControl("",[Validators.required]),
    guideline: new FormControl("", [Validators.required]),
    educational_goals: new FormControl(),
    student_goals_achieved: new FormControl(),
    solution_orientation: new FormControl(),
  })

  userInfoForm: FormGroup = this._formBuilder.group({
    ID: new FormControl(),
    name: new FormControl(),
  })

  studentInfoForm: FormGroup = this._formBuilder.group({
    ID: new FormControl(),
    name: new FormControl()
  })

  educationGoalForm: FormGroup = this._formBuilder.group({
    physical_education: new FormControl("",[Validators.required]),
    intelligence_education: new FormControl("",[Validators.required]),
    language_education: new FormControl("",[Validators.required]),
    socialite_education: new FormControl("",[Validators.required]),
    art_education: new FormControl("",[Validators.required]),
    health: new FormControl("",[Validators.required]),
    english_education: new FormControl("",[Validators.required]),
    life_skill_bank: new FormControl("",[Validators.required]),
  })

   student_goals_achieved: FormGroup = this._formBuilder.group({
    physical_education: new FormControl("",[Validators.required]),
    intelligence_education: new FormControl("",[Validators.required]),
    language_education: new FormControl("",[Validators.required]),
    socialite_education: new FormControl("",[Validators.required]),
    art_education: new FormControl("",[Validators.required]),
    health: new FormControl("",[Validators.required]),
    english_education: new FormControl("",[Validators.required]),
    life_skill_bank: new FormControl("",[Validators.required]),
  })

  ngOnInit(): void {

  }

  onOK(){

  }

}