import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  breakpoint: any = null;

  constructor(
  ) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  }
}
