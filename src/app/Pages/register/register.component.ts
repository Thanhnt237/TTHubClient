import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide : boolean = false;

  constructor(
      private _formBuilder: FormBuilder,
      private _snackBar: MatSnackBar
  ) { }

  registerForm: FormGroup = this._formBuilder.group({
    email : new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  ngOnInit(): void {

  }

  onRegister(){
    if(!this.registerForm.valid){
      return
    }else{
      console.log(this.registerForm.value)
    }
  }

}
