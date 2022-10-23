import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { AddStudentDialog } from "./add-student/add-student";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(
      private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(AddStudentDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
