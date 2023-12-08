import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { ILogin, IRrgister } from 'src/app/models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  role:string|null =''
  constructor(private _HttpClient:HttpClient ) {
    if(localStorage.getItem('userToken') !== null){
      this.getProfile();
    }
   }

  getProfile(){
    let encoded:any = localStorage.getItem('userToken');
    let decoded:any = jwtDecode(encoded);
    console.log(decoded.userGroup)

    localStorage.setItem('role' , decoded.userGroup)
    localStorage.setItem('userName' , decoded.userName)
    this.getRole()
  }
  getRole(){
    if(localStorage.getItem('userToken') !== null && localStorage.getItem('role')){
      this.role = localStorage.getItem('role')
    }
  }
  login(data:ILogin):Observable<any>{
    return this._HttpClient.post('Users/Login' , data)
  }
  resetRequest(data:any):Observable<any>{
    return this._HttpClient.post('Users/Reset/Request' , {email:data})
  }
  reset(data:any):Observable<any>{
    return this._HttpClient.post('Users/Reset' , data)
  }
  changePassword(data:any):Observable<any>{
    return this._HttpClient.put('Users/ChangePassword' , data)
  }
  register(data:IRrgister):Observable<any>{
    return this._HttpClient.post('Users/Register' , data)
  }
  verify(data:any):Observable<any>{
    return this._HttpClient.put('Users/verify' , data)
  }
  updateUser(data:IRrgister):Observable<any>{
    return this._HttpClient.put('Users' , data)
  }
}
