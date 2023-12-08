import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from '../../services/favorites.service';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
   userFavorites : any[] = []
  constructor(private _FavoritesService:FavoritesService, private _ToastrService:ToastrService ){}
  ngOnInit(){
    this.onGetUserFavorites()
  }
  onGetUserFavorites(){
    this._FavoritesService.getUserFavorite().subscribe((res)=>{
      this.userFavorites = res.data ;
      console.log(this.userFavorites)
    })
  }
  onRemoveFromFavorite(id:number){
    this._FavoritesService.removeFromFaVorite(id).subscribe((res)=>{
    this._ToastrService.success('Deleted From Fav' , 'success')
    this.onGetUserFavorites()
    },error => {
      this._ToastrService.error(error.error.message , 'error')
    }
    )
  }
}
