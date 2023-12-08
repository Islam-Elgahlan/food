import { Component } from '@angular/core';
import { HelperService } from 'src/app/service/helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  ngOnInit(){
    this.onGetCurrentUser();
  }
  userName:any
  constructor(private _HelperService:HelperService){}
  // userName = localStorage.getItem('userName')
  onGetCurrentUser(){
    this._HelperService.getCurrentUser().subscribe((res)=>{
      this.userName = res.userName ;
    })
  }
}
