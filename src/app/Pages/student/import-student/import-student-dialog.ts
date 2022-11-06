import { Component, OnInit } from "@angular/core";

@Component({
  templateUrl: "import-student-dialog.html",
  styleUrls: ["import-student-dialog.scss"]
})
export class ImportStudentDialog implements OnInit{
  apiLoading: boolean = false;

  ngOnInit(): void {
  }

}