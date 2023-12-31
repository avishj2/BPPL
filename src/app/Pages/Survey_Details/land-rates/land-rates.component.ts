import { AfterViewInit,Component, OnInit, Input, Output,EventEmitter,ViewChild ,ViewChildren,QueryList} from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CommonDropdownModel,CommonDocDataModel} from 'src/app/Model/Base.model';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import { LandRatesModel, LandRespModel,LandDropDownsModel,LandandDocDetailsModel }from 'src/app/Model/Crop&LandRates.model';
import { APIUtilityService } from 'src/app/services/APIUtility.service';

@Component({
  selector: 'app-land-rates',
  templateUrl: './land-rates.component.html',
  styleUrls: ['./land-rates.component.css']
})
export class LandRatesComponent implements AfterViewInit , OnInit {
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
  _FilterControls: FilterControls;
  _SearchCriteria: SearchCriteria;
  _ShowLandDetailsDiv : boolean = false;
  _AddNewLandDetails : boolean = false;
  _LandRatesModel : LandRatesModel;
  _LandRateDetails : LandRatesModel[];
  _LandDropDownsModel :LandDropDownsModel;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it ?";
  _VillageName : string;
  _VillageId : any;
  _LandRatesdocument: CommonDocDataModel;
  Landfile: File = null; // Variable to store file
  _LandandDocDetailsModel : LandandDocDetailsModel;
  _LandTypeDetails : CommonDropdownModel[];

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
        this._LandRatesModel = new LandRatesModel();
        this._LandRateDetails = [];
        this._LandDropDownsModel = new LandDropDownsModel();
        this._LandRatesdocument = new CommonDocDataModel();
        this._LandandDocDetailsModel = new LandandDocDetailsModel();
    }

  /**hide/show filter menu based on the component requirement */
  SetFilterControls() 
    {
      this._FilterControls.ShowState = true;
      this._FilterControls.ShowDistrict = true;
      this._FilterControls.ShowTaluka = true;
      this._FilterControls.ShowVillage = true;
      this._FilterControls.ShowSearchBtn = true;
      this._FilterControls.ShowLandTypes = true;
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
      this.GetLandDropdownData();
    }

    ngAfterViewInit(): void 
      {
        this.dtTrigger1.next();
        this.dtTrigger2.next();
      }
  /**refresh/reload data table 
   * when data update/delete/add in the datatable  
   * */
	ReloadDatatable(){
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
          this._VillageId = this._SearchCriteria.VillageId;                   
          this.GetSurveyTabLabel();
          this._ShowLandDetailsDiv = true;
          this.GetLandTypesByVillage(this._VillageId)
         }
       else{
         alert("Please select Village");
       }
     }


     GetLandTypesByVillage(argvillageId)
      {
        let url = this.urlService.GetLandTypesByVillageAPI + argvillageId;
        this.httpService.get(url,null).subscribe(response => {
          this._LandTypeDetails = response; 
          },
          error => {
            this.Utility.LogText2("GetLandTypesByVillageAPI error",error); 
          });
      }
 

    GetSurveyTabLabel()
     {
      if(this._SearchCriteria.SurveyID != null)
        {
          this._VillageName = " - "+ this._SearchCriteria.VillageName + " ("+this._SearchCriteria.SurveyName +")";
        }
      else
      {
        this._VillageName = " - "+ this._SearchCriteria.VillageName
      }
     }

    SearchFilterChanged(event)
     {
       let newSearchCriteria : SearchCriteria = event;
         if(newSearchCriteria.VillageId != null)
         {
           this._AddNewLandDetails = true;
           this._SearchCriteria = newSearchCriteria;
           this.Utility.LogText(this._SearchCriteria);           
         }
     }

  GetLandDropdownData()
     {
       let url = this.urlService.GetLandDropDownsAPI;
       this.httpService.get(url,null).subscribe(response => {
         this._LandDropDownsModel  = response;
         },error => {
           this.Utility.LogText(error);
         });
     }  

  AddNewLandDetails()
    {
      if(this._SearchCriteria.VillageId != null)
      {
        this._AddNewLandDetails = true;
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
      this._LandRatesModel = this._LandRatesModel.CloneData(arg);
    }

  GetAllLandRates()
    {
      this.CommonService.ShowSpinnerLoading();
      let url = this.urlService.GetAllLandDetails + this._SearchCriteria.VillageId + (this._SearchCriteria.SurveyID ? '&surveyId=' + this._SearchCriteria.SurveyID:"" );
      this.httpService.get(url,null).subscribe(response => {
        this._LandandDocDetailsModel  = response;
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
      if(this._LandRatesModel.TypeOfLand == null)
        {
          alert("Please select Land Type!!")
        }
      else
      {
        this._SearchCriteria.SurveyID = null;        
        this._LandRatesModel.TypeOfLand = Number(this._LandRatesModel.TypeOfLand);
        this._LandRatesModel.VillageId = Number(this._VillageId);
        this._LandRatesModel.SurveyId = this._SearchCriteria.SurveyID;
        this._LandRatesModel.MeasureUnit = Number(this._LandRatesModel.MeasureUnit);
        let url = this.urlService.AddOrUpdateLandDetails;     
        this.httpService.HttpPostRequest(url,this._LandRatesModel, this.AddOrUpdateLandCallBack.bind(this),null);
      }
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
              this._LandandDocDetailsModel.Lands = RespDataModel.Result;
              this.closebutton.nativeElement.click();
              this.ReloadDatatable();
            }
          else
            {
              alert("Land added sucessfully!!");
              this._LandandDocDetailsModel.Lands = RespDataModel.Result;
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
      let url = "";
      if(arg.SurveyId ==null)
        {
          url = this.urlService.DeleteLandDetailsAPI + arg.LandId + '&villageId='+ arg.VillageId;
        }
      else{
        url = this.urlService.DeleteLandDetailsAPI + arg.LandId + '&villageId='+ arg.VillageId +'&surveyId='+ arg.SurveyId;
      }       
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

  ResetFilterValues(event)
    {
      
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

  DownloadDoc(doc : CommonDocDataModel)
    {
      let url = this.urlService.DownloadVillageLandDocumentAPI + doc.DocumentId;
      this.APIUtilityService.DownloadDocument(url);
    }

  // On file Select
  onChangeDocument(event)
    {
      this.Landfile = event.target.files[0];
    }

  FileUpload(isDoc : boolean, fileinput)
    {
      let Doc : CommonDocDataModel;
      if(!this.Landfile && isDoc)
      {
        alert("Please select file!!");
        return;
      }
      if(!this._LandRatesdocument.Lookupid && isDoc)
        {
          alert("Please select land document type !");
          return;
        }
      this._LandRatesdocument.RequestId = Number(this._SearchCriteria.VillageId);
      this._LandRatesdocument.Document = this.Landfile;
      this._LandRatesdocument.ToChainage = '';
      this._LandRatesdocument.FromChainage = '';
      this._LandRatesdocument.DocumentId = 0;
      Doc = this._LandRatesdocument;

      /**api call */
      let url = this.urlService.AddVillageLandDocumentAPI; 
      this.httpService.Post(url, Doc.GetFormData()).subscribe(response => {
        let LandDocumentModelResp: CommonDocDataModel[] = response.Result;   
        if(isDoc)
        {       
          this._LandandDocDetailsModel.Documents = LandDocumentModelResp;
        }
        this.ReloadDatatable();
        alert("Document Uploaded sucessfully!!");
      });
      this.FileUploadreset(fileinput)// file object clear
  }

  FileUploadreset(element) 
    {
        element.value = "";
        this.Landfile = null;
    }

    DeleteLandDocument(doc : CommonDocDataModel)
      {
        let APIurl = this.urlService.DeleteVillageLandDocumentAPI + doc.DocumentId;
        this.APIUtilityService.DeleteDocument(APIurl,this._LandandDocDetailsModel.Documents,doc)
        .subscribe(response => {
          this.ReloadDatatable();
        });
      }
  
}
