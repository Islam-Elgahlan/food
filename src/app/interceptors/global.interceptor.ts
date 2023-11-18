import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    const baseUrl: string = 'upskilling-egypt.com:3002/docs/api/v1/' ;

    let newHeaders = {};
    if (token !== null) {
      newHeaders = {
        'Authorization': token
      }
    }
    let clonedRequest = request.clone({
      setHeaders: newHeaders , url: baseUrl + request.url
    })
    return next.handle(clonedRequest);
  }
}
