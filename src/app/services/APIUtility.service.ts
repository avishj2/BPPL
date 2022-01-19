import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UtilityService } from "./utility.service";
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
        public utilityService : UtilityService,
      
        ) { }

  public CallBack : {(arg1 : any): any;};


  /**get api call */
  public get(argurl ): Observable<any> {
    // const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + 'Access Token Here' })
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    // const headers= new HttpHeaders()
    // .set('content-type', 'application/json')
    // .set('Access-Control-Allow-Origin', '*');
    //return this.http.get(argurl)
    return this.http.get(argurl, { headers })
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
          this.utilityService.LogText(error);
          //console.log(error);
        })
    }

  // /** Get method to call api */
  HttpGetRequest(argURL,argParams)
  {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    // .set('Content-Type', 'application/x-www-form-urlencoded')
    // .set('Access-Control-Allow-Origin', '*');
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
        this.utilityService.LogText(error);
        
      });
  }

}

