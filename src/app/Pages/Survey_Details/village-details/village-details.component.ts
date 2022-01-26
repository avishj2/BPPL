import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpResponse, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { APIUtilityService } from 'src/app/services/APIUtility.service';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import { VillageResponseModel, VillageChainageModel, VillageChainageResModel, VillageModel } from 'src/app/Model/Village.model';
import { HttpService } from '../../../services/http.service';
import { Subject, from } from 'rxjs';

@Component({
  selector: 'app-village-details',
  templateUrl: './village-details.component.html',
  styleUrls: ['./village-details.component.css']
})

export class VillageDetailsComponent implements OnInit {

  _SearchCriteria: SearchCriteria;
  _VillageModel: VillageModel;
  _NewChainage: VillageChainageModel;
  /**onchange of taluka dropdown village details form show/hide */
  _ShowVillageDetailsDiv: boolean = false;

  /**enable/disable input fields variables*/
  _DisabledInputField: boolean = true;
  _DisabledChainageField: boolean = true;
  _NewVillageAdd: boolean = false;
  _FilterControls: FilterControls;
  _AdditingMode: boolean = false;


  constructor(
    public urlService: UrlService,
    public APIUtilityService: APIUtilityService,
    private router: Router,
    private httpService: HttpService,
    public Utility: UtilityService
  ) {
    this._SearchCriteria = new SearchCriteria();
    this._VillageModel = new VillageModel();
    this._FilterControls = new FilterControls();
    this._NewChainage = new VillageChainageModel();
    this.SetFilterControls();
  }

  /**hide/show filter menu based on the component requirement */
  SetFilterControls() {
    this._FilterControls.ShowState = true;
    this._FilterControls.ShowDistrict = true;
    this._FilterControls.ShowTaluka = true;
    this._FilterControls.ShowVillage = true;
  }

  ngOnInit(): void {

  }



  /**1. Get Values From Filters component and assign into SearchCriteria
  *  2. Call AddOrUpdateVillage API
  */
  GetValuesFromFilters(event) {
    this.Utility.LogText(event);
    this._SearchCriteria = event;
    if (Object.keys(this._SearchCriteria).length === 0) {
      alert("Please Select State,District,taluka or village!!")
    }
    else {
      this._ShowVillageDetailsDiv = true;
      this._DisabledInputField = true;
      this._DisabledChainageField = true;
      this._NewVillageAdd = false;
      this._AdditingMode = false;

      this.GetVillageByVillageId();
    }
  }

  /**get village details based on the selected filter values */
  GetVillageByVillageId() {
    let url = this.urlService.GetVillageByVillageIdAPI + this._SearchCriteria.VillageId;
    this.httpService.get(url, null).subscribe(response => {
      this._VillageModel = response;
      this.Utility.LogText(this._VillageModel);
    }, error => {
      this.Utility.LogText(error);
    });
  }

  /**add NEW village details in database 
  *  show Add details button 
  */
  AddNewVillageDetails() {
    this._DisabledInputField = false;
    this._NewVillageAdd = true;
    this._VillageModel = new VillageModel(); // This will wipe out any previously selected village      
  }

  /**
  *enable only village input fields for village information editing
  */
  EditingModeOntoVillageDetails() {
    this._DisabledChainageField = true;
    this._DisabledInputField = false;
    this._NewVillageAdd = false;
  }

  /**chainage details edit separate */
  EditOnlyChaingeDetails(arg: VillageChainageModel) {
    // this.CalculateGreaterValue(arg);
    arg.IsEdit = true;
    //this._VillageChainageResModel.Result = arg;
  }


  /**delete Chainage Details item from chainage array*/
  DeleteChainageItem(index) {
    this._VillageModel.Chainages.splice(index, 1);
  }
  /**1. when add new village or updated village information call AddOrUpdateVillage API
    *2. At the time of editing chainage details save separately
  */
  SaveVillageDetails() {
    let url = this.urlService.AddOrUpdateVillageAPI;
    if (this._NewVillageAdd == false) {
      this._VillageModel.VillageId = this._SearchCriteria.VillageId;
    }
    this._VillageModel.TalukaId = this._SearchCriteria.TalukaId;

    this.httpService.Post(url, this._VillageModel).subscribe(response => {
      let villageResponseModel: VillageResponseModel = response;
      this.Utility.LogText(villageResponseModel);
      alert("Village added sucessfully!!")
    }, error => {
      this.Utility.LogText(error);
    });
  }

  /**add more items in the chainage array*/
  AddChainageItem() {
    this._DisabledChainageField = false;
    if (this._NewChainage.ChainageFrom > 0 && this._NewChainage.ChainageTo > 0 && this._NewChainage.SurveyAgency) {
      this._VillageModel.Chainages.push(this._NewChainage);
      this._NewChainage = new VillageChainageModel(); // Creating new object so that new data can be added
    }
  }

  /**1.ChangeTo value will be more than chaniageFrom 
   * 2. Auto calculate lengthinkm, it will be difference b/w chaniageFrom and ChangeTo
  */
  CalculateGreaterValue(arg: VillageChainageModel) {
    if (arg.ChainageFrom && arg.ChainageTo) {
      arg.LengthInKm = arg.ChainageTo - arg.ChainageFrom;
    }
  }


  /**delete village details base on the selected villageID */
  DeleteVillageDetails() {
    let url = this.urlService.DeleteVillageAPI + this._SearchCriteria.VillageId;

    this.httpService.get(url, null).subscribe(response => {
      let villageDeleteResponse: any = response;
      if (villageDeleteResponse.StatusCode != 200) {
        alert(villageDeleteResponse.Message);
      }
      else {
        alert("Villge deleted successfully !");
      }
      this.Utility.LogText("DeleteVillage success:" + villageDeleteResponse);
    }, error => {
      this.Utility.LogText("DeleteVillage error" + error);
    });
  }

  /**AT the time of editing/or on pageload chainage details save separate API */
  SaveChaingeDetails(data: VillageChainageModel, addReq: boolean) {
    if (this._NewVillageAdd == true) {
      // Add chianage in new village
      this._DisabledChainageField = false;
      if (this._NewChainage.ChainageFrom > 0 && this._NewChainage.ChainageTo > 0 && this._NewChainage.SurveyAgency) {
        this._VillageModel.Chainages.push(this._NewChainage);
        this._NewChainage = new VillageChainageModel(); // Creating new object so that new data can be added
      }
      return;
    }
    if (data.ChainageFrom > 0 && data.ChainageTo > 0 && data.SurveyAgency) {
      // Add chainage in existing village
      if (addReq) {
        data.VillageId = this._SearchCriteria.VillageId;
      }
      let url = this.urlService.AddOrUpdateVillageChainageAPI;
      this.httpService.Post(url, data).subscribe(response => {
        let villageChainageResModel: VillageChainageResModel = response;

        if (villageChainageResModel.StatusCode != 200) {
          alert(villageChainageResModel.Message);
        }
        else {
          this._VillageModel.Chainages = villageChainageResModel.Result;
          if (addReq) {
            this._NewChainage = new VillageChainageModel();
          }
        }
        this.Utility.LogText('AddOrUpdateVillageChainageAPI response' + response);
        /**added newly add chainge to the villaage details 
         * Refresh datatable 
        */
      }, error => {
        this.Utility.LogText("AddOrUpdateVillageChainageAPI error :" + error);
      });
    }
    else {
      alert("Please add chainage details before save !");
    }
  }

  CancelChainageReq(data: VillageChainageModel) {
    data.IsEdit = false;
  }
  /**At the time of chainage details editing delete single(row) 
   * chainge information through the API call
   * */
  DeleteChaingeDetails(argVillageChainageId) {
    let url = this.urlService.DeleteVillageChainageAPI + argVillageChainageId;
    this.httpService.get(url, null).subscribe(response => {
      let resp: VillageChainageResModel = response;
      if (resp.StatusCode != 200) {
        alert(resp.Message);
      }
      else {
        this._VillageModel.Chainages = resp.Result;
      }
    }, error => {
      this.Utility.LogText("AddOrUpdateVillageAPI error" + error);
    });
  }
}
