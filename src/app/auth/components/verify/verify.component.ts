import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../../services/auth-service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {
  verifyForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    code: new FormControl(null, [Validators.required]),

  })
  constructor(
    public dialogRef: MatDialogRef<VerifyComponent> ,
    private _AuthServiceService: AuthServiceService,
    private _ToastrService: ToastrService,
    private _Router: Router,
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

  // onReset(data:FormGroup){
  //   this._AuthServiceService.reset(data.value).subscribe((res)=>{
  //     this._ToastrService.success('New Password Set', 'Success');
  //     this._Router.navigate(['/auth/login'])
  //     console.log(res)
  //   },error=>{
  //     this._ToastrService.error(error.error.message, 'Error');
  //   })
  // }

  onSubmit(data:FormGroup){
    console.log(data.value)
    this._AuthServiceService.verify(data.value).subscribe((res)=>{
    this._ToastrService.success('Welcom','Well')
    this._Router.navigate(['auth/login'])
    this.onNoClick()
    
    },error => {
      this._ToastrService.error(error.error.message , "fail")
    })
  }

}
