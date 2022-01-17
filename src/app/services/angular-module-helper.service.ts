import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
//import { Storage } from '@ionic/storage';
import { UtilityService } from '../services/utility.service'; 
import { CommonDtoService, TokenStatus} from './common.dto.service'; 
import { CommonService } from './common.service';
import { UrlService } from './url.service';


@Injectable({
  providedIn: 'root'
})
export class AngularModuleHelperService {

  constructor(private router: Router,
    private http: HttpClient,
    private utilityService : UtilityService,
    private commonDtoService : CommonDtoService,
    //private storage : Storage,
    private commonService: CommonService,
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
      if (Object.keys(argOptions).length === 0) {
        let options = {
          //headers: null,
          observe:'response'
        }
        argOptions = options;
      }
      
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
        this.utilityService.ValidateToken(error); 
        if(this.commonDtoService.TokenStatus == TokenStatus.Expired)
        {
            this.RefreshToken();
            // this.commonService.presentToast(this.urlService.ProcessAgain);
        }
        else if(this.commonDtoService.TokenStatus == TokenStatus.InvalidOTP)
        {
          // API returned Invalid OTP and hence routing it to the OTP page.
          //this.router.navigateByUrl(this.urlService.NavigationToOTPRoutingPage);
        }
        else
        {
          let l_Message = this.utilityService.ProcessAPIResponseForToken();
          if(l_Message)
          {
            // this.commonService.presentToast(l_Message);
          }
          else
          {
            // this.commonService.presentToast(this.urlService.SomethingWentWrong);
          }
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

        if(APIResponse)
        {
          // Act
        }
     * @param argURL  URL for the API
     * @param argParams  JSON parameter
     * @param argToastMessage  Message to display after successfully perform the API operation.
     * @param argRoutingKey  Routing key (pass null if routing is not needed !)
     */
    async HttpPostRequestAsync(argURL,argParams,argToastMessage,argRoutingKey,argOptions = {})
    {
      if (Object.keys(argOptions).length === 0) {
        let options = {
          //headers: null,
          observe:'response'
        }
        argOptions = options;
      }

      let response = await this.http.post(argURL, argParams,argOptions)
      .toPromise().then(data => {
        let dtas: any = data;
        if (dtas) {
          if(argToastMessage)
          {
            // this.commonService.presentToast(argToastMessage);
          }
          this.commonService.hideLoading();
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
        this.commonService.hideLoading();
        return dtas;
      }, error => {
        this.utilityService.ValidateToken(error); 
        if(this.commonDtoService.TokenStatus == TokenStatus.Expired)
        {
            this.RefreshToken();
            // this.commonService.presentToast(this.urlService.ProcessAgain);
        }
        else
        {
          let l_Message = this.utilityService.ProcessAPIResponseForToken();
          if(l_Message)
          {
            // this.commonService.presentToast(l_Message);
          }
          else
          {
            // this.commonService.presentToast(this.urlService.SomethingWentWrong);
          }
        }
        
        //console.log(error);
        this.utilityService.LogText(error);
        this.commonService.hideLoading();
        return null;
      });

      return response;
    }


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

    // SetStorage(argKey,argValue)
    // {
    //   this.storage.set(argKey, argValue);
    // }
    async GetStorageDataDuringOnInit(argkey) : Promise<void>
    {
      let l_Value : any;
      let dtas : any;
      // Promise.all([
      //   this.storage.get(argkey)
      // ])

      // this.storage.get(argkey)
      // .then((dtas) => {
      //     l_Value = dtas;
      //     console.log(l_Value, "GetStorageDataDuringOnInit");
      //   })
      //   .catch(error => {
      //     console.log("error");
      //   });

      // this.storage.get(argkey).then((val) => {
      //   l_Value = val;
      //   console.log(l_Value, "GetStorageDataDuringOnInit");
      // });
      //return await this.storage.get(argkey)
      
      //return l_Value;
      //return await this.storage.get(argkey);
    }

  RefreshToken()
  {
    let url = this.urlService.TokenAPI;
    this.CallBack = this.RefreshTokenCallBack.bind(this);
    let options = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/x-www-form-urlencoded',
          //'Access-Control-Allow-Origin': '*'
        }
      ),
      observe:'response',
    }
    // var data = this.utilityService.PrepareTokenAPIParams(this.commonDtoService.LoginModel);
    // this.HttpPostRequest(url,data,null,null,options);
  }

  /**
   * Get the token in case of Token status is expired.
   */  
  RefreshTokenCallBack(dtas : HttpResponse<any>)
  {
    this.utilityService.ValidateToken(dtas);    
    this.utilityService.ProcessAPIResponseForToken();
  }
}
