import { Component,AfterViewInit, OnInit,ViewChild } from '@angular/core';
import {  NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { APIUtilityService } from 'src/app/services/APIUtility.service';
import { StateDetails,DistrictDetails,TalukaDetails,VillageDetails,SearchCriteria, DropDownChangeEnum, FilterControls} from 'src/app/Model/Filters.model';
import { VillageResponseModel,VillageChainageModel } from 'src/app/Model/Village.model';
import {HttpService} from '../../../services/http.service';

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
  _VillageResponseModel : VillageResponseModel;
  /**onchange of taluka dropdown village details form show/hide */
  _ShowVillageDetailsDiv : boolean = false;
  _DisabledInputField : boolean = true;
  _AddNewVillage : boolean = false;

  _FilterControls : FilterControls;

  constructor(
    public urlService: UrlService,
    public APIUtilityService: APIUtilityService,
    private router: Router,
    private httpService: HttpService,
    ){ 
      this._SearchCriteria = new SearchCriteria();
      this._VillageResponseModel = new VillageResponseModel();
      this._FilterControls = new FilterControls();
      this.SetFilterControls();
    }

  SetFilterControls()
  {
    this._FilterControls.ShowState = true;
    this._FilterControls.ShowDistrict = true;
    this._FilterControls.ShowTaluka = true;
    this._FilterControls.ShowVillage = true;
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
      this.httpService.get(url,null).subscribe(res => {
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
    this.httpService.get(url,null).subscribe(response => {
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
      this.httpService.get(url,null).subscribe(response => {
        this._TalukaDetails = response;
        },error => {
          console.log("GetTalukaByDistrictAPI error",error);
        });
    }

    /**get all village details base on the selected Taluka */
    GetVillageByTalukaId(argTalukaId)
    {
      this.ResetDropDowns(DropDownChangeEnum.TalukaChanged);
      let url = this.urlService.GetVillageByTalukaAPI + argTalukaId;
      this.httpService.get(url,null).subscribe(response => {
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
      this.GetVillageByVillageId();

    }

  GetVillageByVillageId()
    {
      let url = this.urlService.GetVillageByVillageIdAPI + this._SearchCriteria.VillageId;
      this.httpService.get(url,null).subscribe(response => {
        this._VillageResponseModel.Result = response;
        console.log('GetVillageByVillageIdAPI response', this._VillageResponseModel);
        /**only for test */
        this._VillageResponseModel.Result.Chainages = [
          {
            "VillageId": 0,
            "VillageChainageId": 0,
            "ChainageFrom": 0,
            "ChainageTo": 0,
            "SurveyAgency": "test",
            "LengthInKm": 0
          }
        ];
        /**show village details html div */
        this._ShowVillageDetailsDiv = true;
        },error => {
          console.log("GetVillageByVillageIdAPI error",error);
        });
    }



  /**add NEW village details in data base
  * show process button 
  */
  AddVillageDetails()
   {
    this._AddNewVillage = true
    this._DisabledInputField = false
   }

  /**
   *enable input fields for village information edit
  */
  EditVillageDetails()
    {
      this._DisabledInputField = false;
    }


  /**when add new village or updated village information call
  * AddOrUpdateVillage API 
  * At the time of editing chainage save separately
  */
  AddOrUpdateVillageDetails(){
    let url = this.urlService.AddOrUpdateVillageAPI;
    this.httpService.Post(url,this._VillageResponseModel.Result).subscribe(response => {
      this._VillageResponseModel = response;
      console.log('AddOrUpdateVillageAPI response', this._VillageResponseModel);
      },error => {
        console.log("AddOrUpdateVillageAPI error",error);
      });
  }

  AddChainageDetails(){
      let data : VillageChainageModel;
      this._VillageResponseModel.Result.Chainages.push(data)
  }

  /**delete village details base on the selected villageID */
  DeleteVillageDetails()
    {
      let url = this.urlService.DeleteVillageAPI;
      this.httpService.get(url,this._SearchCriteria.VillageId).subscribe(response => {
        this._VillageResponseModel = response;
        console.log('AddOrUpdateVillageAPI response', this._VillageResponseModel);
        },error => {
          console.log("AddOrUpdateVillageAPI error",error);
        });
    }

    /**save VillageDetails */
    SaveVillageDetails(){
      console.log("add data",this._VillageResponseModel.Result)
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
           this._DisabledInputField = true;
          //  this._VillageResponseModel = null;
           this.ResetSelectedValue(argSelection);
           break;
         case DropDownChangeEnum.DistrictChanged: 
           this._TalukaDetails = [];
           this._VillageDetails = [];
           this._ShowVillageDetailsDiv = false;
           this._DisabledInputField = true;
          //  this._VillageResponseModel = null;
           this.ResetSelectedValue(argSelection);
           break;
         case DropDownChangeEnum.TalukaChanged: 
           this._VillageDetails = [];
          //  this._VillageResponseModel = null;
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
