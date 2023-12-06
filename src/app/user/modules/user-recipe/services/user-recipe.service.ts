import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRecipeService {

  constructor( private _HttpClient:HttpClient) { }

  getUserRecipes():Observable<any>{
    return this._HttpClient.get('userRecipe')
  }
}
