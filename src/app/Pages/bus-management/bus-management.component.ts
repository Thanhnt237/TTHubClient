import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bus-management',
  templateUrl: './bus-management.component.html',
  styleUrls: ['./bus-management.component.scss']
})
export class BusManagementComponent implements OnInit {

  apiLoading: boolean = false

  selectedClassModel: any
  classDataSource: any

  constructor() { }

  ngOnInit(): void {
  }

  dateFilter: any

  applyDatePickerFilter(){

  }

  onClickClassToggle(){

  }

}
