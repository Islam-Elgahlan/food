import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from 'src/app/models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private _HttpClient:HttpClient ) { }
  login(data:ILogin):Observable<any>{
    return this._HttpClient.post('Users/Login' , data)
  }
  resetRequest(data:any):Observable<any>{
    return this._HttpClient.post('Users/Reset/Request' , {email:data})
  }
  reset(data:any):Observable<any>{
    return this._HttpClient.post('Users/Reset' , data)
  }
}
