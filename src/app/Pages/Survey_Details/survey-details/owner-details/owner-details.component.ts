import { Component,AfterViewInit, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import {SurveyOwnerModel,OwnerRespDataModel,SurveyDropDownsDataModel,AllSurveyDetailsDataModel} from 'src/app/Model/Survey.model';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CommonDropdownModel} from 'src/app/Model/Base.model';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css']
})
export class OwnerDetailsComponent implements AfterViewInit, OnInit {
  _DisabledInputField: boolean = false;
  _AddNewOwner : boolean;
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

  @Input() SurveyDropDownsData : SurveyDropDownsDataModel;
  @Input() AllSurveyDetails : AllSurveyDetailsDataModel;
  @Input() SurveyNumber : any;
  @Output() Output:EventEmitter<any>= new EventEmitter();
  @ViewChild('closebutton') closebutton;

  _PopupTitle : string;
  _SurveyOwnerModel : SurveyOwnerModel;
  _AllSurveyDetails : AllSurveyDetailsDataModel;

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,) 
    { 
      this._SurveyOwnerModel = new SurveyOwnerModel();
      this._AllSurveyDetails = new AllSurveyDetailsDataModel();
    }


  ngOnInit(): void 
    {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        scrollX: true, //enable horizontal scrolling in the table
        scrollCollapse: true,
      }
      //console.log("FromParentData=>", this.SurveyDropDownsData);
      //console.log("FromParentData AllSurveyDetails=>",this.AllSurveyDetails)
      this._SurveyOwnerModel.SurveyId = this.SurveyNumber;
      this._AllSurveyDetails.Result.SurveyOwners = this.AllSurveyDetails.Result.SurveyOwners;
      this.ReloadDatatable();
    }


  AddNewOwnerDetails()
    {
      if(this.SurveyNumber != null){
        this._AddNewOwner = true;
        this._PopupTitle = "Add Owner Details";
        this._SurveyOwnerModel = new SurveyOwnerModel();
      }
      else
        {
          alert("Please Select Survey Number!!");
        }
    }


  EditOwnerDetails(arg)
    {
      this._PopupTitle = "Edit Owner Details";
      this._SurveyOwnerModel = arg;
      this._AddNewOwner = false;
    }


  SaveOwnerDetails()
    {
      this.CommonService.ShowSpinner();
      this._SurveyOwnerModel.SurveyId = this.SurveyNumber;
      let url = this.urlService.AddOrUpdateSurveyOwnerAPI;     
      this.httpService.HttpPostRequest(url,this._SurveyOwnerModel,this.AddOrUpdateOwnerCallBack.bind(this),null);
    }

  AddOrUpdateOwnerCallBack(dtas)
    {
      if (dtas != null)
        {
          let RespDataModel : OwnerRespDataModel  = dtas;
          if (RespDataModel.StatusCode != 200) 
            {
              alert(RespDataModel.Message);
            }
          if (this._AddNewOwner == false)
            {
              alert("Owner updated sucessfully!!");
              this._AllSurveyDetails.Result.SurveyOwners = RespDataModel.Result;
              this.closebutton.nativeElement.click();
              this.ReloadDatatable();
            }
          else
            {
              alert("Owner added sucessfully!!");
              this._AllSurveyDetails.Result.SurveyOwners = RespDataModel.Result;
              this.SetParentData();
              console.log("ownerdropdown",this.AllSurveyDetails.Result.SurveyOwnersDrp)
              this._AddNewOwner = false;
              this.closebutton.nativeElement.click();
              this.ReloadDatatable();
            }   
        }
        this._AddNewOwner = false;
        
    }

  SetParentData()
    {
      this.AllSurveyDetails.Result.SurveyOwnersDrp = [];
      let OwnerDetails = this._AllSurveyDetails.Result.SurveyOwners.forEach(element => {
        let drp = new CommonDropdownModel();
        drp.Text = element.OwnerName;
        drp.Value = element.SurveyOwnerId;
        this.AllSurveyDetails.Result.SurveyOwnersDrp.push(drp);
      });
    }

  DeleteOwnerDetails(arg)
    {
      this.CommonService.ShowSpinner();
      let url = this.urlService.DeleteSurveyOwnerAPI + arg.SurveyOwnerId + '&surveyId='+ arg.SurveyId;
        this.httpService.get(url,null).subscribe(response => {
          let OwnerDetails : any = response;
          if (OwnerDetails.StatusCode != 200) 
            {
              alert(OwnerDetails.Message);
            }
            else {
              alert("Owner Details deleted successfully!");
              this._AllSurveyDetails.Result.SurveyOwners = response.Result;
              this.SetParentData();
              this.ReloadDatatable();
            }
          },error => {
            this.Utility.LogText(error);
          });
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
}
