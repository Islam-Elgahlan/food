import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRecipeRoutingModule } from './user-recipe-routing.module';
import { UserRecipesComponent } from './components/user-recipes/user-recipes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipeDataComponent } from './components/recipe-data/recipe-data.component';


@NgModule({
  declarations: [
    UserRecipesComponent,
    RecipeDataComponent
  ],
  imports: [
    CommonModule,
    UserRecipeRoutingModule,
    SharedModule
  ]
})
export class UserRecipeModule { }
