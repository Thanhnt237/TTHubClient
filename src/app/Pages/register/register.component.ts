import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import { SignUpService } from "../../Services/auth/sign-up.service";
import { AuthService } from "../../Services/auth/auth.service";
import { Router } from "@angular/router";
import { KloudNotificationService } from "../../Components/kloud-notification/kloud-notification.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  apiLoading: boolean = false
  hide : boolean = false;

  constructor(
      private readonly _router: Router,
      private _formBuilder: FormBuilder,
      private _snackBar: MatSnackBar,
      private readonly signUpService: SignUpService,
      private readonly authService: AuthService,
      private readonly _kloudNoti: KloudNotificationService
  ) { }

  registerForm: FormGroup = this._formBuilder.group({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    email : new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  ngOnInit(): void {

  }

  onRegister(){
    if(!this.registerForm.valid){
      return
    }else{
      this.apiLoading = true
      this.doSignUp()
    }
  }

  doSignUp(){
    this.signUpService.signUp(this.registerForm.value).subscribe(
      (res: any) => {
        this._kloudNoti.success("Đăng ký thành công")
        this.authService.setToken(res.accessToken)
        this._router.navigate(['/'])
      }, err => {
        console.log(err)
        this._kloudNoti.error(err)
        this.apiLoading = false
      }
    )
  }

}
