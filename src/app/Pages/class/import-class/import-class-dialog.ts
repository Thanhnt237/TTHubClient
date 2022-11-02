import { Component, OnInit } from "@angular/core";

@Component({
  templateUrl: "import-class-dialog.html",
  styleUrls: ["import-class-dialog.scss"]
})
export class ImportClassDialog implements OnInit{
  apiLoading: boolean = false;

  ngOnInit(): void {
  }

}