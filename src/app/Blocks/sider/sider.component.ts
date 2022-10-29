import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss']
})
export class SiderComponent implements OnInit {
  showFiller = false;
  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
  }
}
