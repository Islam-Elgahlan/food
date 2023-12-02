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
    const token = localStorage.getItem('userToken');
    const baseUrl: string = 'https://upskilling-egypt.com:443/api/v1/' ;

    let newHeaders = {};
    if (token !== null) {
      newHeaders = {
        'Authorization':`Bearer ${token}`
      }
    }
    let clonedRequest = request.clone({
      setHeaders: newHeaders , url: baseUrl + request.url
    })
    console.log(clonedRequest)
    return next.handle(clonedRequest);
  }
}
