import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { UserRecipeModule } from './modules/user-recipe/user-recipe.module';
import { FavoritesModule } from './modules/favorites/favorites.module';

const routes: Routes = [
  {path: '' , component:UserComponent},
  {
    path: 'recipes',
    loadChildren: () => import('./modules/user-recipe/user-recipe.module').then(m => UserRecipeModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./modules/favorites/favorites.module').then(m => FavoritesModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
