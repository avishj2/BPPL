import { Component,AfterViewInit, OnInit,ViewChild } from '@angular/core';
import {  NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ModelServiceService } from 'src/app/services/model-service.service';
import { AddEditVillagePopupComponent } from './add-edit-village-popup/add-edit-village-popup.component';
import { VillageDetailsDataModel,VillageChainage } from '../Add_Edit_Details.model';
import { UrlService } from 'src/app/services/url.service';
import { APIUtilityService } from 'src/app/services/APIUtility.service';

import { StateDetails,DistrictDetails,TalukaDetails,VillageDetails,SearchCriteria} from 'src/app/Pages/dropdowns/dropdown.model';
import { VillageRequestModel ,BaseVillageResponseDataModel } from 'src/app/Pages/Base.model';

@Component({
  selector: 'app-village-details',
  templateUrl: './village-details.component.html',
  styleUrls: ['./village-details.component.css']
})
export class VillageDetailsComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  datatable: any;

  _VillageDetailsDataModel : VillageDetailsDataModel;
  DisableInputField : boolean = true;
  
  _StateDataModel : StateDetails[];
  _DistrictDetails : DistrictDetails[];
  _TalukaDetails : TalukaDetails[];
  _VillageDetails : VillageDetails[];
  _SearchCriteria : SearchCriteria;
  _VillageRequestModel : VillageRequestModel;
  _BaseVillageResponseDataModel :BaseVillageResponseDataModel;
  _ShowVillageDetailsDiv : boolean = false;
  constructor(
    public modelServiceService : ModelServiceService,
    public urlService: UrlService,
    public APIUtilityService: APIUtilityService,
    private router: Router,
    private http: HttpClient,
    ){ 
      this._VillageDetailsDataModel = new VillageDetailsDataModel();
      this._SearchCriteria = new SearchCriteria();
      this._VillageRequestModel = new VillageRequestModel();
      this._BaseVillageResponseDataModel = new BaseVillageResponseDataModel();
  
      
    }

  ngOnInit(): void 
    {
      this.dtOptions = 
        {
          pagingType: 'full_numbers',
          pageLength: 10,
        };
      // if data table value is null on page load that time its gives error
      //that's why used this sample data
      this._VillageDetailsDataModel.VillageChainage = [
        {
          "SNo": 1,
          "ChainageFrom": 543,
          "ChainageTo": 326,
          "SurveyorName": "gdfhgdfh"
      }];
      /**populated all states name on page*/
      this.PopulateState();
    }

  ngAfterViewInit(): void 
  {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void 
  {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  /**After add chainage details refresh datatable  */
  rerenderDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  /**API CALL FOR state details */
  PopulateState()
    {
      let url = this.urlService.GetAllStatesAPI; 
      this.APIUtilityService.get(url,null).subscribe(res => {
        console.log('data response', res);
        this._StateDataModel = res;
        },error => {
          console.log("error",error);
        });
    }

  /**Get all District list base on the selected state */
  PopulateDistrict(argStateId)
  {
    this.ResetDropDowns(DropDownChangeEnum.StateChanged);
    let url = this.urlService.GetDistrictByStateAPI + argStateId; 
    this.APIUtilityService.get(url,null).subscribe(response => {
      console.log('data response', response);
      this._DistrictDetails = response;
      },error => {
        console.log("error",error);
      });
  }

  /**get all Taluka details base on the selected DistrictId */
  PopulateTaluka(argDistrictID)
    {
      this.ResetDropDowns(DropDownChangeEnum.DistrictChanged)
      let url = this.urlService.GetTalukaByDistrictAPI+ argDistrictID;
      this.APIUtilityService.get(url,null).subscribe(response => {
        // this._TalukaDetails = response;
        },error => {
          console.log("GetTalukaByDistrictAPI error",error);
        });
    }

    /**get all village details base on the selected Taluka */
  GetAllVillageDetails(argTalukaId)
    {
      this.ResetDropDowns(DropDownChangeEnum.TalukaChanged);
      /**show village details  */
      this._ShowVillageDetailsDiv = true;
      this.rerenderDataTable();
      let url = this.urlService.GetVillageByTalukaAPI + argTalukaId;
      this.APIUtilityService.get(url,null).subscribe(response => {
        this._VillageDetails = response;
        },error => {
          console.log("GetVillageByTalukaAPI error",error);
        });
    }

    SearchData(){
      console.log('SearchData',this._SearchCriteria)
      this.PopulatedVillageDetails();
    }


  PopulatedVillageDetails(){
    this._VillageRequestModel.TalukaId = this._SearchCriteria.TalukaId;
    this._VillageRequestModel.VillageId = this._SearchCriteria.VillageId;
    let url = this.urlService.AddOrUpdateVillageAPI;
    this.APIUtilityService.Post(url,this._VillageRequestModel).subscribe(response => {
      console.log('AddOrUpdateVillageAPI response', response);
      this._BaseVillageResponseDataModel = response;
      // this._BaseVillageResponseDataModel.VillageResponseModel.Result.VillageNumber
      },error => {
        console.log("AddOrUpdateVillageAPI error",error);
      });
  }

  /**add village details in data base
    * show process button 
    */
  AddVillageDetails()
   {
    this.DisableInputField = false
   }

  /**
   *enable input fields for village information edit
  */
  EditVillageDetails()
    {
      this.DisableInputField = false

    }

    /**save VillageDetails */
    SaveVillageDetails(){

    }

  getTableData() {
    let headers: string[] = [];
    // this._VillageDetailsDataModel.VillageChainage = this._tableData
    if(this._VillageDetailsDataModel.VillageChainage) {
      this._VillageDetailsDataModel.VillageChainage.forEach((value) => 
      {
        Object.keys(value).forEach((key) => {
          if(!headers.find((header) => header == key)){
            headers.push(key)
          }
        })
      })
    }
    return headers;
  }

    /**
     * This fucntion empty the colelction which binds the dropdown for state/district/tehsil/vilage respectivly based onthe
     * argument.
     * @param argSelection This defines what dropdown has changed. Based on this value below dropdowns will be changed
    */
    ResetDropDowns(argSelection : DropDownChangeEnum)
     {
       switch(argSelection)
       {
         case DropDownChangeEnum.StateChanged: 
           this._DistrictDetails = [];
           this._TalukaDetails = [];
           this._VillageDetails = [];
           this._ShowVillageDetailsDiv = false;
           this.ResetSelectedValue(argSelection);
           break;
         case DropDownChangeEnum.DistrictChanged: 
           this._TalukaDetails = [];
           this._VillageDetails = [];
           this._ShowVillageDetailsDiv = false;
           this.ResetSelectedValue(argSelection);
           break;
         case DropDownChangeEnum.TalukaChanged: 
           this._VillageDetails = [];
           this.ResetSelectedValue(argSelection);
           break;
       }
     }
 
     ResetSelectedValue(argSelection : DropDownChangeEnum)
       {
         switch(argSelection)
         {
             case DropDownChangeEnum.StateChanged:
               this._SearchCriteria.DistrictId = null;
               this._SearchCriteria.TalukaId = null;
               this._SearchCriteria.VillageId = null;
               break;
             case DropDownChangeEnum.DistrictChanged:
               this._SearchCriteria.TalukaId = null;
               this._SearchCriteria.VillageId = null;
               break;
             case DropDownChangeEnum.TalukaChanged:
               this._SearchCriteria.VillageId = null;
               break;
         }
       }
}

/**
* Defines the selection from the dropdown.
*/
export enum DropDownChangeEnum
{
   StateChanged = 1,
   DistrictChanged = 2,
   TalukaChanged = 3
}