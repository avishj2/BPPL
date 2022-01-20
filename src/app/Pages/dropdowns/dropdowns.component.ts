import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { StateDetails,DistrictDetails,TalukaDetails,VillageDetails,DropdownDataModel} from './dropdown.model';
import { APIUtilityService } from 'src/app/services/APIUtility.service';
import {from} from 'rxjs';

@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
  styleUrls: ['./dropdowns.component.scss']
})

export class DropdownsComponent implements OnInit {
  @Output() child:EventEmitter<string>= new EventEmitter(); 
  DropdownValues = null;
  //dummy objects
  _DropdownData ;
  _DropdownDataModel : DropdownDataModel;
 
  //api models
  _StateDataModel : StateDetails[];
  _DistrictDetails : DistrictDetails[];
  _TalukaDetails : TalukaDetails[];
  _VillageDetails : VillageDetails[];
  _StateId : any;
  _DistrictId : any;
  _TalukaId : any;

  DropdownData = [
    // { id : 24 , name  : "--select--" },
    { id : 27 , name  : "Ajmer" },
    { id : 84 , name  : "Alwar" },
    { id : 24 , name  : "Banswara" },
    { id : 274 , name  : "Baran" },
    { id : 14 , name  : "Barmer" },
    { id : 34 , name  : "Bharatpur" },
    { id : 28 , name  : "Bhilwara" },
    { id : 29 , name  : "Bikaner" },
    { id : 246 , name  : "Bundi" },
    { id : 20 , name  : "Chittorgarh" },
    { id : 50 , name  : "Churu" },
    { id : 87 , name  : "Dausa" },
    { id : 90 , name  : "Dholpur" },
    { id : 82 , name  : "Dungarpur" },
    { id : 85 , name  : "Hanumangarh" }
  ];

  constructor(
    public urlService: UrlService,
    public APIUtilityService: APIUtilityService,
    private router: Router,
    private http: HttpClient,
    ){
    this._DropdownData = this.DropdownData;
    this._DropdownDataModel = new DropdownDataModel()
    // this._StateDataModel = [];
   }

    ngOnInit() {
      console.log("hi")      
      this.GetAllStates();
      // this.GetAllDistrict();
      // this.GetAllTaluka();
      // this.GetAllVillageDetails();
    }

  /**API CALL FOR state details */
  GetAllStates()
    {
      let url = this.urlService.GetAllStatesAPI; 
      //=====method 1 ===      
      this.APIUtilityService.CallBack = this.CallBackStateDetails.bind(this);
      this.APIUtilityService.HttpGetRequest(url,null);  

      //===== method 2(without callback function)=====
      // this.APIUtilityService.get(url,null).subscribe(res => {
      //   console.log('data response', res);
      //   this._StateDataModel = res;
      //   },error => {
      //     console.log("error",error);
      //   });
    }

    /**@abstract
     * =====method 1 ===      
     */
  CallBackStateDetails(dtas : HttpResponse<StateDetails>)
    {
      if (dtas != null) 
      {
        let data;
        data = dtas; 
        this._StateDataModel = data;    
      }
    }

   /**Get all District list base on the selected state */
  GetAllDistrict(arg)
    {
      let url = this.urlService.GetDistrictByStateAPI + arg; 
      this.APIUtilityService.CallBack = this.CallBackAllDistrictDetails.bind(this);
      this.APIUtilityService.HttpGetRequest(url,null);  
      // this.APIUtilityService.get(url,null).subscribe(response => {
      //   console.log('data response', response);
      //   this._DistrictDetails = response;
      //   },error => {
      //     console.log("error",error);
      //   });
    }

  CallBackAllDistrictDetails(dtas : HttpResponse<DistrictDetails>)
    {
      if (dtas != null) 
      {
        let data;
        data = dtas; 
        this._DistrictDetails = data;    
      }
    }

  /**get all Taluka details base on the selected DistrictId */
  GetAllTaluka(argDistrictID)
    {
      let url = this.urlService.GetTalukaByDistrictAPI+ argDistrictID;
      this.APIUtilityService.get(url,null).subscribe(response => {
        this._TalukaDetails = response;
        },error => {
          console.log("GetTalukaByDistrictAPI error",error);
        });
    }

    /**get all village details base on the selected Taluka */
  GetAllVillageDetails(argTalukaId)
    {
      let url = this.urlService.GetVillageByTalukaAPI + argTalukaId;
      this.APIUtilityService.get(url,null).subscribe(response => {
        this._VillageDetails = response;
        },error => {
          console.log("GetVillageByTalukaAPI error",error);
        });
    }

  
    SearchData(){
      // console.log("dropdown values : ", this._DropdownDataModel)
      let AlertMessage = "Jurisdiction - " + this._DropdownDataModel.Jurisdiction + "\nSection - " + this._DropdownDataModel.Section + "\nChainage To - " + this._DropdownDataModel.ChainageTo + "\nChainage From - " + this._DropdownDataModel.ChainageFrom + "\nState - " + this._DropdownDataModel.State + "\nDistrict - " + this._DropdownDataModel.District + "\nTaluka - " + this._DropdownDataModel.Taluka + "\nVillage - " + this._DropdownDataModel.Village + "\nSurvey Number - " + this._DropdownDataModel.SurveyNumber
      alert(AlertMessage);
      // if(this._DropdownDataModel.SurveyNumber == null && this._DropdownDataModel.Village == null )
      // {
      //   this._DropdownDataModel = null
      // }
  
      /**1. bind data in variable
       * 2.pass data child component to parent component 
       * */
      this.DropdownValues = this._DropdownDataModel.SurveyNumber;
      this.child.emit(this.DropdownValues);  
  
    }
    input(event)
    {
      console.log("event",event)
    }
  

}






