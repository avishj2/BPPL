import { Component, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import {RestorationRespDataModel,RestorationDataModel,SurveyDropDownsDataModel,AllSurveyDetailsDataModel } from 'src/app/Model/Survey.model';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CommonDropdownModel} from 'src/app/Model/Base.model';

@Component({
  selector: 'app-restoration-details',
  templateUrl: './restoration-details.component.html',
  styleUrls: ['./restoration-details.component.css']
})
export class RestorationDetailsComponent implements OnInit {
  _AddNewDetails : boolean;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it ?";
  /**data table properties  */
  //@ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  @Input() SurveyDropDownsData : SurveyDropDownsDataModel;
  @Input() AllSurveyDetails : AllSurveyDetailsDataModel;
  @Input() SurveyNumber : any;
  @Output() Output:EventEmitter<any>= new EventEmitter();
  @ViewChild('closebutton') closebutton;
  _PopupTitle : string;
  _RestorationDataModel : RestorationDataModel;
  _AllSurveyDetails : AllSurveyDetailsDataModel;

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,) 
    {
      this._RestorationDataModel = new RestorationDataModel();
      this._AllSurveyDetails = new AllSurveyDetailsDataModel();
    
    }

    ngOnInit(): void {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        scrollX: true, //enable horizontal scrolling in the table
        scrollCollapse: true,
      }
      this._RestorationDataModel.SurveyId = this.SurveyNumber;
      this._AllSurveyDetails.Result.RestorationDetails = this.AllSurveyDetails.Result.RestorationDetails;
      this._AllSurveyDetails.Result.SurveyOwnersDrp = this.AllSurveyDetails.Result.SurveyOwnersDrp;
    }

  AddNewRestorationDetails()
    {
      if(this.SurveyNumber != null)
        {
          this._AddNewDetails = true;
          this._PopupTitle = "Add Restoration Details";
          this._RestorationDataModel = new RestorationDataModel();
        }
        else
          {
            alert("Please Select Survey Number!!");
          }
    } 


  EditRestorationDetails(arg)
    {
      this._RestorationDataModel = arg;
      this._PopupTitle = "Edit Restoration Details";
      this._AddNewDetails = false;
    }


  SaveDetails()
    {
      this._RestorationDataModel.SurveyId = this.SurveyNumber;
      let url = this.urlService.AddOrUpdateSurveyRestorationAPI;     
      this.httpService.HttpPostRequest(url,this._RestorationDataModel,this.AddOrUpdateCallBack.bind(this),null);
    }

  AddOrUpdateCallBack(dtas)
    {
      if (dtas != null)
        {
          let RespDataModel : RestorationRespDataModel  = dtas;
          if (RespDataModel.StatusCode != 200) 
            {
              alert(RespDataModel.Message);
            }
          if (this._AddNewDetails == false)
            {
              alert("Restoration updated sucessfully!!");
              this._AllSurveyDetails.Result.RestorationDetails = RespDataModel.Result;
              this.SetParentData();
              this.closebutton.nativeElement.click();
            }
          else
            {
              alert("Restoration added sucessfully!!");
              this._AllSurveyDetails.Result.RestorationDetails = RespDataModel.Result;
              this.SetParentData();
              this._AddNewDetails = false;
              this.closebutton.nativeElement.click();
            }   
        }
        this._AddNewDetails = false;
    }

  SetParentData()
    {
      this.AllSurveyDetails.Result.Trees = this._AllSurveyDetails.Result.Trees
    }
   
  DeleteRestorationDetails(arg)
    {
      let url = this.urlService.DeleteSurveyRestorationAPI + arg.SurveyRestorationId + '&surveyId='+ arg.SurveyId;
        this.httpService.get(url,null).subscribe(response => {
          let OwnerDetails : any = response;
          if (OwnerDetails.StatusCode != 200) 
            {
              alert(OwnerDetails.Message);
            }
            else {
              alert("Restoration Details deleted successfully!");
              this._AllSurveyDetails.Result.RestorationDetails = response.RestorationDetails;
              this.SetParentData()
            }
          },error => {
            this.Utility.LogText(error);
          });
    }

    GetLookupValue(lookups : CommonDropdownModel[], lookUpid: Number) : any
    {
      let object = lookups.find(elm=>elm.Value == lookUpid );
      if(object)
      {
        return object.Text;
      }
      else { return lookUpid;}
    }


}
