import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'kloud-divider',
  templateUrl: './kloud-divider.component.html',
  styleUrls: ['./kloud-divider.component.scss']
})
export class KloudDividerComponent implements OnInit {
  @Input() displayMessage: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
