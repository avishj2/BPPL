// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  constructor(   
  ) { }

  url = "https://localhost:44340"; //"https://bppl.dgdatam.com"

  /**bppl api url **/
  GetAllStatesAPI = this.url + '/api/Filter/GetAllStates';
  GetAllDistrictAPI = this.url + '/api/Filter/GetAllDistrict';
  GetDistrictByStateAPI = this.url + '/api/Filter/GetDistrictByState?stateId=';
  GetAllTalukaAPI = this.url + '/api/Filter/GetAllTaluka';  
  GetTalukaByDistrictAPI = this.url + '/api/Filter/GetTalukaByDistrict?districtId=';
  GetAllVillagesAPI = this.url +'/api/Filter/GetAllVillages';
  GetVillageByTalukaAPI = this.url +'/api/Filter/GetVillageByTaluka?talukaId=';

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
}

