import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { CommonService } from './common.service'; 
import { CommonDtoService, CRUDOperation, TokenStatus} from './common.dto.service'; 
import { UrlService } from './url.service';
import { LoginModel } from './CommonModel';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  

  constructor(private router: Router,
    private http: HttpClient,
    public commonService: CommonService, 
    public commonDtoService : CommonDtoService,
    private urldata: UrlService,
    ) { }    
  

  LogText(argText)
  {
    console.log(argText);
  }
  
  LogText1(argKey,argText)
  {
    //console.log(argKey,argText);
  }
  

  

  /**
   * Validtes the token ,check the headers reurned from API and set the TokenStatus
   * This also sets the access token to the Login Model.
   * @param argResponse 
   */
  ValidateToken(argResponse : HttpResponse<any>)  
  {
      if(this.HasHeaderValue(argResponse, this.urldata.HEADER_INVALIDOTP))
      {
          this.commonDtoService.TokenStatus = TokenStatus.InvalidOTP;
      }
      else if(this.HasHeaderValue(argResponse,this.urldata.HEADER_TOKEN_EXPIRED))
      {
          this.commonDtoService.TokenStatus = TokenStatus.Expired;
      }
      else if(this.HasHeaderValue(argResponse,this.urldata.HEADER_UNAUTHENTICATED))
      {
          this.commonDtoService.TokenStatus = TokenStatus.UnAuthenticated;
      }
      else if(this.HasHeaderValue(argResponse,this.urldata.HEADER_PHONE_NOT_REGISTERED))
      {
          this.commonDtoService.TokenStatus = TokenStatus.DeviceNOtRegistered;
      }
      else if(this.HasHeaderValue(argResponse,this.urldata.HEADER_UNAUTHORIZED_ACCESS))
      {
          this.commonDtoService.TokenStatus = TokenStatus.UnAuthorizedAccess;
      }
      else if(this.HasHeaderValue(argResponse,this.urldata.HEADER_AUTHENTICATED))
      {
        this.commonDtoService.LoginModel.TokenDetails = argResponse.body.access_token;        
        this.commonDtoService.TokenStatus = TokenStatus.ValidToken;
      }
      else 
      {
        //this.commonDtoService.LoginModel.TokenDetails = argResponse.body.access_token;        
        this.commonDtoService.TokenStatus = TokenStatus.Default;
      }
  }

  HasHeaderValue(argResponse :  HttpResponse<any>, argHeaderKey) : boolean
  {
    let l_headerPresent : boolean = false;
     if(argResponse.headers)
     {
        if(argResponse.headers.has(argHeaderKey))
        {
          l_headerPresent = true;
        }
        else
        {
          l_headerPresent = false;
        }
     }
     else
     {
       l_headerPresent = false;
     }

     return l_headerPresent;
  }

  /**
   * Process response API headers and return respective error message
   */
  ProcessAPIResponseForToken() : string
  {
    let l_Message = null;
    switch(this.commonDtoService.TokenStatus)
    {
      case TokenStatus.ValidToken:
          // Set Token in storage and in the common object.
          // I believe setting in storage is not required as in case of re-login any way
          // User needs to re-enter credentials.
          this.commonDtoService.TokenVerified = true;
          break;
      case TokenStatus.UnAuthorizedAccess:
          // Token is valid but user is not allowed to access the API.
          this.commonDtoService.TokenVerified = false;
          l_Message = this.urldata.MESSAGE_HEADER_UNAUTHORIZED_ACCESS;
          break;
      case TokenStatus.DeviceNOtRegistered:
          // Device is not registered in NKBPL and hence breach of security !
          this.commonDtoService.TokenVerified = false;
          l_Message = this.urldata.MESSAGE_HEADER_PHONE_NOT_REGISTERED;
          break;          
      case TokenStatus.Expired:
          // Token expired , get the token again / re-login and process further.
          this.commonDtoService.TokenVerified = false;

          break;
      case TokenStatus.UnAuthenticated:
          this.commonDtoService.TokenVerified = false;
          l_Message = this.urldata.MESSAGE_HEADER_UNAUTHENTICATED;
          break;
      case TokenStatus.Default:
          this.commonDtoService.TokenVerified = false;
          break;
    }

    return l_Message;
  }

  /**
   * This shall call the token api and set the token in the storage.
   * the token no shall be sent along with all the API requests.
   * If token gets exired at any point .. this function shall be called !
   */
  CallTokenAPIAndSetTheToken()
  {
      
  }

  PrepareTokenAPIParams(argLoginObj : LoginModel) : string
  {
    // AppVersion is sent in case we do not want to give access to a specific version.
    let data = "UserName=" + argLoginObj.UserName + "&Password=" +  
    argLoginObj.Password + "&grant_type=password"+ "&AccessType="+ argLoginObj.AccessType
    +"&IMEI=" +argLoginObj.IMEI + "&AppVersion=" + this.commonDtoService.AppVersion
    +"&OTPToken=" + argLoginObj.OTPToken + "&ApplicationID="+this.commonDtoService.GetApplicationIdForLogin() ;
    return data;
  }

  PrepareRequestHeaderWithToken()
  {
    let options = {
      headers: new HttpHeaders(
        {
           'Authorization' : 'Bearer '+ this.commonDtoService.LoginModel.TokenDetails

        }
      ),
      observe:'response'
    }

    return options;
  }



 

}
