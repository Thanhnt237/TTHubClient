import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, ViewChild } from "@angular/core";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import * as moment from 'moment-timezone'

@Component({
  selector: 'kloud-table',
  templateUrl: './kloud-table.component.html',
  styleUrls: ['./kloud-table.component.scss']
})
export class KloudTableComponent implements OnInit {
  @Input() displayedColumns: any[] = [];
  @Input() dataSource: any[] = [];
  @Input() lockApiLoading: boolean = false;
  @Input() deleteApiLoading: boolean = false
  @Input() filtering: any = ""

  @Output() clickedRow = new EventEmitter<any>();
  @Output() handleClickLockRecord = new EventEmitter<any>()
  @Output() handleClickEditRecord = new EventEmitter<any>()
  @Output() handleClickDeleteRecord = new EventEmitter<any>()
  @Output() handleSelectedRows = new EventEmitter<any>()
  // @ts-ignore
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator

  // @ts-ignore
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  mappingCol: any
  tableDataSource: MatTableDataSource<any> = new MatTableDataSource<any>()
  selection = new SelectionModel<any>(true, []);

  constructor(
  ) {

  }

  ngOnInit() {
    this.mappingCol = this.displayedColumns.map(c => c.key)
  }

  ngOnChanges(changes: SimpleChange) {
    let fullChange = JSON.parse(JSON.stringify(changes))
    this.tableDataSource.data = fullChange.dataSource.currentValue
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.paginator;
  }

  emitSelectedRow(){
    this.handleSelectedRows.emit(this.selection.selected)
  }

  onClickedRow(row: any){
    this.clickedRow.emit(row)
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableDataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.emitSelectedRow()
      return;
    }

    this.selection.select(...this.tableDataSource?.data);
    this.emitSelectedRow()
  }

  toggleRows(element: any) {
    this.selection.toggle(element)
    this.emitSelectedRow()
  }

  onClickLockRecord(record: any){
    this.handleClickLockRecord.emit(record)
  }

  onClickDeleteRecord(record: any){
    this.handleClickDeleteRecord.emit(record)
  }

  onClickEditRecord(record: any){
    this.handleClickEditRecord.emit(record)
  }

  formatDateTime(datetime: any){
    return moment(datetime).format('DD-MM-YYYY')
  }

}