import { Component } from '@angular/core';
import { HelperService } from 'src/app/service/helper.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private _HelperService:HelperService ){}
  ngOnInit(){
    this.onGetCurrentUser();
  }
  // userName = localStorage.getItem('userName')
  currentUser: any ;
  onGetCurrentUser(){
    this._HelperService.getCurrentUser().subscribe((res)=>{
      // console.log(res)
      this.currentUser = res ;
      // console.log(this.currentUser.imagePath)
    })
  }
  
}
