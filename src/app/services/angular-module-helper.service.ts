import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UrlService } from './url.service';


@Injectable({
  providedIn: 'root'
})
export class AngularModuleHelperService {

  constructor(private router: Router,
    private http: HttpClient,
    public urlService: UrlService
    ) { }

    public CallBack : {(arg1 : any): any;};

    /**
     * HTTP Post request method for the API.
     * @param argURL  URL for the API
     * @param argParams  JSON parameter
     * @param argToastMessage  Message to display after successfully perform the API operation.
     * @param argRoutingKey  Routing key (pass null if routing is not needed !)
     */
    HttpPostRequest(argURL,argParams,argToastMessage,argRoutingKey,argOptions = {})
    {      
      // if (Object.keys(argOptions).length === 0) {
      //   let options = {
      //     //headers: null,
      //     observe:'response'
      //   }
      //   argOptions = options;
      // }
      
      //argOptions.observe = 'response';
      this.http.post(argURL, argParams,argOptions)
      .subscribe((data) => {
        let dtas  = data;
        if (dtas) {
          if(argToastMessage)
          {
            // this.commonService.presentToast(argToastMessage);
          }
          this.commonService.hideLoading();
          if(this.CallBack)
          {
             this.CallBack(dtas);
             this.CallBack = null;
          }
          if(argRoutingKey)
          {
            this.router.navigateByUrl(argRoutingKey);
          }
        }
      }, error => {
            // this.commonService.presentToast(l_Message);
            // this.commonService.presentToast(this.urlService.SomethingWentWrong);
        }
        
        //console.log(error);
        this.utilityService.LogText(error);
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
    async HttpPostRequestAsync(argURL,argParams,argToastMessage,argRoutingKey,argOptions = {})
    {
      let response = await this.http.post(argURL, argParams,argOptions)
      .toPromise().then(data => {
        let dtas: any = data;
        if (dtas) {
          // if(argToastMessage)
          // {
          //   // this.commonService.presentToast(argToastMessage);
          // }
          //this.commonService.hideLoading();
          if(this.CallBack)
          {
             this.CallBack(dtas);
             this.CallBack = null;
          }
          if(argRoutingKey)
          {
            this.router.navigateByUrl(argRoutingKey);
          }
        }
        //this.commonService.hideLoading();
        return dtas;
      },  error => {
        // this.commonService.presentToast(l_Message);
        // this.commonService.presentToast(this.urlService.SomethingWentWrong);
    }
    
    //console.log(error);
    this.utilityService.LogText(error);
    this.commonService.hideLoading();
  });
      return response;
    }

  /**
   * get method to api call
   * */  
  HttpGetRequest(argURL,argParams,argToastMessage,argRoutingKey, argOptions = {})
    {
      
      this.http.get(argURL, argOptions)
      .subscribe(data => {
        let dtas: any = data;
        if (dtas) {
          if(argToastMessage)
          {
            // this.commonService.presentToast(argToastMessage);
          }
          if(this.CallBack)
          {
             this.CallBack(dtas);
             this.CallBack = null;
          }
          //this.loadingController.hideLoading();
          if(argRoutingKey)
          {
            this.router.navigateByUrl(argRoutingKey);
          }
        }
      }, error => {
        // this.commonService.presentToast(this.urlService.PleaseCheckInternetConnection);
        //console.log(error);
        this.utilityService.LogText(error);
        this.commonService.hideLoading();
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
}
