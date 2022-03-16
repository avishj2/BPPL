import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UrlService } from './url.service';
import {CommonService} from './common.service';
import {UtilityService} from './utility.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private router: Router,
    private http: HttpClient,
    public urlService: UrlService,
    public commonService : CommonService,
    public utilityService : UtilityService
    ) { }

    public CallBack : {(arg1 : any): any;};

    /**
     * HTTP Post request method for the API.
     * @param argURL  URL for the API
     * @param argParams  JSON parameter
     * @param argToastMessage  Message to display after successfully perform the API operation.
     * @param argRoutingKey  Routing key (pass null if routing is not needed !)
     */
    HttpPostRequest(argURL,argParams,successCallBackFunction : {(arg : any) : any;}, errorCallBackFunction : {(arg : any) : any;})
    {      
      this.http.post(argURL, argParams)
      .subscribe((data) => {
        let dtas  = data;
        this.commonService.hideLoading();
        if(successCallBackFunction)
        {
           successCallBackFunction(data);
        }
      }, error => {
            this.utilityService.LogText(error);   
            if(errorCallBackFunction)
            {
                errorCallBackFunction(error.error);
            }      
            this.commonService.hideLoading();
      });
    }

    /**
     * HTTP Post request method for the API. Can use async and await with this.
     * Use as below :
     * let APIResponse: any =await this.HttpPostRequestAsync(....);
     * @param argURL  URL for the API
     * @param argParams  JSON parameter
     * @param argToastMessage  Message to display after successfully perform the API operation.
     * @param argRoutingKey  Routing key (pass null if routing is not needed !)
     */
    async HttpPostRequestAsync(argURL,argParams,successCallBackFunction : {(arg : any) : any;}, errorCallBackFunction : {(arg : any) : any;})
    {
      let response = await this.http.post(argURL, argParams)
      .toPromise().then(data => {
        let dtas: any = data;
        if(successCallBackFunction)
        {
            successCallBackFunction(data);
        }
        //this.commonService.hideLoading();
        return dtas;
      },  error => {
    
      //console.log(error);
      this.utilityService.LogText(error);
      if(errorCallBackFunction)
         {
            errorCallBackFunction(error);
         }
    });
      return response;
    }

  /**
   * get method to api call
   * */  
  HttpGetRequest(argURL,successCallBackFunction : {(arg : any) : any;} = null, errorCallBackFunction : {(arg : any) : any;} = null, argOptions = {})
    {
      
      this.http.get(argURL, argOptions)
      .subscribe(data => {
        let dtas: any = data;
        if(successCallBackFunction)
        {
           successCallBackFunction(data);
        }
      }, error => {
        // this.commonService.presentToast(this.urlService.PleaseCheckInternetConnection);
        //console.log(error);
        this.utilityService.LogText(error);
        if(errorCallBackFunction)
         {
            errorCallBackFunction(error);
         }
      });
    
   
    }


  RefreshToken()
  {
    // let url = this.urlService.TokenAPI;
    // this.CallBack = this.RefreshTokenCallBack.bind(this);
    // let options = {
    //   headers: new HttpHeaders(
    //     {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //       //'Access-Control-Allow-Origin': '*'
    //     }
    //   ),
    //   observe:'response',
    // }
    // var data = this.utilityService.PrepareTokenAPIParams(this.commonDtoService.LoginModel);
    // this.HttpPostRequest(url,data,null,null,options);
  }

  /**
   * Get the token in case of Token status is expired.
   */  
  RefreshTokenCallBack(dtas : HttpResponse<any>)
  {
    // this.utilityService.ValidateToken(dtas);    
    // this.utilityService.ProcessAPIResponseForToken();
  }

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
    return this.http.post(argurl, argParams)//params
    .pipe(map(res => res));
  }
  
}
