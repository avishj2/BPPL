import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { AngularModuleHelperService } from 'src/app/services/angular-module-helper.service';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';
import { StorageService } from 'src/app/services/storage.service';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { DropdownDataModel ,StateDataModel,DistrictDataModel,TalukaDataModel,VillageDataModel} from './dropdown.model';
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

  _DropdownData ;
  _DropdownDataModel : DropdownDataModel;

  _StateDataModel : StateDataModel;
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
    this._StateDataModel = new StateDataModel();
   }

    ngOnInit() {
      //console.log("hi")
      this.GetAllStates();
      // this.getData();
    }


  /**test */
  getData() {
    let url = this.urlService.GetAllStatesAPI;    
    this.http.get(url, {
      headers: {
        'Bearer': 'Access Token',
        'Content-Type': 'application/json'
      },
    })
    .subscribe(response => console.log('Got the Response as: ', response));
  }



  /**API CALL FOR state details */
  GetAllStates()
    {
      let url = this.urlService.GetAllStatesAPI;   
      //=====method 1 ===      
      // this.APIUtilityService.CallBack = this.CallBackStateDetails.bind(this);
      // this.APIUtilityService.HttpGetRequest(url,null);  

      //===== 2=====
      this.APIUtilityService.get(url).subscribe(res => {
        console.log('data response', res);
      });
    }

    /**@abstract
     * =====method 1 ===      
     */
  CallBackStateDetails(dtas : HttpResponse<any>)
    {
      if (dtas != null) 
      {
        let data : StateDataModel;
        data = dtas.body; 
        this._StateDataModel = data;    
      }
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






