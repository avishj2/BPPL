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
  GetAllStatesAPI = this.url + '/api/CRUD/GetAllStates';
  GetAllDistrictAPI = this.url + '/api/CRUD/GetAllDistrict';
  GetDistrictByStateAPI = this.url + '/api/CRUD/GetDistrictByState?stateId=';
  GetAllTalukaAPI = this.url + '/api/CRUD/GetAllTaluka';  
  GetTalukaByDistrictAPI = this.url + '/api/CRUD/GetTalukaByDistrict?districtId=';
  GetAllVillagesAPI = this.url +'/api/CRUD/GetAllVillages';
  GetVillageByTalukaAPI = this.url +'/api/CRUD/GetVillageByTaluka?talukaId=';
  AddOrUpdateVillageAPI = this.url + '/api/CRUD/AddOrUpdateVillage';
  GetVillageByVillageIdAPI = this.url +'/api/CRUD/GetVillageByVillageId?villageId=';
  DeleteVillageAPI = this.url +'/api/CRUD/DeleteVillage?villageId=';
  AddOrUpdateVillageChainageAPI = this.url +'/api/CRUD/AddOrUpdateVillageChainage';
  DeleteVillageChainageAPI = this.url + '/api/CRUD/DeleteVillageChainage?villageChainageId=';
  
}

