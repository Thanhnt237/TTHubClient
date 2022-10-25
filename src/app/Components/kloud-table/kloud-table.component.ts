import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'kloud-table',
  templateUrl: './kloud-table.component.html',
  styleUrls: ['./kloud-table.component.scss']
})
export class KloudTableComponent implements OnInit {
  @Input() displayedColumns: any[] = [];
  @Input() dataSource: any[] = [];

  mappingCol: any

  constructor(

  ) {
  }

  ngOnInit() {
    this.mappingCol = this.displayedColumns.map(c => c.key)
  }
}