import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "study-management-table",
  templateUrl: "study-management-table.component.html",
  styleUrls: ["study-management-table.component.scss"]
})
export class StudyManagementTableComponent implements OnInit, OnChanges{
  @Input() studyInformationForm: FormGroup
  @Input() educationGoalForm: FormGroup
  @Input() student_goals_achieved: FormGroup

  studyInformationData: any
  educationGoalData: any
  studentGoalsAchievedData: any

  constructor(

  ) {
  }

  ngOnInit(): void {

  }

  parseChanges(changes: any){
    this.studyInformationData = changes["studyInformationForm"].currentValue
    this.educationGoalData = changes["educationGoalForm"].currentValue
    this.studentGoalsAchievedData = changes["student_goals_achieved"].currentValue

    this.studyInformationData.valueChanges.subscribe((res: any) => {
      this.studyInformationData = res
    })

    this.educationGoalData.valueChanges.subscribe((res: any) => {
      this.educationGoalData = res
    })

    this.studentGoalsAchievedData.valueChanges.subscribe((res: any) => {
      this.studentGoalsAchievedData = res
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.parseChanges(changes)
  }


}