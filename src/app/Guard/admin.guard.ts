import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthServiceService } from '../auth/services/auth-service.service';

export const adminGuard: CanActivateFn = (route, state) => {
  inject(AuthServiceService).getProfile()
  if(localStorage.getItem('userToken') !==null && localStorage.getItem('role') =='SuperAdmin') {
    return true;
  }
  else{
    inject(Router).navigate(['/dashboard'])
    return false; 
  }
};
