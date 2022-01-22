import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UrlService } from '../services/url.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })

export class APIUtilityService {
  constructor(
      private router: Router,
      private http: HttpClient,
      public urlService: UrlService,
      ) { }

  public CallBack : {(arg1 : any): any;};


  /**get api call */
  public get(argurl,argParams ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    return this.http.get(argurl, {headers: headers ,params: argParams })//params
    .pipe(map(res => res));
    
    }

   /**POST api call*/
   /**get api call */
   public Post(argurl,argParams ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    return this.http.post(argurl, { params: argParams })//params
    .pipe(map(res => res));
  }


  

}

