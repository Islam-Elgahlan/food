import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private _HttpClient:HttpClient ) { }


  getRecipies(data:any):Observable<any>{
    return this._HttpClient.get('Recipe' , {params: data});
  }
  addRecipies(data:any):Observable<any>{
    return this._HttpClient.post('Recipe' , data);
  }
  deleteRecipe(id:number):Observable<any>{
    return this._HttpClient.delete(`Recipe/${id}`);
  }
}
