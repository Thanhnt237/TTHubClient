import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'kloud-notification',
  templateUrl: './kloud-notification.component.html',
  styleUrls: ['./kloud-notification.component.scss']
})
export class KloudNotificationComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: any
  ) {}

  ngOnInit() {}

  get getIcon() {
    switch (this.data.snackType) {
      case 'Success':
        return 'check_circle';
      case 'Error':
        return 'error';
      case 'Warn':
        return 'warning';
      case 'Info':
        return 'info';
      default:
        return
    }
  }
}