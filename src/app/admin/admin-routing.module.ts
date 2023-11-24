import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  {path:'' , component:AdminComponent},
  {
    path: 'users',
    loadChildren: () => import('././users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'recipes',
    loadChildren: () => import('././recipes/recipes.module').then(m => m.RecipesModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('././categories/categories.module').then(m => m.CategoriesModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
