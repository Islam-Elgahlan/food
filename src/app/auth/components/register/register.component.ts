import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    country : new FormControl(null, [Validators.required]),
    phoneNumber : new FormControl(null, [Validators.required ]),
    profileImage : new FormControl(null),
    password: new FormControl(null, [Validators.required]),
    confirmPassword : new FormControl(null, [Validators.required])
  })
  constructor(
    private _AuthServiceService: AuthServiceService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    public _MatDialog: MatDialog,
    ) { }
    onRegister(data: FormGroup) {
    console.log(data.value)
    this._AuthServiceService.register(data.value).subscribe((res) => {
      this._ToastrService.success(data.value.email, 'Welcome');
      console.log(res)
      this._Router.navigate(['/dashboard'])
    },
      error => {
        this._ToastrService.error(error.error.message, 'Error in Login');
      })

  }
 


  // openDialog(): void {
  //   const dialogRef = this._MatDialog.open(RequestResetPasswordComponent, {
  //     data: {},
  //     width: '40%',
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //     if(result){
  //       this.onResetRequest(result)
  //     }
  //   });
  // }
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
