import { Component,AfterViewInit, OnInit,ViewChild } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { APIUtilityService } from 'src/app/services/APIUtility.service';
import { SearchCriteria, FilterControls} from 'src/app/Model/Filters.model';
import { VillageResponseModel,VillageChainageModel,VillageChainageResModel } from 'src/app/Model/Village.model';
import { HttpService } from '../../../services/http.service';
import { Subject, from } from 'rxjs';

@Component({
  selector: 'app-village-details',
  templateUrl: './village-details.component.html',
  styleUrls: ['./village-details.component.css']
})

export class VillageDetailsComponent implements OnInit {
 
  _SearchCriteria : SearchCriteria;
  _VillageResponseModel : VillageResponseModel;
  _VillageChainageResModel : VillageChainageResModel;
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
      this._VillageChainageResModel = new VillageChainageResModel();
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
  *  2. Call AddOrUpdateVillage API
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
        this._DisabledInputField = true;
        this._DisabledChainageField = true;
      }
    }

  /**get village details based on the selected filter values */
  GetVillageByVillageId()
    {
      let url = this.urlService.GetVillageByVillageIdAPI + this._SearchCriteria.VillageId;
      this.httpService.get(url,null).subscribe(response => {
        this._VillageResponseModel.Result = response;
        console.log('GetVillageByVillageIdAPI response', this._VillageResponseModel);
        },error => {
          console.log("Get Village By VillageId API error",error);
        });
    }

  /**add NEW village details in database 
  *  show Add details button 
  */
  AddNewVillageDetails()
    {
      this._DisabledInputField = false;
      this._NewVillageAdd = true;
      this._VillageResponseModel = new VillageResponseModel();
      // this._DisabledChainageField = false;
      
    }

  /**
  *enable only village input fields for village information editing
  */
  EditingModeOntoVillageDetails()
    {
      this._DisabledChainageField = true;
      this._DisabledInputField = false;
      this._NewVillageAdd = false;
    }

  /**chainage details edit separate */
  EditOnlyChaingeDetails(arg)
    {
      // this.CalculateGreaterValue(arg);
      this._DisabledInputField = true;
      this._DisabledChainageField = false;
      console.log("chainage data",arg);
      this._VillageChainageResModel.Result = arg;
    }

  /**1. when add new village or updated village information call AddOrUpdateVillage API
    *2. At the time of editing chainage details save separately
  */
  SaveVillageDetails()
    {
      /**add data for api argument */
      this._VillageResponseModel.Result.Chainages.push(this._VillageChainageResModel.Result);
      this._VillageResponseModel.Result.TalukaId = this._SearchCriteria.TalukaId;
      this.Utility.LogText(this._VillageResponseModel.Result);

      /**call AddOrUpdateVillageAPI */
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

  /**add more items in the chainage array*/
  AddChainageItem()
    {
      // let data = new VillageChainageModel();
      this._VillageResponseModel.Result.Chainages.push(this._VillageChainageResModel.Result);
      console.log(this._VillageResponseModel.Result.Chainages);
    }

  /**1.ChangeTo value will be more than chaniageFrom 
   * 2. Auto calculate lengthinkm, it will be difference b/w chaniageFrom and ChangeTo
  */
  CalculateGreaterValue(arg)
    {
      this._VillageChainageResModel.Result.LengthInKm = this._VillageChainageResModel.Result.ChainageTo - this._VillageChainageResModel.Result.ChainageFrom;
    }


  /**delete village details base on the selected villageID */
  DeleteVillageDetails()
    {
      let url = this.urlService.DeleteVillageAPI + this._SearchCriteria.VillageId;
      this.httpService.get(url,null).subscribe(response => {
        this._VillageResponseModel = response;
        console.log('AddOrUpdateVillageAPI response', this._VillageResponseModel);
        },error => {
          console.log("AddOrUpdateVillageAPI error",error);
        });
    }
   
  /**AT the time of editing/or on pageload chainage details save separate API */
  SaveChaingeDetails()
    {
      this._VillageChainageResModel.Result.VillageId = this._SearchCriteria.VillageId;
      let url = this.urlService.AddOrUpdateVillageChainageAPI;
      this.httpService.Post(url,this._VillageChainageResModel.Result).subscribe(response => {
        this._VillageChainageResModel = response;
        alert(this._VillageChainageResModel.Message);
        console.log('AddOrUpdateVillageChainageAPI response', this._VillageChainageResModel);
        /**new added chainge show in the datatable */
        this._VillageResponseModel.Result.Chainages.push(this._VillageChainageResModel.Result);
        },error => {
          console.log("AddOrUpdateVillageChainageAPI error",error);
        });
    }

  /**At the time of chainage details editing delete single(row) 
   * chainge information through the API call
   * */
  DeleteChaingeDetails(argVillageChainageId)
    {
      let url = this.urlService.DeleteVillageChainageAPI + argVillageChainageId;
      this.httpService.Post(url,null).subscribe(response => {
        let resp : VillageChainageResModel = response;
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
