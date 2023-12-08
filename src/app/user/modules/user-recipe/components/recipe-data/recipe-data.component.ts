import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRecipe } from 'src/app/admin/recipes/models/recipe';

@Component({
  selector: 'app-recipe-data',
  templateUrl: './recipe-data.component.html',
  styleUrls: ['./recipe-data.component.scss']
})
export class RecipeDataComponent {
  recipedata: string = '';
  constructor(
    public dialogRef: MatDialogRef<RecipeDataComponent> ,
     @Inject(MAT_DIALOG_DATA) public data: IRecipe) {}
     onNoClick(): void {
      this.dialogRef.close();
    }
    ngOnInit(){
      console.log(this.data)
    }
}
