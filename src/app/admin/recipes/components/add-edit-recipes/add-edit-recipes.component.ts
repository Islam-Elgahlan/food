import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-add-edit-recipes',
  templateUrl: './add-edit-recipes.component.html',
  styleUrls: ['./add-edit-recipes.component.scss']
})
export class AddEditRecipesComponent {
  addEditForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    tagId: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    
  })
  constructor( private _RecipesService:RecipesService) { }
  onNoClick(): void {}
  onSubmit(data :any){
    console.log(data.value)
    this._RecipesService.addRecipies(data.value).subscribe((res)=>{
      console.log(res)
    })
  }
}

