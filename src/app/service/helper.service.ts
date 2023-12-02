import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private _HttpClient:HttpClient) { }
  getTags():Observable<any>{
    return this._HttpClient.get('tag')
  }
  getCategories():Observable<any>{
    return this._HttpClient.get('Category' , { params: { pageSize:100} });
  }
}
