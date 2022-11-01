import { Component, EventEmitter, HostBinding, HostListener, OnInit, Output } from "@angular/core";

@Component({
  selector: "kloud-excel-reader",
  templateUrl: "kloud-excel-reader.html",
  styleUrls: ["kloud-excel-reader.scss"]
})
export class KloudExcelReader implements OnInit{
  @Output() fileDropped = new EventEmitter<any>();

  constructor(

  ) {
  }

  handleFileDropped($event: any){
    console.log($event)
  }

  ngOnInit(): void {

  }

}