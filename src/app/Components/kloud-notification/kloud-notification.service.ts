import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KloudNotificationComponent } from "./kloud-notification.component";

enum snackType {
  success = "Success",
  error = "Error",
  warn = "Warn",
  info = "Info"
}

@Injectable({
  providedIn: 'root'
})
export class KloudNotificationService {

  constructor(
    private snackBar: MatSnackBar
  ) {}

  public openSnackBar(message: string, action: string, snackType?: snackType) {
    const _snackType = snackType ? snackType : 'Success';

    this.snackBar.openFromComponent(KloudNotificationComponent, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      data: {
        message: message,
        snackType: _snackType
      }
    });
  }

  public error(error?: any, message: any = 'Thao tác thất bại') {
    if(error?.error?.extend?.error_code){
      switch (error.error.extend.error_code){
        case "001":
          message = "Tên người dùng không tồn tại"
          break;
        case "002":
          message = "Mật khẩu không khớp"
          break;
        case "003":
          message = "Email đã tồn tại"
          break;
        case "004":
          message = "Số điện thoại đã tồn tại"
          break;
        default:
          message = "Thao tác thất bại"
          break;
      }
    }

    this.openSnackBar(message, "X", snackType.error)
  }

  public success(message: any = 'Thao tác thành công') {
    this.openSnackBar(message, "X", snackType.success)
  }

  public info(message: any = 'Thao tác thành công') {
    this.openSnackBar(message, "X", snackType.info)
  }

  public warn(message: any = 'Thao tác thành công') {
    this.openSnackBar(message, "X", snackType.warn)
  }
}
