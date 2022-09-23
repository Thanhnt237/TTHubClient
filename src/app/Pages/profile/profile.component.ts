import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  breakpoint: any = null;

  constructor(
      private _formBuilder: FormBuilder,
      private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6
  }

  createPostForm: FormGroup = this._formBuilder.group({
    postContent : new FormControl('', [Validators.required, Validators.email])
  });

  onSubmitForm(){

  }
}
