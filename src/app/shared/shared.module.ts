import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { ChangePasswordComponent } from '../auth/components/change-password/change-password.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';



@NgModule({
  declarations: [

    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    ChangePasswordComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule,
    


  ],
  exports: [
    SharedRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    DeleteDialogComponent
  ]
})
export class SharedModule { }
