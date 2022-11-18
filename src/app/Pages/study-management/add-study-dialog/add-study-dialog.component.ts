import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { KloudNotificationService } from "../../../Components/kloud-notification/kloud-notification.service";
import { ClassService } from "../../../Services/class/class.service";

@Component({
  selector: 'add-study-dialog',
  templateUrl: 'add-study-dialog.component.html',
  styleUrls: ['add-study-dialog.component.scss']
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
    month: new FormControl(),
    user: new FormControl(),
    student: new FormControl(),
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
    physical_education: new FormControl(),
    intelligence_education: new FormControl(),
    language_education: new FormControl(),
    socialite_education: new FormControl(),
    art_education: new FormControl(),
    health: new FormControl(),
    english_education: new FormControl(),
    life_skill_bank: new FormControl(),
  })

   student_goals_achieved: FormGroup = this._formBuilder.group({
    physical_education: new FormControl(),
    intelligence_education: new FormControl(),
    language_education: new FormControl(),
    socialite_education: new FormControl(),
    art_education: new FormControl(),
    health: new FormControl(),
    english_education: new FormControl(),
    life_skill_bank: new FormControl(),
  })

  ngOnInit(): void {

  }

  onOK(){

  }

}