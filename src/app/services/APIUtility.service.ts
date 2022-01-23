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

      
}

