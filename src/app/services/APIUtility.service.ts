import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UrlService } from '../services/url.service';
import { map } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import {UtilityService} from '../services/utility.service';

@Injectable({
    providedIn: 'root'
  })

export class APIUtilityService {
  constructor(
      private router: Router,
      private http: HttpClient,
      public urlService: UrlService,
      private httpservice : HttpService,
      private utilityService : UtilityService
      ) { }

   /**
   * @param argURL  URL for the API
   * @param argParams alldocument collection
   * @param argDoc single doc
   * */  
  DeleteDocument(argURL, argParams, argDoc)
    {
      this.httpservice.get(argURL,null).subscribe(response => {
        if(response.StatusCode == 200)
          {
            let index = argParams.indexOf(argDoc);
            argParams.splice(index,1);
            alert("document deleted Sucessfully!");  
          }
      }, 
      error => {
        this.utilityService.LogText2("error",error);
        alert(error.error.Message);
      });
    }

    
  /**
   * @param argURL  URL for the API
   * @param argParams alldocument collection
   * @param argDoc single doc
   * */    
  DownloadDocument(argURL)
    {
      let link = document.createElement('a');
      link.setAttribute('type', 'hidden');
      link.setAttribute("target","_blank");
      link.href = argURL;
      link.download = "C:/Users/admin/Downloads/";
      document.body.appendChild(link);
      link.click();
      link.remove(); 
    }
}

