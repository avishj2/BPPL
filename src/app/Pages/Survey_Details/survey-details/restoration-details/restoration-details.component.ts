import { Component,AfterViewInit, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
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
export class RestorationDetailsComponent implements AfterViewInit, OnInit {
  _AddNewDetails : boolean;
  @Input() SurveyDropDownsData : SurveyDropDownsDataModel;
  @Input() AllSurveyDetails : AllSurveyDetailsDataModel;
  @Input() SurveyNumber : any;
  @Output() Output:EventEmitter<any>= new EventEmitter();
  _PopupTitle : string;
  @ViewChild('closebutton') closebutton;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it ?";
  /**data table properties  */
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
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
        language: {emptyTable : "No Restoration!!"}
      }
      this._RestorationDataModel.SurveyId = this.SurveyNumber;
      this._AllSurveyDetails.Result.RestorationDetails = this.AllSurveyDetails.Result.RestorationDetails;
      this._AllSurveyDetails.Result.SurveyOwnersDrp = this.AllSurveyDetails.Result.SurveyOwnersDrp;
      this.ReloadDatatable()
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


  ngAfterViewInit(): void 
    {
      this.dtTrigger.next();
    }
  
  /**refresh/reload data table 
  *when data update/delete/add in the datatable  
  **/
  ReloadDatatable()
    {
      /**initialized datatable */
      if (this.IsDtInitialized) 
        {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => 
          {
            dtInstance.destroy();//Destroy the table first
            this.dtTrigger.next();//Call the dtTrigger to rerender again
          });
        }
      else
        {
          this.IsDtInitialized = true;
          this.dtTrigger.next();
        }
    }

  EditRestorationDetails(arg)
    {
      this._RestorationDataModel = this._RestorationDataModel.CloneData(arg);
      this._PopupTitle = "Edit Restoration Details";
      this._AddNewDetails = false;
    }


  SaveDetails()
    {
      this.CommonService.ShowSpinner();
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
           this.ReloadDatatable();   
        }
        this._AddNewDetails = false;
    }

  SetParentData()
    {
      this.AllSurveyDetails.Result.RestorationDetails = this._AllSurveyDetails.Result.RestorationDetails
    }
   
  DeleteRestorationDetails(arg)
    {
      this.CommonService.ShowSpinner();
      let url = this.urlService.DeleteSurveyRestorationAPI + arg.SurveyRestorationId + '&surveyId='+ arg.SurveyId;
        this.httpService.get(url,null).subscribe(response => {
          let OwnerDetails : any = response;
          if (OwnerDetails.StatusCode != 200) 
            {
              alert(OwnerDetails.Message);
            }
            else {
              alert("Restoration Details deleted successfully!");
              this._AllSurveyDetails.Result.RestorationDetails = response.Result;
              this.SetParentData();
              this.ReloadDatatable();
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
