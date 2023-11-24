import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/auth/services/auth-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  changePasswordtForm = new FormGroup({
    oldPassword: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),

  })
  constructor(
    private _AuthServiceService: AuthServiceService,
    private _ToastrService: ToastrService,
    private _Router: Router,
  ) { }

  onChange(data:FormGroup){
    this._AuthServiceService.changePassword(data.value).subscribe((res)=>{
      this._ToastrService.success('New Password Set', 'Success');
      // this._Router.navigate(['/auth/login'])
      console.log(res)
    },error=>{
      this._ToastrService.error(error.error.message, 'Error');
    })
  }

}

