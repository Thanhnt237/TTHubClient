import { Component, OnInit } from '@angular/core';
import {AddClassDialog} from "../class/add-class/add-class";
import {MatDialog} from "@angular/material/dialog";

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
    const dialogRef = this.dialog.open(AddClassDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
