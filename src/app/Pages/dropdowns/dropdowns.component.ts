import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { DropdownDataModel } from './dropdown.model'

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

  constructor() {
    this._DropdownData = this.DropdownData;
    this._DropdownDataModel = new DropdownDataModel()
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






