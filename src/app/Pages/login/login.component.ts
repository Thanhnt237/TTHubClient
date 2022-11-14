import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoginService } from "../../Services/auth/login.service";
import { AuthService } from "../../Services/auth/auth.service";
import { Router } from "@angular/router";
import { KloudNotificationService } from "../../Components/kloud-notification/kloud-notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  apiLoading: boolean = false
  hide : boolean = true;

  constructor(
      private _formBuilder: FormBuilder,
      private _snackBar: MatSnackBar,
      private _loginService: LoginService,
      private _authService: AuthService,
      private _router: Router,
      private _kloudNoti: KloudNotificationService
  ) { }

  loginForm: FormGroup = this._formBuilder.group({
    email : new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  ngOnInit(): void {

  }

  onLogin(){
    if(!this.loginForm.valid){
      return
    }else{
      this.apiLoading = true
      this.doLogin()
    }
  }

  doLogin(){
    this._loginService.login(this.loginForm.value).subscribe(
      (res: any) => {
        this._authService.setToken(res.accessToken)
        this._kloudNoti.success("Đăng nhập thành công")
        this._router.navigate(['/'])
      },
      err => {
        this._kloudNoti.error(err)
        this.apiLoading = false
      }
    )
  }

}
