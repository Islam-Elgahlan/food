import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RecipesService } from '../../services/recipes.service';
import { HelperService } from 'src/app/service/helper.service';
import { ICategorey, IRecipe, IRecipeData, ITag } from '../../models/recipe';
import { ActivatedRoute, Router } from '@angular/router';

ActivatedRoute
@Component({
  selector: 'app-add-edit-recipes',
  templateUrl: './add-edit-recipes.component.html',
  styleUrls: ['./add-edit-recipes.component.scss']
})

export class AddEditRecipesComponent {

  tags: ITag[] = [];
  categories: ICategorey[] = [];
  imgSrc: any;
  recipeId: any;
  recipeData:any;

  addEditForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    tagId: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    categoriesIds: new FormControl(null, [Validators.required]),

  })

  constructor(
    private _RecipesService: RecipesService,
    private _HelperService: HelperService,
    private _ToastrService: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router:Router
  ) {
    this.recipeId = _ActivatedRoute.snapshot.paramMap.get('id')
    this.getRecipeDataById(this.recipeId)
  }
  ngOnInit() {
    this.getTags()
    this.getAllCategories()
  }
  onNoClick(): void { }
  onSubmit(data: FormGroup) {
    console.log(data.value)

    

    let myData = new FormData()
    myData.append('name', data.value.name);
    myData.append('price', data.value.price);
    myData.append('description', data.value.description);
    myData.append('tagId', data.value.tagId);
    myData.append('categoriesIds', data.value.categoriesIds);
    myData.append('recipeImage', this.imgSrc, this.imgSrc.name);


    this._RecipesService.addRecipies(myData).subscribe((res) => {
      console.log(res)
      this._ToastrService.success(res.message, 'Added successfully');
      this._Router.navigate(['/dashboard/admin/recipes'])
    },
      error => {
        this._ToastrService.error(error.error.message, 'Error');
      })
  }
  onEdit(data: any) {
    console.log(data.value)
    this.addEditForm.patchValue({
      name:this.recipeData?.name,
      price:this.recipeData?.price,
      description:this.recipeData?.description,
      tagId:this.recipeData?.tagg.id,
      categoriesIds:this.recipeData?.category[0].id,

    })

    let myData = new FormData()
    myData.append('name', data.value.name);
    myData.append('price', data.value.price);
    myData.append('description', data.value.description);
    myData.append('tagId', data.value.tagId);
    myData.append('categoriesIds', data.value.categoriesIds);
    myData.append('recipeImage', this.imgSrc, this.imgSrc.name);

    if (this.recipeId) {
      // Edit
      this._RecipesService.editRecipe(this.recipeId, myData).subscribe((res) => {
        console.log(res)
        this._ToastrService.success(res.message, 'Updated ');
      },
        error => {
          this._ToastrService.error(error.error.message, 'Error');
        })
    } else {
      //Add 
    }

  }

  getTags() {
    return this._HelperService.getTags().subscribe((res) => {
      this.tags = res;
      // console.log(res)

    })
  }
  getAllCategories() {
    return this._HelperService.getCategories().subscribe((res) => {
      this.categories = res.data;
      // console.log(this.categories)
    })
  }
  getRecipeDataById( id:number) {
    return this._RecipesService.getRecipieById(this.recipeId).subscribe((res)=>{
      this.recipeData = res;
      console.log(res)

      this.addEditForm.patchValue({
        name:this.recipeData?.name,
        price:this.recipeData?.price,
        description:this.recipeData?.description,
        tagId:this.recipeData?.tagg.id,
        categoriesIds:this.recipeData?.category[0]
  
      })
      console.log(this.addEditForm)
    })
   
  }
  files: File[] = [];

  onSelect(event: any) {
    console.log(event.addedFiles[0].name);
    this.imgSrc = event.addedFiles[0];
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}

