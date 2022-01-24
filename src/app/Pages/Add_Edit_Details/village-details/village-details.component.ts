import { Component,AfterViewInit, OnInit,ViewChild } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { APIUtilityService } from 'src/app/services/APIUtility.service';
import { StateDetails,DistrictDetails,TalukaDetails,VillageDetails,SearchCriteria, DropDownChangeEnum, FilterControls} from 'src/app/Model/Filters.model';
import { VillageResponseModel,VillageChainageModel,AddOrUpdateVillageChainageResponseModel } from 'src/app/Model/Village.model';
import {HttpService} from '../../../services/http.service';
import { Subject, from } from 'rxjs';

@Component({
  selector: 'app-village-details',
  templateUrl: './village-details.component.html',
  styleUrls: ['./village-details.component.css']
})

export class VillageDetailsComponent implements OnInit {
  _StateDataModel : StateDetails[];
  _DistrictDetails : DistrictDetails[];
  _TalukaDetails : TalukaDetails[];
  _VillageDetails : VillageDetails[];
  _SearchCriteria : SearchCriteria;
  _VillageResponseModel : VillageResponseModel;
  _VillageChainageResModel : AddOrUpdateVillageChainageResponseModel;
  /**onchange of taluka dropdown village details form show/hide */
  _ShowVillageDetailsDiv : boolean = false;

  /**enable/disable input fields variables*/
  _DisabledInputField : boolean = true;
  _DisabledChainageField : boolean = true;

  _NewVillageAdd : boolean = false;

  _FilterControls : FilterControls;
  _AdditingMode : boolean = false;
 

  constructor(
    public urlService: UrlService,
    public APIUtilityService: APIUtilityService,
    private router: Router,
    private httpService: HttpService,
    public Utility :UtilityService
    ){ 
      this._SearchCriteria = new SearchCriteria();
      this._VillageResponseModel = new VillageResponseModel();
      this._VillageChainageResModel = new AddOrUpdateVillageChainageResponseModel();
      this._FilterControls = new FilterControls();
      this.SetFilterControls();

    }

  /**hide/show filter menu based on the component requirement */
  SetFilterControls()
  {
    this._FilterControls.ShowState = true;
    this._FilterControls.ShowDistrict = true;
    this._FilterControls.ShowTaluka = true;
    this._FilterControls.ShowVillage = true;
  }
  
  ngOnInit(): void 
    {
      
    }

  

  /**1. Get Values From Filters component and assign into SearchCriteria
  * 2.  Call AddOrUpdateVillage API
  */
  GetValuesFromFilters(event)
  {
    this.Utility.LogText(event);
    this._SearchCriteria = event;
    if (Object.keys(this._SearchCriteria).length === 0) {
      alert("Please Select State,District,taluka or village!!")
    }
    else{
      /**show village details html div */
      this._ShowVillageDetailsDiv = true;
      this.GetVillageByVillageId();
    }
  }

  /**get village details based on the selected filter values */
  GetVillageByVillageId()
    {
      let url = this.urlService.GetVillageByVillageIdAPI + this._SearchCriteria.VillageId;
      this.httpService.get(url,null).subscribe(response => {
        this._VillageResponseModel.Result = response;
        console.log('GetVillageByVillageIdAPI response', this._VillageResponseModel);
        /**only for test */
        // this._VillageResponseModel.Result.Chainages = [
        //   {
        //     "VillageId": 0,
        //     "VillageChainageId": 1,
        //     "ChainageFrom": 0,
        //     "ChainageTo": 0,
        //     "SurveyAgency": "test",
        //     "LengthInKm": 0
        //   }
        // ];
        },error => {
          console.log("Get Village By VillageId API error",error);
        });
    }



    /**add NEW village details in database 
    *  show Add details button 
    */
  AddVillageDetails()
    {
      this._DisabledInputField = false;
      this._NewVillageAdd = true;
      // this._DisabledChainageField = false;
    }

  /**
  *enable input fields for village information edit
  */
  EditingModeOntoVillageDetails()
    {
      this._DisabledInputField = false;
      this._DisabledChainageField = false;
      this._NewVillageAdd = false;

    }


  /**add more items in the chainage array*/
  AddChainageItem()
    {
      this._DisabledChainageField = false;
      let data = new VillageChainageModel();
      this._VillageResponseModel.Result.Chainages.push(data)
    }

  /**delete Chainage Details item from chainage array*/
  DeleteChainageItem(index)
    {
      this._VillageResponseModel.Result.Chainages.splice(index, 1);  
    }


  /**1. when add new village or updated village information call AddOrUpdateVillage API
    *2. At the time of editing chainage details save separately
  */
  SaveVillageDetails()
    {
      this._VillageResponseModel.Result.Chainages.push(this._VillageChainageResModel.Result);
      let url = this.urlService.AddOrUpdateVillageAPI;
      this._VillageResponseModel.Result.VillageId = this._SearchCriteria.VillageId;
      this._VillageResponseModel.Result.TalukaId = this._SearchCriteria.TalukaId;
      this.httpService.Post(url,this._VillageResponseModel.Result).subscribe(response => {
        this._VillageResponseModel = response;
        console.log('AddOrUpdateVillageAPI response', this._VillageResponseModel);
        alert("Village added sucessfully!!")
        },error => {
          console.log("AddOrUpdateVillageAPI error",error);
        });
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
   
  /**chainage details edit separate */
  EditOnlyChaingeDetails()
  {
    this._DisabledInputField = false;
    this._DisabledChainageField = true;
  }

 
  /**AT the time of editing chainage details save separate API */
  SaveChaingeDetails()
    {
      this._VillageResponseModel.Result.Chainages.forEach(element => {
        element.VillageId = this._SearchCriteria.VillageId;
      });
      let url = this.urlService.AddOrUpdateVillageChainageAPI;
      this.httpService.Post(url,this._VillageResponseModel.Result.Chainages).subscribe(response => {
        this._VillageChainageResModel = response;
        alert(this._VillageChainageResModel.Message);
        console.log('AddOrUpdateVillageChainageAPI response', this._VillageChainageResModel);
        /**added newly add chainge to the villaage details 
         * Refresh datatable 
        */
        this._VillageResponseModel.Result.Chainages.push(this._VillageChainageResModel.Result);
        },error => {
          console.log("AddOrUpdateVillageChainageAPI error",error);
        });
    }

      /**AT the time of editing chainage details save separate API */
  DeleteChaingeDetails(argVillageChainageId)
    {
      let url = this.urlService.DeleteVillageChainageAPI + argVillageChainageId;
      this.httpService.Post(url,null).subscribe(response => {
        let resp : AddOrUpdateVillageChainageResponseModel = response;
        alert(resp.Message);
        },error => {
          console.log("AddOrUpdateVillageAPI error",error);
        });
    }


  // GetChainageTableData() {
  //   let headers: string[] = [];
  //   if(this._VillageResponseModel.Result.Chainages) {
  //     this._VillageResponseModel.Result.Chainages.forEach((value) => 
  //     {
  //       Object.keys(value).forEach((key) => {
  //         if(!headers.find((header) => header == key)){
  //           headers.push(key)
  //         }
  //       })
  //     })
  //   }
  //   return headers;
  // }
}
