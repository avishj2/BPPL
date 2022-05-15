import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIUtilityService } from './APIUtility.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private apiUtilityService: APIUtilityService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        const currentUser = this.apiUtilityService.currentUserValue;
        return next.handle(
          req.clone({ setHeaders: 
            { Authorization: `Bearer ${currentUser.Token}` } }));
    }
}