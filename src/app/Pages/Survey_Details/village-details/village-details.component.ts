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
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-village-details',
  templateUrl: './village-details.component.html',
  styleUrls: ['./village-details.component.css']
})

export class VillageDetailsComponent implements OnInit {
/**data table properties  */
@ViewChild(DataTableDirective, {static: false})
dtElement: DataTableDirective;
dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();
/**REFERSH DATATABLE  */
IsDtInitialized: boolean = false;

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
  _InvalidLengthInKm: boolean = false;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it ?";
  /**form fields validation */
  _IsFirstLoad = false;
  myFormGroup: FormGroup;

  constructor(
    public urlService: UrlService,
    public APIUtilityService: APIUtilityService,
    private router: Router,
    private httpService: HttpService,
    public Utility: UtilityService,
    public formBuilder: FormBuilder,
    public CommonService: CommonService,
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
    this._FilterControls.ShowSearchBtn = true;
  }

  ngOnInit(): void {
      this.dtOptions = 
      {
        pagingType: 'full_numbers',
        pageLength: 5,
      };
       /**validation for input fields */
       this.myFormGroup = this.formBuilder.group(
        {
          VillageNumber :['', [Validators.required]],
          VillageNameEng :['', [Validators.required]],
          VillageNameHindi :['', [Validators.required]],
          VillageNameLocal :['', [Validators.required]],
        });
    }

  ngAfterViewInit(): void 
    {
      this.dtTrigger.next();
      console.log('ngAfterViewInit');
    }
  
  /**validation error control required*/  
  get errorControl() 
  {
    return this.myFormGroup.controls;
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
  *  2. Call AddOrUpdateVillage API
  */
  GetValuesFromFilters(event) {
    this.Utility.LogText(event);
    this._SearchCriteria = event;
    if (Object.keys(this._SearchCriteria).length === 0) 
      {
        alert("Please Select State,District,taluka or village!!")
      }
    else if(this._SearchCriteria.VillageId == null)
      {
        alert("Please Select Village Name!!");
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
      this.ReloadDatatable();
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
    this.ReloadDatatable();     
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
  }

  /**1. when add new village or updated village information call AddOrUpdateVillage API
    *2. At the time of editing chainage details save separately
  */
  SaveVillageDetails() {
    this._IsFirstLoad = true; //for time validation
      if (!this.myFormGroup.valid)
        {
          alert("Please Add Village details!!");
          return false;
        }
        else 
        {
          this.CommonService.ShowSpinner();
          let url = this.urlService.AddOrUpdateVillageAPI;
          if (this._NewVillageAdd == false) 
            {
              this._VillageModel.VillageId = this._SearchCriteria.VillageId;
            }
            this._VillageModel.TalukaId = this._SearchCriteria.TalukaId;
            
            this.httpService.Post(url, this._VillageModel).subscribe(response => {
            let villageResponseModel: VillageResponseModel = response;
            this.Utility.LogText(villageResponseModel);
            if (this._NewVillageAdd == false)
            {
              alert("Village updated sucessfully!!");
              this._DisabledInputField = true;
            }
            else
            {
              alert("Village added sucessfully!!");
              this._DisabledInputField = true;
            }
          },error => {
            this.Utility.LogText(error);
          });
        }
  }

  /**1.ChangeTo value will be more than chaniageFrom 
   * 2. Auto calculate lengthinkm, it will be difference b/w chaniageFrom and ChangeTo
  */
  CalculateGreaterValue(arg: VillageChainageModel) {
    if (arg.ChainageFrom && arg.ChainageTo) {
      /**auto calculate value of the LengthInKm*/
      arg.LengthInKm = arg.ChainageTo - arg.ChainageFrom;
    }
  }

  /**delete village details base on the selected villageID */
  DeleteVillageDetails() 
  {
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
  SaveChainageDetails(data: VillageChainageModel, addReq: boolean) {
    if (this._NewVillageAdd == true) {
      // Add chianage in new village
      this._DisabledChainageField = false;
      if (this._NewChainage.ChainageFrom > 0 && this._NewChainage.ChainageTo > 0 && this._NewChainage.SurveyAgency && data.ChainageTo > data.ChainageFrom) {
        this._VillageModel.Chainages.push(this._NewChainage);
        this.ReloadDatatable();
        this._NewChainage = new VillageChainageModel(); // Creating new object so that new data can be added
      }
      return;
    }
    if (Number(data.ChainageFrom) > 0 && Number(data.ChainageTo) > 0 && data.SurveyAgency && Number(data.ChainageTo) > Number(data.ChainageFrom)) {
      // Add chainage in existing village(edit mode)
      if (addReq) {
        data.VillageId = this._SearchCriteria.VillageId;
        this._DisabledChainageField = false;
      }
      let url = this.urlService.AddOrUpdateVillageChainageAPI;
      this.httpService.Post(url, data).subscribe(response => {
        let villageChainageResModel: VillageChainageResModel = response;

        if (villageChainageResModel.StatusCode != 200) {
          alert(villageChainageResModel.Message);
        }
        else {
          this._VillageModel.Chainages = villageChainageResModel.Result;
          this.ReloadDatatable();
          this._DisabledInputField = true;
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
  }

  CancelChainageReq(data: VillageChainageModel) {
    data.IsEdit = false;
  }


  /**At the time of chainage details editing delete single(row) 
   * chainge information through the API call
   * */
  DeleteChaingeDetails(argVillageChainageId) 
    {
      if(this._NewVillageAdd == true)
      {
        this._VillageModel.Chainages.splice(argVillageChainageId, 1);
        this.ReloadDatatable();
      }
      else{
        let url = this.urlService.DeleteVillageChainageAPI + argVillageChainageId;
        this.httpService.get(url, null).subscribe(response => {
          let resp: VillageChainageResModel = response;
          if (resp.StatusCode != 200) {
            alert(resp.Message);
          }
          else {
            this._VillageModel.Chainages = resp.Result;
            this.ReloadDatatable();
          }
        }, error => {
          this.Utility.LogText("AddOrUpdateVillageAPI error" + error);
        });
      }
    }
    
}
