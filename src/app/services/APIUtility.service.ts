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


  /** post method to call api */
  HttpPostRequest(argURL,argParams)
    {      
      this.http.post(argURL, argParams)
      .subscribe((data) => {
        let dtas  = data;
        if (dtas) {
          if(this.CallBack)
          {
             this.CallBack(dtas);
             this.CallBack = null;
          }
        }
      },error => {
          //this.utilityService.LogText(error);
          //console.log(error);
        })
    }

  // /** Get method to call api */
  HttpGetRequest(argURL,argParams)
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    this.http.get(argURL, { headers: headers })
      .subscribe(data => {
        let dtas: any = data;
        if (dtas) {
          if(this.CallBack)
          {
             this.CallBack(dtas);
             this.CallBack = null;
          }
        }
      }, error => {
        console.log(error);
      });
  }

}

