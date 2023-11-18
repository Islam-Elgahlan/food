import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private _HttpClient:HttpClient ) { }
  login(data:any):Observable<any>{
    return this._HttpClient.post('Users/Login' , data)

  }
}
