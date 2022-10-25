import { Component, Input, OnInit } from "@angular/core";
import { AddClassDialog } from "../../Pages/class/add-class/add-class";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'kloud-widget',
  templateUrl: './kloud-widget.component.html',
  styleUrls: ['./kloud-widget.component.scss']
})
export class KloudWidgetComponent implements OnInit {
  @Input() title: string = ""
  @Input() openDialog: any

  constructor(
    private readonly dialog: MatDialog
  ) {
  }

  ngOnInit() {

  }
}