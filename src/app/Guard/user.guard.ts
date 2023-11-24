import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../auth/services/auth-service.service';

export const userGuard: CanActivateFn = (route, state) => {
  inject(AuthServiceService).getProfile()
  if(localStorage.getItem('userToken') !==null && localStorage.getItem('role') =='SystemUser') {
    return true;
  }
  else{
    inject(Router).navigate(['/dashboard'])
    return false; 
  }
};
