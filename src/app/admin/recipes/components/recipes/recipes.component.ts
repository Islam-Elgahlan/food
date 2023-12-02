import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { RecipesService } from '../../services/recipes.service';
import { AddEditRecipesComponent } from '../add-edit-recipes/add-edit-recipes.component';
import { addAriaReferencedId } from '@angular/cdk/a11y';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { HelperService } from 'src/app/service/helper.service';
import { ICategorey, IRecipe, IRecipeData, ITag } from '../../models/recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent {
  searchValue: string = '';
  tagId:any;
  // selectValue : any ;
  pageSize: number = 5;
  pageNumber: number | undefined = 1;
  tableResponse: IRecipeData | undefined;
  tableData: IRecipe[] | undefined = [];
  tags:ITag[] = [];
  
  constructor(private _RecipesService: RecipesService, private _HelperService:HelperService ,
    private _MatDialog: MatDialog) { }
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
  getTags(){
    return this._HelperService.getTags().subscribe((res)=>{
      this.tags = res ;
      console.log(res)
      
    })
  }
  handlePageEvent(e: PageEvent) {
    console.log(e)
    this.pageNumber = this.tableResponse?.pageNumber;
    this.pageSize = e.pageSize;
    this.getTableData()

    // this.pageEvent = e;
    // this.length = e.length;
    // this.pageSize = e.pageSize;
    // this.pageIndex = e.pageIndex;
  }


  openDialog(): void {
    const dialogRef = this._MatDialog.open(AddEditRecipesComponent, {
      data: {},
      width: '40%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.onAddCategory(result)
        this.getTableData()
      }
    });
  }
  onAddCategory(data: string) {
    this._RecipesService.addRecipies(data).subscribe((res) => {
      this.getTableData()
      console.log(res)
    })
  }
  onDeleteRecipe(id: number) {
    this._RecipesService.deleteRecipe(id).subscribe((res) => {
      this.getTableData()
      console.log(res)
    })
  }
  onDeleteDialog(categoryData: ICategorey): void {
    const dialogRef = this._MatDialog.open(DeleteDialogComponent, {
      data: categoryData,
      width: '40%',
    });
    console.log(categoryData.id)
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.onDeleteRecipe(result.id)
      }
    });
  }
  onEditDialog(categoryData: ICategorey): void {
    const dialogRef = this._MatDialog.open(AddEditRecipesComponent, {
      data: categoryData,
      width: '40%',
    
    });
    // console.log(categoryData.id)
    dialogRef.afterClosed().subscribe(result => {
      console.log(categoryData.id);
      if (result) {
        console.log(result);

        // this.onEditCategory(result ,categoryData.id)
        // this.getTableData()
      }
    });
  }
  search(term: string) {
    this.searchValue = term
    console.log(term)
    this.getTableData()
  }
  // tagChanged(arg :any) {
  //   console.log("Tag Changed " + arg.target.value);
  //   // console.log(arg);
  //   this.selectValue = arg.target.value;
  //   this.getTableData()
  // }
  onEditRecipe(RecipeData:any){
    console.log(RecipeData.id)
  }
}
