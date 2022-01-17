import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { AngularModuleHelperService } from 'src/app/services/angular-module-helper.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';
import { StorageService } from 'src/app/services/storage.service';
import { UrlService } from 'src/app/services/url.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
import { DropdownDataModel ,StateDataModel} from './dropdown.model'
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
    private utility : UtilityService,
    public commonService : CommonService,
    private angularModuleHelperService : AngularModuleHelperService,
    private router: Router,
    public storage: StorageService,
    private http: HttpClient,
    ){
    this._DropdownData = this.DropdownData;
    this._DropdownDataModel = new DropdownDataModel()
    this._StateDataModel = new StateDataModel();
   }

  ngOnInit() {
    //console.log("hi")
    
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
  
  input(event){
   console.log("event",event)
  }
  

}






