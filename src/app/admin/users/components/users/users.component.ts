import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { IUsers, IUsersData } from '../../../users/models/users'
import { UsersService } from '../../services/users.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  constructor(private _UsersService: UsersService, private _MatDialog: MatDialog) { }

  searchValue: string = '';
  groupId:number = 0
  pageSize: number = 5;
  pageNumber: number | undefined = 1;
  tableResponse: IUsersData | undefined;
  tableData: IUsers[] | undefined = [];
  ngOnInit() {
    this.getTableData()
  }
  getTableData() {
    let parms= {}
    if(this.groupId == 1 || this.groupId == 2){
      parms = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        userName: this.searchValue,
        groups: this.groupId,
  
      }
    }else {
      parms = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        userName: this.searchValue,
  
      }
    }
  
    this._UsersService.getUsers(parms).subscribe((res) => {
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

  }
  onDeleteDialog(userData: IUsers): void {
    const dialogRef = this._MatDialog.open(DeleteDialogComponent, {
      data: userData,
      width: '40%',
    });
    console.log(userData.id)
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.onDeleteUser(result.id)
      }
    });
  }
onDeleteUser(id:number){
  this._UsersService.deleteUser(id).subscribe((res)=>{
    this.getTableData()
  })
}


}
