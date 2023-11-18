import { Component } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(null,[Validators.required]),
    password: new FormControl(null , [Validators.required])

  })
  constructor(private _AuthServiceService: AuthServiceService) { }
  login(data: FormGroup) {
    console.log(data.value)
    this._AuthServiceService.login(data.value).subscribe({
      next:(res)=> {
        console.log(res)
      }
     })
    
  }
}
