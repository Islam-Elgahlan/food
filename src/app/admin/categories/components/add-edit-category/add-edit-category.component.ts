import { Component ,Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent {
  category: string = '';
  constructor(
    public dialogRef: MatDialogRef<AddEditCategoryComponent> ,
     @Inject(MAT_DIALOG_DATA) public data: any,) {}
    onNoClick(): void {
      this.dialogRef.close();
      // console.log(this.data)
    }
}
