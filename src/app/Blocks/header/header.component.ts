import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { AuthService } from "../../Services/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Output() eventToggleSider = new EventEmitter<string>();

  constructor(
    public _authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onToggleSider(){
    this.eventToggleSider.emit()
  }

}
