import { Component } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';

interface ICategorey {
  id: number,
  name: string,
  creationDate: string,
  modificationDate: string,

}
interface ICategoreyData {
  pageNumber: number,
  pageSize: number,
  data: ICategorey[],
  totalNumberOfRecords: number,
  totalNumberOfPages: number
}
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  searchValue: string = '';
  pageSize: number = 5;
  pageNumber: number | undefined = 1;
  tableResponse: ICategoreyData | undefined;
  tableData: ICategorey[] | undefined = [];

  constructor(private _CategoriesService: CategoriesService,
    private _MatDialog: MatDialog) { }
  ngOnInit() {
    this.getTableData()
  }

  getTableData() {
    let parms = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      name: this.searchValue

    }
    this._CategoriesService.getCategories(parms).subscribe((res) => {
      this.tableResponse = res;
      this.tableData = this.tableResponse?.data;
      console.log(this.tableResponse?.totalNumberOfRecords)
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
  search(term: string) {
    this.searchValue = term
    // console.log(term)
    this.getTableData()
  }

  openDialog(): void {
    const dialogRef = this._MatDialog.open(AddEditCategoryComponent, {
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
    this._CategoriesService.addCategory(data).subscribe((res) => {
      this.getTableData()
      console.log(res)
    })
  }
  onDeleteCategory(id: number) {
    this._CategoriesService.deleteCategory(id).subscribe((res) => {
      this.getTableData()
      console.log(res)
    })
  }
  onEditCategory(data:any ,id:number) {
    this._CategoriesService.updateCategory(data , id).subscribe((res) => {
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
        // this.onDeleteCategory(result.id)
      }
    });
  }
  onEditDialog(categoryData: ICategorey): void {
    const dialogRef = this._MatDialog.open(AddEditCategoryComponent, {
      data: categoryData,
      width: '40%',
    
    });
    // console.log(categoryData.id)
    dialogRef.afterClosed().subscribe(result => {
      console.log(categoryData);
      if (result) {
        console.log(result.id);

        // this.onEditCategory(result.name ,result.id)
        // this.getTableData()
      }
    });
  }
}
