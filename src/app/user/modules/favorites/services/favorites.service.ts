import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private _HttpClient:HttpClient) { }
  getUserFavorite():Observable<any>{
    return this._HttpClient.get('userRecipe')
  }
  addToFaVorite(id : number):Observable<any>{
    return this._HttpClient.post('userRecipe' , {recipeId:id})
  }
  removeFromFaVorite(id : number):Observable<any>{
    return this._HttpClient.delete(`userRecipe/${id}`)
  }
}
