import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
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
    classification: new FormControl('PAY', [Validators.required]),
    type: new FormControl('CASHING', [Validators.required]),
    reason: new FormControl('', [Validators.required]),
    amount: new FormControl(0, [Validators.required])
  })

  studentInfoFormControl: FormControl = new FormControl();

  ngOnInit(): void {

  }

  onOK(){
    if(!this.billForm.valid) return
    else{
      console.log(this.billForm.value)
    }
  }
}