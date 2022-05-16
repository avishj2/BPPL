// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  constructor(   
  ) { }

  url ="https://bppl.dgdatam.com"; //"https://localhost:44340"; 

  /**bppl FILTER api url **/
  GetAllStatesAPI = this.url + '/api/Filter/GetAllStates';
  GetAllDistrictAPI = this.url + '/api/Filter/GetAllDistrict';
  GetDistrictByStateAPI = this.url + '/api/Filter/GetDistrictByState?stateId=';
  GetAllTalukaAPI = this.url + '/api/Filter/GetAllTaluka';  
  GetTalukaByDistrictAPI = this.url + '/api/Filter/GetTalukaByDistrict?districtId=';
  GetAllVillagesAPI = this.url +'/api/Filter/GetAllVillages';
  GetVillageByTalukaAPI = this.url +'/api/Filter/GetVillageByTaluka?talukaId=';
  GetSurveyDetailsByVillageId  = this.url +'/api/Survey/GetSurveyDetailsByVillageId?villageId=';
  GetOwnerNamesForSurveyAPI  = this.url + '/api/Filter/GetOwnerNamesForSurvey?surveyId=';
  GetLandTypesByVillageAPI = this.url + '/api/Filter/GetLandTypesByVillage?villageId=';


  AddOrUpdateVillageAPI = this.url + '/api/Village/AddOrUpdateVillage';
  GetVillageByVillageIdAPI = this.url +'/api/Village/GetVillageByVillageId?villageId=';
  DeleteVillageAPI = this.url +'/api/Village/DeleteVillage?villageId=';
  AddOrUpdateVillageChainageAPI = this.url +'/api/Village/AddOrUpdateVillageChainage';
  DeleteVillageChainageAPI = this.url + '/api/Village/DeleteVillageChainage?villageChainageId=';

  /**gazette APIs */
  GetTypeOfNotificationsAPI = this.url + '/api/Gazzate/GetTypeOfNotifications';
  GetGazzateDropDownsAPI = this.url + '/api/Gazzate/GetGazzateDropDowns';
  GetAllNotificationNosAPI = this.url + '/api/Gazzate/GetAllNotificationNos';
  GetAllGazzatesbasedOntypeOfNoAPI =  this.url +'/api/Gazzate/GetAllGazzates?typeOfNotification=';
  GetAllGazzatesAPI =  this.url +'/api/Gazzate/GetAllGazzates';
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
  GetSurveyDetailsByNameAPI = this.url +'/api/Survey/GetSurveyDetailsByName?surveyNumber=';

  //survey documents APIs
  GetSurveyDocumentDropDowns = this.url+'/api/SurveyDocuments/GetSurveyDocumentDropDowns';
  GetProjectReports= this.url+'/api/SurveyDocuments/GetProjectReports';
  AddProjectReportAPI = this.url+'/api/SurveyDocuments/AddProjectReport';
  DownloadProjectReportAPI =  this.url+'/api/SurveyDocuments/DownloadProjectReport?documentId=';
  DeleteProjectReportAPI = this.url +'/api/SurveyDocuments/DeleteProjectReport?documentId=';
  //===2
  GetAlignmentSheetsAPI = this.url +'/api/SurveyDocuments/GetAlignmentSheets';
  AddAlignmentSheetAPI = this.url +'/api/SurveyDocuments/AddAlignmentSheet';
  DownloadAlignmentSheetAPI = this.url +'/api/SurveyDocuments/DownloadAlignmentSheet?documentId=';
  DeleteAlignmentSheetAPI = this.url +'/api/SurveyDocuments/DeleteAlignmentSheet?documentId=';
  //===3
  GetAwardAndMutationsAPI = this.url +'/api/SurveyDocuments/GetAwardAndMutations?requestId=';
  AddAwardAndMutationsAPI = this.url +'/api/SurveyDocuments/AddAwardAndMutations';
  DownloadAwardAndMutationsAPI = this.url +'/api/SurveyDocuments/DownloadAwardAndMutations?documentId=';
  DeleteAwardAndMutationsAPI = this.url +'/api/SurveyDocuments/DeleteAwardAndMutations?documentId=';

  //crop rates APIs
  GetCropDropDownsAPI = this.url + '/api/LandCrop/GetCropDropDowns';
  AddOrUpdateCropsRateAPI = this.url +'/api/LandCrop/AddOrUpdateCrops';
  DeleteCropsAPI = this.url +'/api/LandCrop/DeleteCrops?cropId=';
  GetAllCropsAPI = this.url +'/api/LandCrop/GetAllCrops?villageId=';

  //land rates APIs
  GetLandDropDownsAPI = this.url +'/api/LandCrop/GetLandDropDowns';
  AddOrUpdateLandDetails = this.url + '/api/LandCrop/AddOrUpdateLandDetails';
  DeleteLandDetailsAPI = this.url + '/api/LandCrop/DeleteLandDetails?landId=';
  GetAllLandDetails= this.url + '/api/LandCrop/GetAllLandDetails?villageId=';
  

  //Adhoc payment details
  GetAdHocPaymentDropDownsAPI = this.url + '/api/AdHocPayment/GetAdHocPaymentDropDowns';
  AddOrUpdateAdHocPaymentAPI = this.url +'/api/AdHocPayment/AddOrUpdateAdHocPayment';
  DeleteAdHocPaymentAPI = this.url +'/api/AdHocPayment/DeleteAdHocPayments?adHocPaymentId=';
  GetAllAdHocPaymentsAPI = this.url +'/api/AdHocPayment/GetAdHocPaymentDetails?surveyOwnerId=';
  AddAdHocPaymentDocumentAPI = this.url +'/api/AdHocPayment/AddAdHocPaymentDocument';
  DownloadPaymentAPI = this.url +'/api/AdHocPayment/Download?documentId=';
  DeleteAdHocPaymentDocumentAPI = this.url +'/api/AdHocPayment/DeleteAdHocPaymentDocument?documentId=';

  //LAQ
  GetSurveyDetailsForLAQAPI = this.url +'/api/Survey/GetSurveyDetailsForLAQ?villageId=';

  //viewcrossing
  GetCrossingSummaryAPI =this.url+ '/api/Crossing/GetCrossingSummary';  
  GetVillageSummaryAPI = this.url+ '/api/Survey/GetVillageSummary';
  GetCrossingByNameAPI = this.url+ "/api/Crossing/GetCrossingByName?crossingNo="

  Authenticate = this.url+ "/api/Users/Authenticate";

  NavigateAddEditAdhocDetails ="../Add_Adhoc_Details"; 

  //Configuration
  GetLookupGroupsAPI = this.url + '/api/Project/GetLookupGroups';
  AddOrUpdateLookupsAPI = this.url +'/api/Project/AddOrUpdateLookups';
  DeleteLookupAPI = this.url + '/api/Project/DeleteLookup?lookupId=';
  GetAllLookupsForGroupAPI = this.url+'/api/Project/GetAllLookupsForGroup?lookupGroupId=';

  
}

