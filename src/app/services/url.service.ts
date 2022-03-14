// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  constructor(   
  ) { }

  url ="https://bppl.dgdatam.com"; //"https://localhost:44340"; 

  /**bppl api url **/
  GetAllStatesAPI = this.url + '/api/Filter/GetAllStates';
  GetAllDistrictAPI = this.url + '/api/Filter/GetAllDistrict';
  GetDistrictByStateAPI = this.url + '/api/Filter/GetDistrictByState?stateId=';
  GetAllTalukaAPI = this.url + '/api/Filter/GetAllTaluka';  
  GetTalukaByDistrictAPI = this.url + '/api/Filter/GetTalukaByDistrict?districtId=';
  GetAllVillagesAPI = this.url +'/api/Filter/GetAllVillages';
  GetVillageByTalukaAPI = this.url +'/api/Filter/GetVillageByTaluka?talukaId=';
  GetSurveyDetailsByVillageId  = this.url +'/api/Survey/GetSurveyDetailsByVillageId?villageId=';

  AddOrUpdateVillageAPI = this.url + '/api/Village/AddOrUpdateVillage';
  GetVillageByVillageIdAPI = this.url +'/api/Village/GetVillageByVillageId?villageId=';
  DeleteVillageAPI = this.url +'/api/Village/DeleteVillage?villageId=';
  AddOrUpdateVillageChainageAPI = this.url +'/api/Village/AddOrUpdateVillageChainage';
  DeleteVillageChainageAPI = this.url + '/api/Village/DeleteVillageChainage?villageChainageId=';

  /**gazette APIs */
  GetTypeOfNotificationsAPI = this.url + '/api/Gazzate/GetTypeOfNotifications';
  GetGazzateDropDownsAPI = this.url + '/api/Gazzate/GetGazzateDropDowns';
  GetAllNotificationNosAPI = this.url + '/api/Gazzate/GetAllNotificationNos';
  GetAllGazzatesAPI =  this.url +'/api/Gazzate/GetAllGazzates?typeOfNotification=';
  GetGazzateByIdAPI = this.url +'/api/Gazzate/GetGazzateById?gazzateId=';
  AddOrUpdateGazzateAPI = this.url + '/api/Gazzate/AddOrUpdateGazzate';
  DeleteGazzateAPI = this.url + '/api/Gazzate/DeleteGazzate?gazzateId=';

  AddGazzetteDocument = this.url + '/api/Gazzate/AddGazzetteDocument';
  DownloadGazzete = this.url + '/api/Gazzate/Download?documentId=';
  DeleteGazzetteDocument = this.url+ '/api/Gazzate/DeleteGazzetteDocument?documentId=';
  
  GetNotificationByIdAPI = this.url + '/api/Gazzate/GetNotificationById?notificationId=';
  AddOrUpdateNotificationAPI = this.url +'/api/Gazzate/AddOrUpdateNotification';
  DeleteNotificationAPI = this.url +'/api/Gazzate/DeleteNotification?notificationId=';

  //crosssing api
  GetCrossingDropDownsAPI = this.url +'/api/Crossing/GetCrossingDropDowns';
  AddOrUpdateCrossingAPI = this.url + '/api/Crossing/AddOrUpdateCrossing';
  DeleteCrossingAPI= this.url + '/api/Crossing/DeleteCrossing?crossingId=';
  GetCrossingByIdAPI= this.url + '/api/Crossing/GetCrossingById?crossingId=';
  GetAllCrossingsAPI= this.url + '/api/Crossing/GetAllCrossings?typeOfCrossing=';
  AddCrossingDocumentAPI= this.url + '/api/Crossing/AddCrossingDocument';
  DownloadCrossingDocAPI= this.url + '/api/Crossing/Download?documentId=';
  DeleteCrossingDocumentAPI = this.url + '/api/Crossing/DeleteGazzetteDocument?documentId=';

  /**survey numbers apis */
  GetSurveyDropDownsAPI = this.url + '/api/Survey/GetSurveyDropDowns';
  AddOrUpdateSurveyAPI = this.url + '/api/Survey/AddOrUpdateSurvey';
  DeleteSurveyAPI = this.url + '/api/Survey/DeleteSurvey?surveyId=';
  GetSurveyDetailsByIdAPI = this.url +'/api/Survey/GetSurveyDetailsById?surveyId=';
  AddOrUpdateSurveyLandAPI = this.url+ '/api/Survey/AddOrUpdateSurveyLand';
  DeleteSurveyLandAPI = this.url + '/api/Survey/DeleteSurveyLand?surveyLandId=';
  AddOrUpdateSurveyOwnerAPI = this.url + '/api/Survey/AddOrUpdateSurveyOwner';
  DeleteSurveyOwnerAPI = this.url +  '/api/Survey/DeleteSurveyOwner?surveyOwnerId=';
  AddOrUpdateSurveyTreeAPI = this.url + '/api/Survey/AddOrUpdateSurveyTree';
  DeleteSurveyTreeAPI = this.url +'/api/Survey/DeleteSurveyTree?surveyTreeId=';
  AddOrUpdateSurveyCropAPI = this.url +'/api/Survey/AddOrUpdateSurveyCrop';
  DeleteSurveyCropAPI = this.url +'/api/Survey/DeleteSurveyCrop?surveyCropId=';
  AddOrUpdateSurveyRestorationAPI = this.url +'/api/Survey/AddOrUpdateSurveyRestoration';
  DeleteSurveyRestorationAPI = this.url +'/api/Survey/DeleteSurveyRestoration?surveyRestorationId=';
  AddSurveyDocumentAPI = this.url+'/api/Survey/AddSurveyDocument';
  DownloadRevDocAPI = this.url +'/api/Survey/Download?documentId=';
  DeleteSurveyDocumentAPI = this.url+'/api/Survey/DeleteSurveyDocument?documentId=';



}

