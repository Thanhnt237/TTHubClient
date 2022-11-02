import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { KloudNotificationService } from "../../../../Components/kloud-notification/kloud-notification.service";
import { StudentService } from "../../../../Services/students/student.service";

@Component({
  selector: 'bill-dialog',
  templateUrl: 'bill-dialog.html',
  styleUrls: ['bill-dialog.scss']
})
export class BillDialog implements OnInit{

  apiLoading: boolean = false;
  isNew: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<BillDialog>,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _kloudNoti: KloudNotificationService,
    private readonly studentService: StudentService,
    @Inject(MAT_DIALOG_DATA) public billRecordData: any
  ) {
  }

  billForm: FormGroup = this._formBuilder.group({
    information: new FormControl(),
    classification: new FormControl('PAY'),
    type: new FormControl('CASHING'),
    reason: new FormControl(''),
    amount: new FormControl(''),
  })

  studentInfoFormControl: FormControl = new FormControl();

  ngOnInit(): void {
  }



  onOK(){

  }
}