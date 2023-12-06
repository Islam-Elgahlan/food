import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/auth/services/auth-service.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { ChangePasswordComponent } from 'src/app/auth/components/change-password/change-password.component';

interface IMenue  {
  title:string,
  icon:string,
  link:string,
  isActive:boolean
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isOpened : boolean = true ;
  constructor(private _AuthServiceService:AuthServiceService,
     private _Router:Router,
    private _ToastrService:ToastrService,
    private _MatDialog:MatDialog
    ){}
  isAdmin(): boolean {
    return this._AuthServiceService.role == 'SuperAdmin' ? true : false
  }
  isUser(): boolean {
    return this._AuthServiceService.role == 'SystemUser' ? true : false
  }
  menue: IMenue [] = [
    {
    title: 'Home',
    icon: 'fa-house',
    link: '/dashboard/home',
    isActive: this.isAdmin() || this.isUser()

  },
  {
    title: 'Users',
    icon: 'fa-users',
    link: '/dashboard/admin/users',
    isActive: this.isAdmin()

  },
  {
    title: 'Recipes',
    icon: 'fa-utensils',
    link: '/dashboard/admin/recipes',
    isActive: this.isAdmin()

  },
  {
    title: 'Categories',
    icon: 'fa-calendar-days',
    link: '/dashboard/admin/categories',
    isActive: this.isAdmin()

  },
  {
    title: 'MyRecipes',
    icon: 'fa-utensils',
    link: '/dashboard/user/recipes',
    isActive: this.isUser()

  },
  {
    title: 'Favorates',
    icon: 'fa-heart',
    link: '/dashboard/user/favorites',
    isActive: this.isUser()

  }
]
logout(){
  localStorage.removeItem('userToken');
  localStorage.removeItem('role');
  localStorage.removeItem('userName');
  this._Router.navigate(['/auth'])
}

openDialog(): void {
  const dialogRef = this._MatDialog.open(ChangePasswordComponent, {
    data: {},
    width: '40%',
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    if(result){
      this.onResetRequest(result)
    }
  });
}
onResetRequest(data:string){
  this._AuthServiceService.resetRequest(data).subscribe((res)=>{
    console.log(res)
    this._ToastrService.success(res.message , 'success');
    this._Router.navigate(['/auth/reset-password'])
  },error =>{
    this._ToastrService.error(error.error.message, 'Error');
  })
}

}
