import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {


  constructor(   
  ) { }

  url = "https://bppl.dgdatam.com"

  /**Rolebase menu dropdown API */
  // GetRolesAPI = this.url + '/api/Auth/GetRoles';
  TokenAPI = this.url + '/token';

  /**bppl api url **/
  GetAllStatesAPI = this.url + '/api/CRUD/GetAllStates';
  GetAllDistrictAPI = this.url + '/api/CRUD/GetAllDistrict';
  GetDistrictByStateAPI = this.url + '/api/CRUD/GetDistrictByState?stateId=';
  GetAllTalukaAPI = this.url + '/api/CRUD/GetAllTaluka';  
  GetTalukaByDistrictAPI = this.url + '/api/CRUD/GetTalukaByDistrict?districtId=';
  GetAllVillagesAPI = this.url +'/api/CRUD/GetAllVillages';
  GetVillageByTalukaAPI = this.url +'/api/CRUD/GetVillageByTaluka?talukaId=';

 
  
  CommonErrorMessage = "Something goes wrong, please try again";
 
  ImageUploadedSuccess = "Uploaded successfully";
  EnableLocation = "Please enable location";
  ValidateCaptureImage = 'Please capture all Images';
  LoginSuccess = "Login Successfully!!!!!";
  IncorrectCredentials = "Incorrect Credentials !";
  PleaseCheckInternetConnection = "Please Check Your Internet Connection..";
  MapLoadedSuccessfully = "Map Load Successfully!!!!";
  SomethingWentWrong = "Something Went Wrong..";
  NoDataFound = "No Form Data Found !";
  CodeDoesNotExist = "The Code does not exist !";
  MapCouldNotBeFound = "Map could not be found !";
  DataSaved = "Data Saved !";
  SaveAgain = "Please Save again !";
  ProcessAgain = "Please process again !";
  PleaseSelectProject = "Please Select Project";
  PleaseSelectEmployeeName = "Please Select Employee Name";
  Remarks_Transit = "Transit details .."
  Remarks_Default = "Additional Remarks .."

  AttendanceInfo_SL = "3";
  AttendanceInfo_TR = "5";




  /**
   * Token is expired
   */
  HEADER_TOKEN_EXPIRED = "X-AccessTokenExpired";
  /**
   * User id and psw 9is right but IMEI no is not listed on server side.
   */
  HEADER_PHONE_NOT_REGISTERED = "X-DeviceNotRegistered";
  /**
   * User is not authorized to access a server resource.
   */
  HEADER_UNAUTHORIZED_ACCESS = "X-UnauthorizedAccess";
  /**
   * User Id and Password is not correct.
   */
  HEADER_UNAUTHENTICATED = "X-UnAuthenticated";

  /**
   * OTP is invalid and OTP screen shall be made visible.
   */
  HEADER_INVALIDOTP = "X-InvalidOTP";

  /**
   * Authenticated access.
   */
  HEADER_AUTHENTICATED = "X-Authenticated";

  MESSAGE_HEADER_TOKEN_EXPIRED = "Token Expired !";
  MESSAGE_HEADER_PHONE_NOT_REGISTERED = "The device used is not registered !";
  MESSAGE_HEADER_UNAUTHORIZED_ACCESS = "You are not authorized for this operation";
  MESSAGE_HEADER_UNAUTHENTICATED = "Incorrect Credentials !";

}

