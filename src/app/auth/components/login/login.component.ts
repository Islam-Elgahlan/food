import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { RequestResetPasswordComponent } from '../request-reset-password/request-reset-password.component';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  })
  constructor(
    private _AuthServiceService: AuthServiceService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    public _MatDialog: MatDialog,
    ) { }
  login(data: FormGroup) {
    console.log(data.value)
    this._AuthServiceService.login(data.value).subscribe((res) => {
      this._ToastrService.success(data.value.email, 'Welcome');
      console.log(res)
    },
      error => {
        this._ToastrService.error(error.error.message, 'Error in Login');
      })

  }
  openDialog(): void {
    const dialogRef = this._MatDialog.open(RequestResetPasswordComponent, {
      data: {},
      width: '40%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result){
        this.onResetRequest(result)
      }
    });
  }
  onResetRequest(data:string){
    this._AuthServiceService.resetRequest(data).subscribe((res)=>{
      console.log(res)
      this._ToastrService.success(res.message , 'success');
      this._Router.navigate(['/auth/reset-password'])
    },error =>{
      this._ToastrService.error(error.error.message, 'Error');
    })
  }

}
