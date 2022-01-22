import { Component,AfterViewInit, OnInit,ViewChild } from '@angular/core';
import {  NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { APIUtilityService } from 'src/app/services/APIUtility.service';
import { StateDetails,DistrictDetails,TalukaDetails,VillageDetails,SearchCriteria} from 'src/app/Common.Model/Filters.model';
import { VillageRequestModel ,VillageResponseModel } from 'src/app/Common.Model/Village.model';

@Component({
  selector: 'app-village-details',
  templateUrl: './village-details.component.html',
  styleUrls: ['./village-details.component.css']
})

export class VillageDetailsComponent implements OnInit {
  /**datatable proprties */
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  datatable: any;

  _StateDataModel : StateDetails[];
  _DistrictDetails : DistrictDetails[];
  _TalukaDetails : TalukaDetails[];
  _VillageDetails : VillageDetails[];
  _SearchCriteria : SearchCriteria;
  _VillageRequestModel : VillageRequestModel;
  _VillageResponseModel : VillageResponseModel;
  /**onchange of taluka dropdown village details form show/hide */
  _ShowVillageDetailsDiv : boolean = false;

  constructor(
    public urlService: UrlService,
    public APIUtilityService: APIUtilityService,
    private router: Router,
    private http: HttpClient,
    ){ 
      this._SearchCriteria = new SearchCriteria();
      this._VillageRequestModel = new VillageRequestModel();
      this._VillageResponseModel = new VillageResponseModel()
    }

  ngOnInit(): void 
    {
      this.dtOptions = 
        {
          pagingType: 'full_numbers',
          pageLength: 10,
        };
      /**populated all states name on page*/
      this.PopulateState();
      this._VillageRequestModel.IsEditable = true;
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

  /**refresh datatable  */
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
        this._TalukaDetails = response;
        },error => {
          console.log("GetTalukaByDistrictAPI error",error);
        });
    }

    /**get all village details base on the selected Taluka */
    GetVillageByTalukaId(argTalukaId)
    {
      this.ResetDropDowns(DropDownChangeEnum.TalukaChanged);
      /**show village details html div */
      this._ShowVillageDetailsDiv = true;
      let url = this.urlService.GetVillageByTalukaAPI + argTalukaId;
      this.APIUtilityService.get(url,null).subscribe(response => {
        this._VillageDetails = response;
        },error => {
          console.log("GetVillageByTalukaAPI error",error);
        });
    }

    /**search village details based on the selected dropdowns 
     * and call AddOrUpdateVillage API
    */
    SearchData(){
      console.log('SearchData',this._SearchCriteria)
      this.PopulatedVillageDetails();
    }


  PopulatedVillageDetails(){
    this._VillageRequestModel.TalukaId = this._SearchCriteria.TalukaId;
    this._VillageRequestModel.VillageId = this._SearchCriteria.VillageId;
    let url = this.urlService.AddOrUpdateVillageAPI;
    this.APIUtilityService.Post(url,this._VillageRequestModel).subscribe(response => {
      this._VillageResponseModel = response;
      console.log('AddOrUpdateVillageAPI response', this._VillageResponseModel);
      },error => {
        console.log("AddOrUpdateVillageAPI error",error);
      });
  }

  /**add NEW village details in data base
  * show process button 
  */
  AddVillageDetails()
   {
    this._VillageRequestModel.IsEditable = false
   }

  /**
   *enable input fields for village information edit
  */
  EditVillageDetails()
    {
      this._VillageRequestModel.IsEditable = false;
    }

    /**save VillageDetails */
    SaveVillageDetails(){

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