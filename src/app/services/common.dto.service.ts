import { Injectable } from '@angular/core';
import { LoginModel,WelcomeModel, OTPConfiguration } from './CommonModel';


// import { ExpensesListingModel } from '../pages/expenses-listing/expenses-listing.model';
 
@Injectable({
  providedIn: 'root'
})
/**
 * Common Datat Transfer Object service to store state data and page all the pages
 */
export class CommonDtoService {


  constructor() { }

  public state = {};
 
  geoLocation : Geolocation;
  GeoLocWatch : any;
  NavigateToForm : string;
  
  CRUDOperation : CRUDOperation 

  /**
   * Json for the geometry
   */
  GeometryJSON : any;

  /**
   * Comma seperated coordinates 
   */
  CoordinatesCommaSeperated : any;
  LoggedInUserName : string;
  AccessType : any;
  TokenStatus : TokenStatus ;
  
  LoginModel : LoginModel;

  OTPConfiguration : OTPConfiguration;
  TokenVerified : boolean;

  WelcomeModelConfig : WelcomeModel;

  AppVersion = "V2.0";
  WelcomeModelConfigDisplayed = false;
  ExpensesListingData: any;


  /** 
   * 
   * @param key name of key to set data
   * @param value value to save in key
   */
  public setState(key, value){
    return this.state[key] = value;
    }
  /**
   * 
   * @param key name fo the key to retriview data from saved state
   */
    public getState(key){
    return this.state[key] || '';
    }
  /**
   * 
   * @param key remove saved key state data
   */
  public removeState(key){
    return ( delete this.state[key] );
  }
  /**
   * clear all state data
   */
  public clearState(){
    return this.state = {};
  }
  /**login requested application id */
  public GetApplicationIdForLogin()
  {
    return 4;
  }

  public getApplicationIDForNotice()
  {
     return 3;
  }

}


export enum CRUDOperation
{
    Select = 0,
    Insert = 1,
    Update = 2,
    Delete = 3
}




export enum NetworkType
{
  WIFI = "wifi",
  CELL_2G = "2g",
  CELL_3G = "3g",
  CELL_4G = "4g",
  NONE = "none",
  CELL = "cellular",
  UNKNOWN = "unknown"
}




export enum AccessType
{
   App = 1,
   Browser = 2
}

export enum TokenStatus
{
   Default = 0,
   Expired = 1,
   DeviceNOtRegistered = 2,
   UnAuthorizedAccess = 3,
   ValidToken = 4,
   UnAuthenticated = 5,
   Authenticated = 6,
   InvalidOTP = 7
}


