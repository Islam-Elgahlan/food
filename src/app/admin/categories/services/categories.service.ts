import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient:HttpClient ) { }

  getCategories(data:any):Observable<any>{
    return this._HttpClient.get('Category' , {params: data});
  }
  addCategory(data:any):Observable<any>{
    return this._HttpClient.post('Category' , {name: data});
  }
}
