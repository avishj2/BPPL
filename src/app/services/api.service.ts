import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, timeout } from 'rxjs/operators';
import { CommonService } from './common.service';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = ""; //environment.API_URL;
  timeout = 25000;

  constructor(public http: HttpClient, public commonService: CommonService, public storageService: StorageService) { }

  public createHeaders() {

    const headers: any = {
      'Content-Type': 'application/json'
    };
    const options = new HttpHeaders(headers);
    return options;
  }

  public handelError(err): Observable<any> {
    if (err.name === 'TimeoutError') {
      this.commonService.showAlert('Server is taking too much time, please try agin.');
    } else {
      this.commonService.showAlert('Something goes wrong, please trya again.');
    }
    return throwError(err);
  }

  get(endpoint: string, params?: any) {
    const options: any = {
      headers: this.createHeaders(),
      params: new HttpParams(),
      observe: 'response'
    };

    if (params) {
      // tslint:disable-next-line: forin
      for (const k in params) {
        options.params = options.params.set(k, params[k]);
      }
    }
    return this.http.get(this.url + endpoint, options)
      .pipe(
        timeout(this.timeout),
        map((data: any) => {
          // console.log(data.headers.keys());
          return data.body ? data.body : data;
        }), catchError((error: HttpErrorResponse) => {
          return this.handelError(error);
        }));
  }


  post(endpoint: string, body?: any) {
    const options: any = {
      headers: this.createHeaders(),
      observe: 'response'
    };

    return this.http.post(this.url + endpoint, body, options)
      .pipe(
        timeout(this.timeout),
        map((data: any) => {
          // console.log(data.headers.keys());
          return data.body ? data.body : data;
        }), catchError((error: HttpErrorResponse) => {
          return this.handelError(error);
        }));
  }

  put(endpoint: string, body?: any) {

    const options: any = {
      headers: this.createHeaders(),
      observe: 'response'
    };

    return this.http.put(this.url + endpoint, body, options)
      .pipe(
        timeout(this.timeout),
        map((data: any) => {
          // console.log(data.headers.keys());
          return data.body ? data.body : data;
        }), catchError((error: HttpErrorResponse) => {
          return this.handelError(error);
        }));
  }

}



