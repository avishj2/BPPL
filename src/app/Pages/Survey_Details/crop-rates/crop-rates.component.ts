import { AfterViewInit,Component, OnInit, Input, Output,EventEmitter,ViewChild,ViewChildren,QueryList } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonDropdownModel, CommonDocDataModel} from 'src/app/Model/Base.model';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import { CropsRateModel,CropDropDownsModel,CropsRateRespDataModel,CropandDocDetailsModel }from 'src/app/Model/Crop&LandRates.model';
import { APIUtilityService } from 'src/app/services/APIUtility.service';

@Component({
  selector: 'app-crop-rates',
  templateUrl: './crop-rates.component.html',
  styleUrls: ['./crop-rates.component.css']
})

export class CropRatesComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  /**data table properties  */
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;
  dtOptions: DataTables.Settings[] = [];
  dtTrigger1: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  _PopupTitle : string;
  _AddNewCropRates : boolean = false;
  _FilterControls: FilterControls;
  _SearchCriteria: SearchCriteria;
  _CropsRateModel : CropsRateModel;
  _CropDropDownsModel : CropDropDownsModel;
  _CropandDocDetailsModel :CropandDocDetailsModel;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it ?";
  _ShowCropDetailsDiv : boolean = false;
  _TalukaName : string;
  _VillageID : any;
  _Cropdocument : CommonDocDataModel ;
  Cropfile: File = null; // Variable to store file

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,
    public APIUtilityService: APIUtilityService,)
     {
        this._SearchCriteria = new SearchCriteria();
        this._FilterControls = new FilterControls();
        this.SetFilterControls();
        this._CropsRateModel = new CropsRateModel();
        this._CropDropDownsModel = new CropDropDownsModel();
        this._CropandDocDetailsModel = new CropandDocDetailsModel();
        this._Cropdocument = new CommonDocDataModel();
     }

  /**hide/show filter menu based on the component requirement */
  SetFilterControls() 
    {
      this._FilterControls.ShowState = true;
      this._FilterControls.ShowDistrict = true;
      this._FilterControls.ShowTaluka = true;
      this._FilterControls.ShowVillage = false;
      this._FilterControls.ShowSurneyNos = false;
      this._FilterControls.ShowSearchBtn = true;
    }

  ngOnInit(): void 
    {
      this.dtOptions[1] = 
        {
          pagingType: 'full_numbers',
          pageLength: 5,
          language: {emptyTable : "There are no details!!"}
        };
      this.dtOptions[2] = 
        {
          pagingType: 'full_numbers',
          pageLength: 5,
          language: {emptyTable : "No Documents!!"}
        };
      this.GetCropDropdownData();
    }

  ngAfterViewInit(): void 
    {
      this.dtTrigger1.next();
      this.dtTrigger2.next();
    }
  /**refresh/reload data table 
   * when data update/delete/add in the datatable  
   * */
	ReloadDatatable()
  {
    this.dtElements.forEach((dtElement: DataTableDirective,index: number) => {
      if(dtElement.dtInstance)
          dtElement.dtInstance.then((dtInstance: any) => {
          dtInstance.destroy(); 
          this.Utility.LogText(`The DataTable ${index} instance ID is: ${dtInstance.table().node().id}`);         
      });
    });
    this.dtTrigger1.next(); 
    this.dtTrigger2.next();   
  }  

  /**get selected dropdown value from child component */
  GetValuesFromFilters(event)
    {
      this._SearchCriteria = event;
      if(this._SearchCriteria.TalukaId != null)
        {
          this._ShowCropDetailsDiv = true;
          this._VillageID = null;
          this._TalukaName = " - "+ this._SearchCriteria.TalukaName;
          this.GetAllCrops();
        }
      else
      {
        alert("Please select Tehsil!");
        this._ShowCropDetailsDiv = false;
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
      let url = this.urlService.GetAllCropsAPI + this._SearchCriteria.TalukaId;
      this.httpService.get(url,null).subscribe(response => {
        this._CropandDocDetailsModel  = response;
        this.ReloadDatatable();
        this.CommonService.hideSpinnerLoading();
        },error => {
          this.Utility.LogText(error);
          this.CommonService.hideSpinnerLoading();
        });
    }  


  AddNewCropDetails(){
    if(this._SearchCriteria.TalukaId != null)
    {
      this._AddNewCropRates = true;
      this._PopupTitle = "Add Crop Rates";
      this._CropsRateModel = new CropsRateModel();
      this._CropsRateModel.CropId = 0;
    }
    else
      {
        alert("Please Select Village!!");
      }
  }
  ResetFilterValues(event)
    {
      this.Utility.LogText2("Reset data=>", event)
    }


  EditCropRates(arg)
    {
      this._CropsRateModel = this._CropsRateModel.CloneData(arg);
      this._PopupTitle = "Edit Crop Rates";
      this._AddNewCropRates = false;
    }
   
  SaveDetails()
    {
      if(this._SearchCriteria.TalukaId!= null)
      {
        this.CommonService.ShowSpinnerLoading();
        this._CropsRateModel.VillageId = this._VillageID;
        this._CropsRateModel.TehsilId = Number(this._SearchCriteria.TalukaId);
        this._CropsRateModel.CropLookupId = Number(this._CropsRateModel.CropLookupId);
        this._CropsRateModel.SeasonId = Number(this._CropsRateModel.SeasonId);
        let url = this.urlService.AddOrUpdateCropsRateAPI;     
        this.httpService.HttpPostRequest(url,this._CropsRateModel, this.AddOrUpdateCropCallBack.bind(this),null);
      }
      else{
        ("Please add Tahsil name!!")
      }      
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
          if (this._AddNewCropRates == false)
            {
              alert("Crop updated sucessfully!!");
              this._CropandDocDetailsModel.Crops = RespDataModel.Result;
              this.closebutton.nativeElement.click();
              this.ReloadDatatable();
            }
          else
            {
              alert("Crop added sucessfully!!");
              this._CropandDocDetailsModel.Crops = RespDataModel.Result;
              this._AddNewCropRates = false;
              this.closebutton.nativeElement.click();
              this.ReloadDatatable();              
            }   
        }
        this.CommonService.hideSpinnerLoading();
        this._AddNewCropRates = false;
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
            this._CropandDocDetailsModel.Crops = response.Result;
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

  DownloadDoc(doc : CommonDocDataModel)
    {
      let url = this.urlService.DownloadTehsilCropDocumentAPI + doc.DocumentId;
      this.APIUtilityService.DownloadDocument(url);
    }

  // On file Select
  onChangeDocument(event)
    {
      this.Cropfile = event.target.files[0];
    }

  FileUpload(isDoc : boolean, fileinput)
    {
      let Doc : CommonDocDataModel;
      if(!this.Cropfile && isDoc)
      {
        alert("Please select file!!");
        return;
      }
      if(!this._Cropdocument.Lookupid && isDoc)
        {
          alert("Please select Crop document type !");
          return;
        }

      this._Cropdocument.RequestId = Number(this._SearchCriteria.TalukaId);
      this._Cropdocument.Document = this.Cropfile;
      this._Cropdocument.ToChainage = '';
      this._Cropdocument.FromChainage = '';
      this._Cropdocument.DocumentId = 0;
      Doc = this._Cropdocument;

      /**api call */
      let url = this.urlService.AddTehsilCropDocumentAPI; 
      this.httpService.Post(url, Doc.GetFormData()).subscribe(response => {
        let CropDocumentModelResp: CommonDocDataModel[] = response.Result;   
        if(isDoc)
        {       
          this._CropandDocDetailsModel.Documents = CropDocumentModelResp;
        }
        this.ReloadDatatable();
        this.Utility.LogText(CropDocumentModelResp);
        alert("Document Uploaded sucessfully!!");
      });
      this.FileUploadreset(fileinput)// file object clear
  }

  FileUploadreset(element) 
    {
        element.value = "";
        this.Cropfile = null;
    }

  DeleteCropDocument(doc : CommonDocDataModel)
    {
      let APIurl = this.urlService.DeleteTehsilCropDocumentAPI + doc.DocumentId;
      this.APIUtilityService.DeleteDocument(APIurl,this._CropandDocDetailsModel.Documents,doc)
      .subscribe(response => {
        this.ReloadDatatable();
      });
    }
  
}
