import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UrlService } from '../services/url.service';
import { HttpService } from '../services/http.service';
import {UtilityService} from '../services/utility.service';
import { User } from '../Model/Base.model';
import MenuData from 'src/app/dash-board/menu.json';

@Injectable({
    providedIn: 'root'
  })

export class APIUtilityService {
  _MenuJsonData = MenuData;
  DisplayMenuItems = [];

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
      private router: Router,
      private http: HttpClient,
      public urlService: UrlService,
      private httpservice : HttpService,
      private utilityService : UtilityService
      ) { 
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
      }

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
            alert("Document deleted Sucessfully!");  
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

  public get currentUserValue(): User 
  {
      return this.currentUserSubject.value;
  }

  login(username: string, password: string) 
  {
    return this.httpservice.Post(this.urlService.Authenticate, { username, password })
        .pipe(map((user : User) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
}

