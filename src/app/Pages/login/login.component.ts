import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';
import {KloudDividerComponent} from "../../Components/kloud-divider/kloud-divider.component";
import { TestService } from "../../Services/test.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  hide : boolean = false;

  constructor(
      private _formBuilder: FormBuilder,
      private _snackBar: MatSnackBar,
      private _testService: TestService
  ) { }

  loginForm: FormGroup = this._formBuilder.group({
    email : new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  ngOnInit(): void {
    this._testService.test().subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }

  onLogin(){
    if(!this.loginForm.valid){
      return
    }else{
      console.log(this.loginForm.value)
    }
  }

}
