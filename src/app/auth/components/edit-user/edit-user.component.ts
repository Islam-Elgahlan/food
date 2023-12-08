import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/service/helper.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  currentUser: any ;
  imgSrc: any;
  updateForm = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    country : new FormControl(null, [Validators.required]),
    phoneNumber : new FormControl(null, [Validators.required ]),
    profileImage : new FormControl(null),
    confirmPassword : new FormControl(null, [Validators.required])
  })
  constructor(
    private _AuthServiceService: AuthServiceService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _HelperService:HelperService,
    ) { }
    ngOnInit(){
      this.onGetCurrentUser()
    }
    onEditUser(data: FormGroup) {
      let myData = new FormData()
      let myMap = new Map(Object.entries(data.value))
      for (const [key,value] of myMap){
        myData.append(key , data.value[key])
        myData.append('imagePath', this.imgSrc, this.imgSrc.name);

      }
    // console.log(data.value)
    this._AuthServiceService.updateUser(data.value).subscribe((res) => {
      this._ToastrService.success('Data Updated', 'Success');
      this._Router.navigate(['dashboard/home'])
      // console.log(res)
      
    },
      error => {
        this._ToastrService.error(error.error.message, 'Error in Update');
      })

  }
 
  onGetCurrentUser(){
    this._HelperService.getCurrentUser().subscribe((res)=>{
      this.currentUser = res ;
      // console.log(this.currentUser)
      this.imgSrc = 'https://upskilling-egypt.com/' + this.currentUser.imagePath
      this.updateForm.patchValue({
        userName: this.currentUser?.userName,
        email: this.currentUser?.email,
        country: this.currentUser?.country,
        phoneNumber: this.currentUser?.phoneNumber,
        confirmPassword: this.currentUser?.confirmPassword,
      })
    })
  }




  files: File[] = [];

  onSelect(event: any) {
    console.log(event.addedFiles[0].name);
    this.imgSrc = event.addedFiles[0];
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  
}
