import { Injectable } from '@angular/core';

import { CommonService } from 'src/app/services/common.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { CommonDtoService, AccessType } from 'src/app/services/common.dto.service';
import { UrlService } from 'src/app/services/url.service';
import { AngularModuleHelperService } from 'src/app/services/angular-module-helper.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { UtilityService } from 'src/app/services/utility.service';
//import { Uid } from '@ionic-native/uid/ngx';
//import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { StorageService } from 'src/app/services/storage.service';
import { LoginModel } from '../CommonModels/CommonModel';
//import { ModalController, NavParams } from 'ionic-angular';


@Injectable({
  providedIn: 'root'
})
export class UtilityHTTPService {

  constructor( 
    public commonService: CommonService,
    public api: ApiService,
    public commonDtoService : CommonDtoService,
    public router: Router,
    public urlData : UrlService,
    public utilityService: UtilityService,
    public angularModuleHelperService: AngularModuleHelperService,
   // public modalCtrl: ModalController,
    //public uid: Uid,  
    //public androidPermissions: AndroidPermissions,
    public storage: StorageService
    ) { }

    //#region LoginModule

    /**
     * Login action token creation via username and password goes here
     */
    async doLogin(argLogin : LoginModel) 
    {

      this.commonDtoService.WelcomeModelConfigDisplayed = false;
      await this.commonService.showLoading();
      argLogin.IMEI = null;

      let IMEI : any = null;
      if(argLogin.AccessType == AccessType.App)
      {
        IMEI = await this.getImei();
        if(IMEI == null)
        {
            //await this.commonService.hideLoading();
            //alert("Please set the required permissions, If set then open the AMS application again !");
            IMEI = "963258741"; // text for android 10
            //return;
        }
      }
      else
      {
        IMEI = "963258741";
      }

      argLogin.IMEI = IMEI; //ends
      
      this.commonDtoService.LoginModel = argLogin;

      let url = this.urlData.TokenAPI;
      this.angularModuleHelperService.CallBack = this.TokenCallBack.bind(this);
      //let routeKey = this.urldata.NavigateToMap;

      let options = {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/x-www-form-urlencoded',
            //
            //'No-Auth':'True' 
          }
        ),
        observe:'response',
        //params : this._login
      }
      
      var data = this.utilityService.PrepareTokenAPIParams(this.commonDtoService.LoginModel);
      //this.angularModuleHelperService.HttpPostRequest(url,data,null,null,options);

      let APIResponse: any = await this.angularModuleHelperService.HttpPostRequestAsync(url,data,null,null,options);
      //this.utilityService.LogText(APIResponse);
      /**
       *if tokenAPI(Loginapi)response returns null value in that time
       *user will seethe alert message 
       */
        if(APIResponse == null || APIResponse.status != "200")
          {
            alert("Something Went Wrong...");
          }
      //return APIResponse;
      
      //this.angularModuleHelperService.HttpGetRequest(url,null,null,null,options);
    }

    /**
     * Login Token api callback to get response
     * @param dtas login api response from server
     */
    TokenCallBack(dtas : HttpResponse<any>)
    {
      this.utilityService.ValidateToken(dtas);    
      this.utilityService.ProcessAPIResponseForToken();
      let l_LoginModel = this.commonDtoService.LoginModel;

      if (this.commonDtoService.TokenVerified == true)
      {
        
        this.storage.set('loginNoticeDist',{UserName: l_LoginModel.UserName, Password: l_LoginModel.Password, OTPToken: l_LoginModel.OTPToken });      
        this.commonDtoService.LoggedInUserName = l_LoginModel.UserName;
        // this.commonService.presentToast(this.urlData.LoginSuccess)
        this.commonService.hideLoading();
      // let routeKey = this.urlData.NavigationToAction;
       //alert("Something went wrong");
       let routeKey = this.urlData.NavigationToLayout;

        this.router.navigateByUrl(routeKey);
       
      }
      else
      {
        this.commonService.hideLoading();
        //this.commonService.presentToast(this.urlData.IncorrectCredentials);
      }    
    }

    /**
     * Get device uid IMEI number
     */
    async getImei() {

      // return this.uid.IMEI;
      // //#region Comented permission for IMEI
      // // not needed as permisisons are asked on load.
      // let hasPermission = await this.androidPermissions.checkPermission
      // (
      //   this.androidPermissions.PERMISSION.READ_PHONE_STATE
      // );
    
      // if (!hasPermission) 
      // {     
      //     let result = await this.androidPermissions.requestPermission(
      //       this.androidPermissions.PERMISSION.READ_PHONE_STATE
      //     );
      
      //     if (!result.hasPermission) {
      //       throw new Error('Permissions required');
      //     }    
      //     // ok, a user gave us permission, we can get him identifiers after restart app
      //     return;
      // }
      // else
      // {
      //   return this.uid.IMEI;
      // }
      //alert(this.uid.IMEI); 
      //#endregion
      
      return null;
    }

  //#endregion

}
