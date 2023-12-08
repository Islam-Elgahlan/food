import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient:HttpClient) { }

  getUsers(data:any):Observable<any>{
    return this._HttpClient.get('Users' , {params: data});
  }
  deleteUser(id:number):Observable<any>{
    return this._HttpClient.delete(`Users/${id}`)
  }

}
