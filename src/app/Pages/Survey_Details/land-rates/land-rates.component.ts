import { AfterViewInit,Component, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CommonDropdownModel} from 'src/app/Model/Base.model';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import { LandRatesModel, LandRespModel }from 'src/app/Model/Crop&LandRates.model';
@Component({
  selector: 'app-land-rates',
  templateUrl: './land-rates.component.html',
  styleUrls: ['./land-rates.component.css']
})
export class LandRatesComponent implements AfterViewInit , OnInit {
  @ViewChild('closebutton') closebutton;

  /**data table properties  */
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;

  _PopupTitle : string;
  _FilterControls: FilterControls;
  _SearchCriteria: SearchCriteria;
  _ShowLandDetailsDiv : boolean = false;
  _AddNewLandDetails : boolean = false;

  _LandRatesModel : LandRatesModel;
  _LandRateDetails : LandRatesModel[];
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it ?";

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,) 
    { 
        this._SearchCriteria = new SearchCriteria();
        this._FilterControls = new FilterControls();
        this.SetFilterControls();
        this._LandRatesModel = new LandRatesModel();
        this._LandRateDetails = [];
    }

  /**hide/show filter menu based on the component requirement */
  SetFilterControls() 
    {
      this._FilterControls.ShowState = true;
      this._FilterControls.ShowDistrict = true;
      this._FilterControls.ShowTaluka = true;
      this._FilterControls.ShowVillage = true;
      this._FilterControls.ShowSurneyNos = true;
      this._FilterControls.ShowSearchBtn = true;
      this._FilterControls.ShowLandTypes = true;
    }
  
  ngOnInit(): void 
    {
      this.dtOptions = 
        {
          pagingType: 'full_numbers',
          pageLength: 5,
        };
    }
    ngAfterViewInit(): void 
    {
      this.dtTrigger.next();
    }
  /**refresh/reload data table 
   * when data update/delete/add in the datatable  
   * */
	ReloadDatatable(){
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
    /**1. Get Values From Filters component and assign into SearchCriteria
  *  2. 
  */
  GetValuesFromFilters(event)
     {
       //this.Utility.LogText(event);
       this._SearchCriteria = event;
       if(this._SearchCriteria.VillageId != null)
         {
          this.GetAllLandRates();
           this._ShowLandDetailsDiv = true;
         }
       else{
         alert("Please select Village");
       }
     }
  

  AddNewLandDetails()
    {
      if(this._SearchCriteria.VillageId != null)
      {
        this. _AddNewLandDetails = true;
        this._PopupTitle = "Add Land Rates";
        this._LandRatesModel = new LandRatesModel();
        this._LandRatesModel.LandId = 0;
      }
      else
        {
          alert("Please Select Village!!");
        }

    }

  EditLandRates(arg)
    {
      this._AddNewLandDetails = false;
      this._LandRatesModel = arg;
    }

  GetAllLandRates()
    {
      this.CommonService.ShowSpinnerLoading();
      let url = this.urlService.GetAllLandDetails + this._SearchCriteria.VillageId + '&surveyId='+ this._SearchCriteria.SurveyID;
      this.httpService.get(url,null).subscribe(response => {
        this._LandRateDetails  = response;
        this.ReloadDatatable();
        this.CommonService.hideSpinnerLoading();
        },error => {
          this.Utility.LogText(error);
          this.CommonService.hideSpinnerLoading();
        });
    }
    
  SaveLandDetails()
    {
      this.CommonService.ShowSpinnerLoading();
      if(this._SearchCriteria.SurveyID == null)
        {
          this._SearchCriteria.SurveyID = 0;
        }
      this.CommonService.ShowSpinner();
      this._LandRatesModel.TypeOfLand = 1061 //remove it
      this._LandRatesModel.VillageId = Number(this._SearchCriteria.VillageId);
      this._LandRatesModel.SurveyId = Number(this._SearchCriteria.SurveyID);
      let url = this.urlService.AddOrUpdateLandDetails;     
      this.httpService.HttpPostRequest(url,this._LandRatesModel, this.AddOrUpdateLandCallBack.bind(this),null);
    }

  AddOrUpdateLandCallBack(dtas)
    {
      if (dtas != null)
        {
          let RespDataModel : LandRespModel = dtas;
          if (RespDataModel.StatusCode != 200) 
            {
              alert(RespDataModel.Message);
            }
          if (this. _AddNewLandDetails == false)
            {
              alert("Land updated sucessfully!!");
              this._LandRateDetails = RespDataModel.Result;
              this.closebutton.nativeElement.click();
              this.ReloadDatatable();
            }
          else
            {
              alert("Land added sucessfully!!");
              this._LandRateDetails = RespDataModel.Result;
              this. _AddNewLandDetails = false;
              this.closebutton.nativeElement.click();
              this.ReloadDatatable();
              
            }   
        }
        this. _AddNewLandDetails = false;
        this.CommonService.hideSpinnerLoading();
    }

  DeleteLandRates(arg)
    {
      let url = this.urlService.DeleteLandDetailsAPI + arg.LandId + '&villageId='+ arg.VillageId +'&surveyId='+ arg.SurveyId;
      this.httpService.get(url,null).subscribe(response => {
        let CropDetails : any = response;
        if (CropDetails.StatusCode != 200) 
          {
            alert(CropDetails.Message);
          }
          else {
            alert("Land Rate deleted successfully!");
            this._LandRateDetails = response.Result;
            this.ReloadDatatable();
          }
        },error => {
          this.Utility.LogText(error);
        });
    }
GetLookupValue(lookups : CommonDropdownModel[], lookUpid: number) : any
  {
    let object = lookups.find(elm=>elm.Value == lookUpid );
    if(object)
    {
      return object.Text;
    }
    else { 
      return lookUpid;
    }
  }
}
