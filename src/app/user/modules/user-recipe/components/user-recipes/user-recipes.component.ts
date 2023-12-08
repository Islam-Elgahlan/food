import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { IRecipeData, IRecipe, ITag, ICategorey } from 'src/app/admin/recipes/models/recipe';
import { RecipesService } from 'src/app/admin/recipes/services/recipes.service';
import { HelperService } from 'src/app/service/helper.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { RecipeDataComponent } from '../recipe-data/recipe-data.component';
import { FavoritesService } from '../../../favorites/services/favorites.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.scss']
})
export class UserRecipesComponent {

  searchValue: string = '';
  tagId:any;
  // selectValue : any ;
  pageSize: number = 5;
  pageNumber: number | undefined = 1;
  tableResponse: IRecipeData | undefined;
  tableData: IRecipe[] | undefined = [];
  tags:ITag[] = [];
  
  constructor(private _RecipesService: RecipesService, private _HelperService:HelperService , private _FavoritesService:FavoritesService
   , private _ToastrService:ToastrService  , private _MatDialog: MatDialog) { }
  ngOnInit() {
    this.getTags()
    this.getTableData()
  }
  getTableData() {
    let parms = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      name: this.searchValue,
      tagId:this.tagId

    }
    this._RecipesService.getRecipies(parms).subscribe((res) => {
      this.tableResponse = res;
      this.tableData = this.tableResponse?.data;
      console.log(this.tableResponse?.totalNumberOfRecords)
    })
  }
  onAddToFavorite(id:number){
    this._FavoritesService.addToFaVorite(id).subscribe((res)=>{
    this._ToastrService.success('added to Favorites' , "added")
    })
  }
  getTags(){
    return this._HelperService.getTags().subscribe((res)=>{
      this.tags = res ;
      // console.log(res)
      
    })
  }
  handlePageEvent(e: PageEvent) {
    console.log(e)
    this.pageNumber = this.tableResponse?.pageNumber;
    this.pageSize = e.pageSize;
    this.getTableData()
  }


  openDialog(recipeItem:IRecipe): void {
    const dialogRef = this._MatDialog.open(RecipeDataComponent, {
      data: recipeItem,
      width: '40%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.onAddToFavorite(result)
        this.getTableData()
      }
    });
  }

  

  search(term: string) {
    this.searchValue = term
    console.log(term)
    this.getTableData()
  }

}
