// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  constructor(   
  ) { }

  url = "https://bppl.dgdatam.com"

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
  
}

