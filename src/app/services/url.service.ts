// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import UrlData from 'src/assets/Dashboard/url.json';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  constructor(   
  ) { }

  url = "";
  
  setUrl(argUrl: string)
  {
    this.url = argUrl; 

    this.GetAllStatesAPI = this.url + '/api/Filter/GetAllStates';
    this.GetAllDistrictAPI = this.url + '/api/Filter/GetAllDistrict';
    this.GetDistrictByStateAPI = this.url + '/api/Filter/GetDistrictByState?stateId=';
    this.GetAllTalukaAPI = this.url + '/api/Filter/GetAllTaluka';  
    this.GetTalukaByDistrictAPI = this.url + '/api/Filter/GetTalukaByDistrict?districtId=';
    this.GetAllVillagesAPI = this.url +'/api/Filter/GetAllVillages';
    this.GetVillageByTalukaAPI = this.url +'/api/Filter/GetVillageByTaluka?talukaId=';
    this.GetSurveyDetailsByVillageId  = this.url +'/api/Survey/GetSurveyDetailsByVillageId?villageId=';
    this.GetOwnerNamesForSurveyAPI  = this.url + '/api/Filter/GetOwnerNamesForSurvey?surveyId=';
    this.GetLandTypesByVillageAPI = this.url + '/api/Filter/GetLandTypesByVillage?villageId=';
    this.GetAllTalukaVillagesAPI = this.url +'/api/Filter/GetAllTalukaVillages';
    
    this.AddOrUpdateVillageAPI = this.url + '/api/Village/AddOrUpdateVillage';
    this.GetVillageByVillageIdAPI = this.url +'/api/Village/GetVillageByVillageId?villageId=';
    this.DeleteVillageAPI = this.url +'/api/Village/DeleteVillage?villageId=';
    this.AddOrUpdateVillageChainageAPI = this.url +'/api/Village/AddOrUpdateVillageChainage';
    this.DeleteVillageChainageAPI = this.url + '/api/Village/DeleteVillageChainage?villageChainageId=';
    /**gazette APIs */
    this.GetTypeOfNotificationsAPI = this.url + '/api/Gazzate/GetTypeOfNotifications';
    this.GetGazzateDropDownsAPI = this.url + '/api/Gazzate/GetGazzateDropDowns';
    this.GetAllNotificationNosAPI = this.url + '/api/Gazzate/GetAllNotificationNos';
    this.GetAllGazzatesbasedOntypeOfNoAPI =  this.url +'/api/Gazzate/GetAllGazzates?typeOfNotification=';
    this.GetAllGazzatesAPI =  this.url +'/api/Gazzate/GetAllGazzates';
    this.GetGazzateByIdAPI = this.url +'/api/Gazzate/GetGazzateById?gazzateId=';
    this.AddOrUpdateGazzateAPI = this.url + '/api/Gazzate/AddOrUpdateGazzate';
    this.DeleteGazzateAPI = this.url + '/api/Gazzate/DeleteGazzate?gazzateId=';
    this.AddGazzetteDocument = this.url + '/api/Gazzate/AddGazzetteDocument';
    this.DownloadGazzete = this.url + '/api/Gazzate/Download?documentId=';
    this.DeleteGazzetteDocument = this.url+ '/api/Gazzate/DeleteGazzetteDocument?documentId=';
    this.GetNotificationByIdAPI = this.url + '/api/Gazzate/GetNotificationById?notificationId=';
    this.AddOrUpdateNotificationAPI = this.url +'/api/Gazzate/AddOrUpdateNotification';
    this.DeleteNotificationAPI = this.url +'/api/Gazzate/DeleteNotification?notificationId=';
    //crosssing api
    this.GetCrossingDropDownsAPI = this.url +'/api/Crossing/GetCrossingDropDowns';
    this.AddOrUpdateCrossingAPI = this.url + '/api/Crossing/AddOrUpdateCrossing';
    this.DeleteCrossingAPI= this.url + '/api/Crossing/DeleteCrossing?crossingId=';
    this.GetCrossingByIdAPI= this.url + '/api/Crossing/GetCrossingById?crossingId=';
    this.GetAllCrossingsAPI= this.url + '/api/Crossing/GetAllCrossings?typeOfCrossing=';
    this.AddCrossingDocumentAPI= this.url + '/api/Crossing/AddCrossingDocument';
    this.DownloadCrossingDocAPI= this.url + '/api/Crossing/Download?documentId=';
    this.DeleteCrossingDocumentAPI = this.url + '/api/Crossing/DeleteGazzetteDocument?documentId=';
    /**survey numbers apis */
    this.GetSurveyDropDownsAPI = this.url + '/api/Survey/GetSurveyDropDowns';
    this.AddOrUpdateSurveyAPI = this.url + '/api/Survey/AddOrUpdateSurvey';
    this.DeleteSurveyAPI = this.url + '/api/Survey/DeleteSurvey?surveyId=';
    this.GetSurveyDetailsByIdAPI = this.url +'/api/Survey/GetSurveyDetailsById?surveyId=';
    this.AddOrUpdateSurveyLandAPI = this.url+ '/api/Survey/AddOrUpdateSurveyLand';
    this.DeleteSurveyLandAPI = this.url + '/api/Survey/DeleteSurveyLand?surveyLandId=';
    this.AddOrUpdateSurveyOwnerAPI = this.url + '/api/Survey/AddOrUpdateSurveyOwner';
    this.DeleteSurveyOwnerAPI = this.url +  '/api/Survey/DeleteSurveyOwner?surveyOwnerId=';
    this.AddOrUpdateSurveyTreeAPI = this.url + '/api/Survey/AddOrUpdateSurveyTree';
    this.DeleteSurveyTreeAPI = this.url +'/api/Survey/DeleteSurveyTree?surveyTreeId=';
    this.AddOrUpdateSurveyCropAPI = this.url +'/api/Survey/AddOrUpdateSurveyCrop';
    this.DeleteSurveyCropAPI = this.url +'/api/Survey/DeleteSurveyCrop?surveyCropId=';
    this.AddOrUpdateSurveyRestorationAPI = this.url +'/api/Survey/AddOrUpdateSurveyRestoration';
    this.DeleteSurveyRestorationAPI = this.url +'/api/Survey/DeleteSurveyRestoration?surveyRestorationId=';
    this.AddSurveyDocumentAPI = this.url+'/api/Survey/AddSurveyDocument';
    this.DownloadRevDocAPI = this.url +'/api/Survey/Download?documentId=';
    this.DeleteSurveyDocumentAPI = this.url+'/api/Survey/DeleteSurveyDocument?documentId=';
    this.GetSurveyDetailsByNameAPI = this.url +'/api/Survey/GetSurveyDetailsByName?surveyNumber=';
    this.AddOrUpdateSurveyFarmerNOCAPI = this.url + '/api/Survey/AddOrUpdateSurveyFarmerNOC';
    this.DeleteSurveyFarmerNOCAPI = this.url + '/api/Survey/DeleteSurveyFarmerNOC?surveyFarmerNocId=';
    //survey documents APIs
    this.GetSurveyDocumentDropDowns = this.url+'/api/SurveyDocuments/GetSurveyDocumentDropDowns';
    this.GetProjectReports= this.url+'/api/SurveyDocuments/GetProjectReports';
    this.AddProjectReportAPI = this.url+'/api/SurveyDocuments/AddProjectReport';
    this.DownloadProjectReportAPI =  this.url+'/api/SurveyDocuments/DownloadProjectReport?documentId=';
    this.DeleteProjectReportAPI = this.url +'/api/SurveyDocuments/DeleteProjectReport?documentId=';
    //===2
    this.GetAlignmentSheetsAPI = this.url +'/api/SurveyDocuments/GetAlignmentSheets';
    this.AddAlignmentSheetAPI = this.url +'/api/SurveyDocuments/AddAlignmentSheet';
    this.DownloadAlignmentSheetAPI = this.url +'/api/SurveyDocuments/DownloadAlignmentSheet?documentId=';
    this.DeleteAlignmentSheetAPI = this.url +'/api/SurveyDocuments/DeleteAlignmentSheet?documentId=';
    //===3
    this.GetAwardAndMutationsAPI = this.url +'/api/SurveyDocuments/GetAwardAndMutations?requestId=';
    this.AddAwardAndMutationsAPI = this.url +'/api/SurveyDocuments/AddAwardAndMutations';
    this.DownloadAwardAndMutationsAPI = this.url +'/api/SurveyDocuments/DownloadAwardAndMutations?documentId=';
    this.DeleteAwardAndMutationsAPI = this.url +'/api/SurveyDocuments/DeleteAwardAndMutations?documentId=';
    this.GetAwardAndMutationsPostAPI = this.url +'/api/SurveyDocuments/GetAwardAndMutations';
    //=== 4 leagal documents
    this.GetLegalDocumentsAPI = this.url + '/api/SurveyDocuments/GetLegalDocuments';
    this.AddLegalDocumentAPI = this.url + '/api/SurveyDocuments/AddLegalDocument';
    this.DownloadLegalDocumentAPI = this.url + '/api/SurveyDocuments/DownloadLegalDocument?documentId=';
    this.DeleteLegalDocumentAPI = this.url + '/api/SurveyDocuments/DeleteLegalDocument?documentId=';
    this.GetAllLookupsForLegalDocsAPI = this.url+ '/api/Project/GetAllLookupsForGroup?lookupGroupId=1029';
    //crop rates APIs
    this.GetCropDropDownsAPI = this.url + '/api/LandCrop/GetCropDropDowns';
    this.AddOrUpdateCropsRateAPI = this.url +'/api/LandCrop/AddOrUpdateCrops';
    this.DeleteCropsAPI = this.url +'/api/LandCrop/DeleteCrops?cropId=';
    this.GetAllCropsAPI = this.url +'/api/LandCrop/GetAllCrops?tehsilId=';
    this.AddTehsilCropDocumentAPI = this.url +'/api/LandCrop/AddTehsilCropDocument';
    this.DownloadTehsilCropDocumentAPI = this.url +'/api/LandCrop/DownloadTehsilCropDocument?documentId=';
    this.DeleteTehsilCropDocumentAPI = this.url +'/api/LandCrop/DeleteTehsilCropDocument?documentId='
    //land rates APIs
    this.GetLandDropDownsAPI = this.url +'/api/LandCrop/GetLandDropDowns';
    this.AddOrUpdateLandDetails = this.url + '/api/LandCrop/AddOrUpdateLandDetails';
    this.DeleteLandDetailsAPI = this.url + '/api/LandCrop/DeleteLandDetails?landId=';
    this.GetAllLandDetails= this.url + '/api/LandCrop/GetAllLandDetails?villageId=';
    this.AddVillageLandDocumentAPI = this.url +'/api/LandCrop/AddVillageLandDocument';
    this.DownloadVillageLandDocumentAPI = this.url + '/api/LandCrop/DownloadVillageLandDocument?documentId=';
    this.DeleteVillageLandDocumentAPI = this.url +'/api/LandCrop/DeleteVillageLandDocument?documentId=3';
    //SVIPS
    this.GetSVIPSDropDownsAPI = this.url + '/api/LandCrop/GetSVIPSDropDowns';
    this.AddOrUpdateSVIPSDetailsAPI = this.url + '/api/LandCrop/AddOrUpdateSVIPSDetails';
    this.DeleteSVIPSDetailsAPI = this.url +'/api/LandCrop/DeleteSVIPSDetails?SVIPSDetailsId=';
    this.GetSVIPSDetailsByIdAPI = this.url + '/api/LandCrop/GetSVIPSDetailsById?SVIPSDetailsId=';
    this.GetAllSVIPSDetailsAPI = this.url + '/api/LandCrop/GetAllSVIPSDetails';
    this.AddSVIPSDetailsDocumentAPI = this.url + '/api/LandCrop/AddSVIPSDetailsDocument';
    this.SVIPSDownloadAPI = this.url +'/api/LandCrop/Download?documentId=';
    this.DeleteSVIPSDetailsDocumentAPI = this.url +'/api/LandCrop/DeleteSVIPSDetailsDocument?documentId=';
    //Adhoc payment details
    this.GetAdHocPaymentDropDownsAPI = this.url + '/api/AdHocPayment/GetAdHocPaymentDropDowns';
    this.AddOrUpdateAdHocPaymentAPI = this.url +'/api/AdHocPayment/AddOrUpdateAdHocPayment';
    this.DeleteAdHocPaymentAPI = this.url +'/api/AdHocPayment/DeleteAdHocPayments?adHocPaymentId=';
    this.GetAllAdHocPaymentsAPI = this.url +'/api/AdHocPayment/GetAdHocPaymentDetails?surveyOwnerId=';
    this.AddAdHocPaymentDocumentAPI = this.url +'/api/AdHocPayment/AddAdHocPaymentDocument';
    this.DownloadPaymentAPI = this.url +'/api/AdHocPayment/Download?documentId=';
    this.DeleteAdHocPaymentDocumentAPI = this.url +'/api/AdHocPayment/DeleteAdHocPaymentDocument?documentId=';
    //LAQ
    this.GetSurveyDetailsForLAQAPI = this.url +'/api/Survey/GetSurveyDetailsForLAQ?villageId=';
    //viewcrossing
    this.GetCrossingSummaryAPI =this.url+ '/api/Crossing/GetCrossingSummary';  
    this.GetVillageSummaryAPI = this.url+ '/api/Survey/GetVillageSummary';
    this.GetCrossingByNameAPI = this.url+ "/api/Crossing/GetCrossingByName?crossingNo=";
    this.GetVillageSummaryChainageWiseAPI = this.url + '/api/Survey/GetVillageSummaryChainageWise';
    this.Authenticate = this.url+"/api/Users/Authenticate";
    this.NavigateAddEditAdhocDetails ="../Add_Adhoc_Details";
    //Configuration
    this.GetLookupGroupsAPI = this.url + '/api/Project/GetLookupGroups';
    this.AddOrUpdateLookupsAPI = this.url +'/api/Project/AddOrUpdateLookups';
    this.DeleteLookupAPI = this.url + '/api/Project/DeleteLookup?lookupId=';
    this.GetAllLookupsForGroupAPI = this.url+'/api/Project/GetAllLookupsForGroup?lookupGroupId=';
    //CA Details API
    this.GetCADetailsDropDownsAPI = this.url +'/api/Project/GetCADetailsDropDowns';
    this.AddOrUpdateCADetailsAPI = this.url + '/api/Project/AddOrUpdateCADetails';
    this.DeleteCADetailsAPI = this.url + '/api/Project/DeleteCADetails?caDetailsId=';
    this.GetCADetailsAPI = this.url + '/api/Project/GetCADetails?caDetailsId=';
    this.AddCADetailsDocumentAPI = this.url + '/api/Project/AddCADetailsDocument';
    this.DownloadCAdocAPI = this.url +'/api/Project/Download?documentId=';
    this.DeleteCADetailsDocumentAPI = this.url + '/api/Project/DeleteCADetailsDocument?documentId=';
    //user magament
    this.GetAllUsersAPI = this.url +'/api/Users/GetAllUsers';
    this.GetUsersDropDownsAPI = this.url +'/api/Users/GetUsersDropDown';
    this.AddOrUpdateUsersAPI = this.url +'/api/Users/AddOrUpdateUsers';
    this.GetRolesByUserIdAPI = this.url +'/api/Users/GetRolesByUserId?userId=';
    this.AddOrUpdateUsersRolesAPI = this.url +'/api/Users/AddOrUpdateUsersRoles';
    this.UpdatePasswordAPI = this.url +'/api/Users/UpdatePassword';
    this.GetAOTokendAPI = this.url +'/api/Users/GetAOToken';
 
  }
  
  //url ="https://bppl.dgdatam.com"; //"https://localhost:44340"; 
  //url ="http://192.168.0.135:99/";
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
  GetAllTalukaVillagesAPI = this.url +'/api/Filter/GetAllTalukaVillages';


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
  AddOrUpdateSurveyFarmerNOCAPI = this.url + '/api/Survey/AddOrUpdateSurveyFarmerNOC';
  DeleteSurveyFarmerNOCAPI = this.url + '/api/Survey/DeleteSurveyFarmerNOC?surveyFarmerNocId=';

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
  GetAwardAndMutationsPostAPI = this.url +'/api/SurveyDocuments/GetAwardAndMutations';
  //=== 4 leagal documents
  GetLegalDocumentsAPI = this.url + '/api/SurveyDocuments/GetLegalDocuments';
  AddLegalDocumentAPI = this.url + '/api/SurveyDocuments/AddLegalDocument';
  DownloadLegalDocumentAPI = this.url + '/api/SurveyDocuments/DownloadLegalDocument?documentId=';
  DeleteLegalDocumentAPI = this.url + '/api/SurveyDocuments/DeleteLegalDocument?documentId=';
  GetAllLookupsForLegalDocsAPI = this.url+ '/api/Project/GetAllLookupsForGroup?lookupGroupId=1029';

  //crop rates APIs
  GetCropDropDownsAPI = this.url + '/api/LandCrop/GetCropDropDowns';
  AddOrUpdateCropsRateAPI = this.url +'/api/LandCrop/AddOrUpdateCrops';
  DeleteCropsAPI = this.url +'/api/LandCrop/DeleteCrops?cropId=';
  GetAllCropsAPI = this.url +'/api/LandCrop/GetAllCrops?tehsilId=';
  AddTehsilCropDocumentAPI = this.url +'/api/LandCrop/AddTehsilCropDocument';
  DownloadTehsilCropDocumentAPI = this.url +'/api/LandCrop/DownloadTehsilCropDocument?documentId=';
  DeleteTehsilCropDocumentAPI = this.url +'/api/LandCrop/DeleteTehsilCropDocument?documentId='


  //land rates APIs
  GetLandDropDownsAPI = this.url +'/api/LandCrop/GetLandDropDowns';
  AddOrUpdateLandDetails = this.url + '/api/LandCrop/AddOrUpdateLandDetails';
  DeleteLandDetailsAPI = this.url + '/api/LandCrop/DeleteLandDetails?landId=';
  GetAllLandDetails= this.url + '/api/LandCrop/GetAllLandDetails?villageId=';
  AddVillageLandDocumentAPI = this.url +'/api/LandCrop/AddVillageLandDocument';
  DownloadVillageLandDocumentAPI = this.url + '/api/LandCrop/DownloadVillageLandDocument?documentId=';
  DeleteVillageLandDocumentAPI = this.url +'/api/LandCrop/DeleteVillageLandDocument?documentId=3';
  
  //SVIPS
  GetSVIPSDropDownsAPI = this.url + '/api/LandCrop/GetSVIPSDropDowns';
  AddOrUpdateSVIPSDetailsAPI = this.url + '/api/LandCrop/AddOrUpdateSVIPSDetails';
  DeleteSVIPSDetailsAPI = this.url +'/api/LandCrop/DeleteSVIPSDetails?SVIPSDetailsId=';
  GetSVIPSDetailsByIdAPI = this.url + '/api/LandCrop/GetSVIPSDetailsById?SVIPSDetailsId=';
  GetAllSVIPSDetailsAPI = this.url + '/api/LandCrop/GetAllSVIPSDetails';
  AddSVIPSDetailsDocumentAPI = this.url + '/api/LandCrop/AddSVIPSDetailsDocument';
  SVIPSDownloadAPI = this.url +'/api/LandCrop/Download?documentId=';
  DeleteSVIPSDetailsDocumentAPI = this.url +'/api/LandCrop/DeleteSVIPSDetailsDocument?documentId=';


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
  GetCrossingByNameAPI = this.url+ "/api/Crossing/GetCrossingByName?crossingNo=";
  GetVillageSummaryChainageWiseAPI = this.url + '/api/Survey/GetVillageSummaryChainageWise';

  Authenticate = this.url+"/api/Users/Authenticate";

  NavigateAddEditAdhocDetails ="../Add_Adhoc_Details"; 

  //Configuration
  GetLookupGroupsAPI = this.url + '/api/Project/GetLookupGroups';
  AddOrUpdateLookupsAPI = this.url +'/api/Project/AddOrUpdateLookups';
  DeleteLookupAPI = this.url + '/api/Project/DeleteLookup?lookupId=';
  GetAllLookupsForGroupAPI = this.url+'/api/Project/GetAllLookupsForGroup?lookupGroupId=';

  //CA Details API
  GetCADetailsDropDownsAPI = this.url +'/api/Project/GetCADetailsDropDowns';
  AddOrUpdateCADetailsAPI = this.url + '/api/Project/AddOrUpdateCADetails';
  DeleteCADetailsAPI = this.url + '/api/Project/DeleteCADetails?caDetailsId=';
  GetCADetailsAPI = this.url + '/api/Project/GetCADetails?caDetailsId=';
  AddCADetailsDocumentAPI = this.url + '/api/Project/AddCADetailsDocument';
  DownloadCAdocAPI = this.url +'/api/Project/Download?documentId=';
  DeleteCADetailsDocumentAPI = this.url + '/api/Project/DeleteCADetailsDocument?documentId=';

  //user magament
  GetAllUsersAPI = this.url +'/api/Users/GetAllUsers';
  GetUsersDropDownsAPI = this.url +'/api/Users/GetUsersDropDown';
  AddOrUpdateUsersAPI = this.url +'/api/Users/AddOrUpdateUsers';
  GetRolesByUserIdAPI = this.url +'/api/Users/GetRolesByUserId?userId=';
  AddOrUpdateUsersRolesAPI = this.url +'/api/Users/AddOrUpdateUsersRoles';
  UpdatePasswordAPI = this.url +'/api/Users/UpdatePassword';
  GetAOTokendAPI = this.url +'/api/Users/GetAOToken';

  /** Map layers */
  CSLayer = "Crossing";
  TPLayer = "TP";
  TextFont15 = '15px "Open Sans", "Arial Unicode MS", "sans-serif"';
  TextFont10 = '10px "Open Sans", "Arial Unicode MS", "sans-serif"';
  Chainage = "Chainage";
  Center = "Center";
  TextFont17 = '17px "Open Sans", "Arial Unicode MS", "sans-serif"';
  Village = "Village";
  Khasra = "Khasra";
  ROU = "ROU";
  Well = "Well";
  WaterTank = "WaterTank";
  BoreWell = "BoreWell";
  Pond = "Pond";
  Compound_Wall = "Compound Wall";
  Plantation = "Plantation";
  Texthighlight = "Texthighlight";
  Building= "Building";
  FOREST_BOUNDARY="Forest Boundary";
  Neotectonic = "Neotectonic";
  Khasara_Boundary_bigger = "Khasara Boundary bigger";
  GCP_Points = "GCP Points";
  SurveyNoTextBigger = "SurveyNoTextBigger";
  DisasterManagementData= "Disaster Management Points";
}

