import { Component, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import {LandModel ,SurveyDropDownsDataModel,AllSurveyDetailsDataModel,LandDataModel,LandRespDataModel} from 'src/app/Model/Survey.model';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CommonDropdownModel} from 'src/app/Model/Base.model';

@Component({
  selector: 'app-land-details',
  templateUrl: './land-details.component.html',
  styleUrls: ['./land-details.component.css']
})

export class LandDetailsComponent implements OnInit {
  _DisabledInputField : boolean = true;
  _LandModel : LandModel;
  _LandDataModel : LandDataModel;
  _AddNewLand : boolean = false;
  _PopupTitle : string;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it?";
  @Input() SurveyDropDownsData : SurveyDropDownsDataModel;
  @Input() AllSurveyDetails : AllSurveyDetailsDataModel;
  @Input() SurveyNumber : any;
  @Output() Output:EventEmitter<any>= new EventEmitter(); 
  @ViewChild('closebutton') closebutton;
  /**data table properties  */
  // @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  _AllSurveyDetails : AllSurveyDetailsDataModel;

  constructor(
    public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,
    ) {
      this._LandDataModel = new LandDataModel();
      this._AllSurveyDetails = new AllSurveyDetailsDataModel();
    }
  

  ngOnInit() {
    console.log("FromParentData=>", this.SurveyDropDownsData);
    console.log("FromParentData AllSurveyDetails=>",this.AllSurveyDetails)
    this._LandDataModel.SurveyId = this.SurveyNumber;
    this._AllSurveyDetails.Result.LandDetails = this.AllSurveyDetails.Result.LandDetails;
  
  }

  AddNewLandDetails()
    {
      if(this.SurveyNumber != null){
        this._AddNewLand = true;
        this._DisabledInputField = false;
        this._PopupTitle = "Add Land Details";
        this._LandDataModel = new LandDataModel(); 
      }
      else
        {
          alert("Please Select Survey Number!!");
        }
      
    }

  EditLandDetails(arg)
    {
      this._LandDataModel = arg;
      this._DisabledInputField = false;
      this._PopupTitle = "Edit Land Details";
      this.GetLookupValue(this.SurveyDropDownsData.LandClassifications, this._LandDataModel.LandType);
    }

  DeleteLandDetails()
    {

    }
  SaveLandDetails()
    {
      this._LandDataModel.SurveyId = this.SurveyNumber;
      let url = this.urlService.AddOrUpdateSurveyLandAPI;     
      this.httpService.HttpPostRequest(url,this._LandDataModel,this.AddOrUpdateLandCallBack.bind(this),null);
    }

  AddOrUpdateLandCallBack(dtas)
    {
      if (dtas != null)
        {
          let RespDataModel : LandRespDataModel  = dtas;
          if (RespDataModel.StatusCode != 200) 
            {
              alert(RespDataModel.Message);
            }
          if (this._AddNewLand == false)
            {
              alert("Survey updated sucessfully!!");
              this.closebutton.nativeElement.click();
            }
          else
            {
              alert("Survey added sucessfully!!");
              this._AllSurveyDetails.Result.LandDetails = RespDataModel.Result;
              this._AddNewLand = false;
              this.closebutton.nativeElement.click();
            }   
        }
        this._AddNewLand = false;
        
    }


  GetLookupValue(lookups : CommonDropdownModel[],lookUpid: Number) : any
    {
      let object = lookups.find(elm=>elm.Value == lookUpid );
      if(object)
      {
        return object.Text;
      }
      else { return lookUpid;}
    }
}
