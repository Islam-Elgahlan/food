import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
    seed: new FormControl(null, [Validators.required]),

  })
  constructor(
    private _AuthServiceService: AuthServiceService,
    private _ToastrService: ToastrService,
    private _Router: Router,
  ) { }

  onReset(data:FormGroup){
    this._AuthServiceService.reset(data.value).subscribe((res)=>{
      this._ToastrService.success('New Password Set', 'Success');
      this._Router.navigate(['/auth/login'])
      console.log(res)
    },error=>{
      this._ToastrService.error(error.error.message, 'Error');
    })
  }
}
