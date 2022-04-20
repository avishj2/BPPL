import { AfterViewInit,Component, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonDropdownModel} from 'src/app/Model/Base.model';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import { CropsRateModel,CropDropDownsModel,CropsRateRespDataModel }from 'src/app/Model/Crop&LandRates.model';

@Component({
  selector: 'app-crop-rates',
  templateUrl: './crop-rates.component.html',
  styleUrls: ['./crop-rates.component.css']
})

export class CropRatesComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  /**data table properties  */
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;

  _PopupTitle : string;
  _AddNewCropRates : boolean = false;
  _FilterControls: FilterControls;
  _SearchCriteria: SearchCriteria;
  _CropsRateModel : CropsRateModel;
  _CropDropDownsModel : CropDropDownsModel;
  _CropDetailsModel :CropsRateModel[];
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it ?";
  _ShowCropDetailsDiv : boolean = false;

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,)
     {
        this._SearchCriteria = new SearchCriteria();
        this._FilterControls = new FilterControls();
        this.SetFilterControls();
        this._CropsRateModel = new CropsRateModel();
        this._CropDropDownsModel = new CropDropDownsModel();
        this._CropDetailsModel = [];
     }

  /**hide/show filter menu based on the component requirement */
  SetFilterControls() 
    {
      this._FilterControls.ShowState = true;
      this._FilterControls.ShowDistrict = true;
      this._FilterControls.ShowTaluka = true;
      this._FilterControls.ShowVillage = true;
      this._FilterControls.ShowSurneyNos = false;
      this._FilterControls.ShowSearchBtn = true;
    }

  ngOnInit(): void 
    {
      this.dtOptions = 
        {
          pagingType: 'full_numbers',
          pageLength: 5,
        };
      this.GetCropDropdownData();
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

  /**get selected dropdown value from child component */
  GetValuesFromFilters(event)
    {
      this._SearchCriteria = event;
      if(this._SearchCriteria.VillageId != null)
        {
          this._ShowCropDetailsDiv = true;
          this.GetAllCrops();
        }
      else
      {
        alert("Please select Village!");
        this._ShowCropDetailsDiv = false;
      }
    }

  SearchFilterChanged(event)
    {
      let newSearchCriteria : SearchCriteria = event;
        if(!this._ShowCropDetailsDiv && !this._AddNewCropRates)
        {
          this._SearchCriteria = newSearchCriteria;
          this.Utility.LogText(this._SearchCriteria);
          this._ShowCropDetailsDiv = true;
          this.GetAllCrops();
        }
    }
  GetCropDropdownData()
    {
      let url = this.urlService.GetCropDropDownsAPI;
      this.httpService.get(url,null).subscribe(response => {
        this._CropDropDownsModel  = response;
        },error => {
          this.Utility.LogText(error);
        });
    }  

  GetAllCrops()
    {
      this.CommonService.ShowSpinnerLoading();
      let url = this.urlService.GetAllCropsAPI + this._SearchCriteria.VillageId;
      this.httpService.get(url,null).subscribe(response => {
        this._CropDetailsModel  = response;
        this.ReloadDatatable();
        this.CommonService.hideSpinnerLoading();
        },error => {
          this.Utility.LogText(error);
          this.CommonService.hideSpinnerLoading();
        });
    }  


  AddNewCropDetails(){
    if(this._SearchCriteria.VillageId != null)
    {
      this. _AddNewCropRates = true;
      this._PopupTitle = "Add Crop Rates";
      this._CropsRateModel = new CropsRateModel();
      this._CropsRateModel.CropId = 0;
    }
    else
      {
        alert("Please Select Village!!");
      }
  }


  EditCropRates(arg)
    {
      this._CropsRateModel = arg;
      this._PopupTitle = "Edit Crop Rates";
      this._AddNewCropRates = false;
    }
   
  SaveDetails()
    {
      this.CommonService.ShowSpinnerLoading();
      this._CropsRateModel.VillageId = this._SearchCriteria.VillageId;
      this._CropsRateModel.CropLookupId = Number(this._CropsRateModel.CropLookupId);
      this._CropsRateModel.SeasonId = Number(this._CropsRateModel.SeasonId);
      let url = this.urlService.AddOrUpdateCropsRateAPI;     
      this.httpService.HttpPostRequest(url,this._CropsRateModel, this.AddOrUpdateCropCallBack.bind(this),null);
    }

  AddOrUpdateCropCallBack(dtas)
    {
      if (dtas != null)
        {
          let RespDataModel : CropsRateRespDataModel = dtas;
          if (RespDataModel.StatusCode != 200) 
            {
              alert(RespDataModel.Message);
            }
          if (this. _AddNewCropRates == false)
            {
              alert("Crop updated sucessfully!!");
              this._CropDetailsModel = RespDataModel.Result;
              this.closebutton.nativeElement.click();
              this.ReloadDatatable();
            }
          else
            {
              alert("Crop added sucessfully!!");
              this._CropDetailsModel = RespDataModel.Result;
              this. _AddNewCropRates = false;
              this.closebutton.nativeElement.click();
              this.ReloadDatatable();
              
            }   
        }
        this.CommonService.hideSpinnerLoading();
        this. _AddNewCropRates = false;
    }

  DeleteCropRates(arg)
    {
      let url = this.urlService.DeleteCropsAPI + arg.CropId + '&villageId='+ arg.VillageId;
      this.httpService.get(url,null).subscribe(response => {
        let CropDetails : any = response;
        if (CropDetails.StatusCode != 200) 
          {
            alert(CropDetails.Message);
          }
          else {
            alert("Crops Rate deleted successfully!");
            this._CropDetailsModel = response.Result;
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
