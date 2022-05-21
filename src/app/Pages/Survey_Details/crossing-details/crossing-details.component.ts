import { Component,AfterViewInit, OnInit, Input,OnChanges, Output,EventEmitter,ViewChild,ViewChildren } from '@angular/core';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import { HttpService } from '../../../services/http.service';
import { HttpClient, HttpResponse, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { APIUtilityService } from 'src/app/services/APIUtility.service';
import { CommonDropdownModel, CommonDocDataModel} from 'src/app/Model/Base.model';
import { CrossingDetailsDataModel,CrossingModel } from 'src/app/Model/Crossing.model';
import { CrossingDropdownDataModel } from 'src/app/Model/Filters.model';
import { TwoDigitDecimaNumberDirective } from 'src/app/Pages/filters/two-digit-decima-number.directive';
import { CommonService} from 'src/app/services/common.service';

@Component({
  selector: 'app-crossing-details',
  templateUrl: './crossing-details.component.html',
  styleUrls: ['./crossing-details.component.css']
})
export class CrossingDetailsComponent implements OnInit {
_CrossingDataModel : CrossingModel;
_FilterControls: FilterControls;
_ShowCrossingDetailsDiv: boolean = false;
_AddNewCrosssing: boolean = false;
_DisabledCrossingInputField : boolean = true;
 /**popup message variables */
 popoverTitle ="Delete Details";
 popoverMessage = "Are you sure you want to delete it ?";
 _SearchCriteria: SearchCriteria;
 _CrossingDropdowns :CrossingDropdownDataModel;
 _Crossingdoc : CommonDocDataModel ;
 Crossingfile: File = null; // Variable to store file
 _CrossingTypeName : string = "";

   /**data table properties  */
   @ViewChild(DataTableDirective, {static: false})
   dtElement: DataTableDirective;
   dtOptions: DataTables.Settings = {};
   dtTrigger: Subject<any> = new Subject();
   /**REFERSH DATATABLE  */
   IsDtInitialized: boolean = false;
  

  constructor(public urlService: UrlService,
    public APIUtilityService: APIUtilityService,
    private router: Router,
    private httpService: HttpService,
    public Utility: UtilityService,
    public CommonService : CommonService,) 
      { 
        this._CrossingDataModel = new CrossingModel();
        this._FilterControls = new FilterControls();
        this._SearchCriteria = new SearchCriteria();
        this.SetFilterControls();
        this._CrossingDropdowns = new CrossingDropdownDataModel();
        this._Crossingdoc = new CommonDocDataModel();
      }


  /**hide/show filter menu based on the component requirement */
  SetFilterControls() 
    {
      this._FilterControls.ShowState = false;
      this._FilterControls.ShowDistrict = false;
      this._FilterControls.ShowTaluka = false;
      this._FilterControls.ShowChainageFrom = false;
      this._FilterControls.ShowChainageTo = false;
      this._FilterControls.ShowVillage = false;
      this._FilterControls.ShowCrossingTypes = true;
      this._FilterControls.ShowCrossingNumber = true;
      this._FilterControls.ShowSearchBtn = true;
    }

  ngOnInit(): void 
    {
      this.dtOptions = 
        {
          pagingType: 'full_numbers',
          pageLength: 5,
          language: {emptyTable : "No Crossing Documents!!"}
        };
      this.PopulateCrossingDropdowns();      
    }

  ngAfterViewInit(): void 
    {
      this.dtTrigger.next();
    }

  /**refresh/reload data table 
  *when data update/delete/add in the datatable  
  **/
  ReloadDatatable()
    {
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

  GetValuesFromFilters(event) 
    {
      this.Utility.LogText(event);
      this._SearchCriteria = event;
      if(this._SearchCriteria.CrossingID != null)
        {
          this.GetCrossingDatabyId();
        }
      else{
        alert("Please select Crossing ID")
      }           
    }
    
    SearchFilterChanged(event)
    {
       let newSearchCriteria : SearchCriteria = event;
       if(!this._ShowCrossingDetailsDiv && !this._AddNewCrosssing && this._DisabledCrossingInputField)
       {
          this._SearchCriteria = newSearchCriteria;
          this._CrossingTypeName = this._SearchCriteria.CrossingTypeName; 
       }
       else if(this._AddNewCrosssing)
       {
          this._SearchCriteria = newSearchCriteria;
          this._CrossingDataModel.TypeOfCrossing = this._SearchCriteria.CrossingType; 
          this._CrossingTypeName = this._SearchCriteria.CrossingTypeName; 
       }
    }

  /** get Crossing Dropdown values*/
  PopulateCrossingDropdowns()
    {
      let url = this.urlService.GetCrossingDropDownsAPI;
      this.httpService.get(url,null).subscribe(response => {
        this._CrossingDropdowns = response;
        },
        error => {
          this.Utility.LogText(error);
        });
    }

  ResetFilterValues(event)
    {
      
    }

  /***
   * Get CROSSING details By ID - Called only on Search click !
   */
  GetCrossingDatabyId()
    {
      this.CommonService.ShowSpinnerLoading();
      let url = this.urlService.GetCrossingByIdAPI + this._SearchCriteria.CrossingID;
      this.httpService.get(url, null).subscribe(response => {
        this._CrossingDataModel = response;        
        this._ShowCrossingDetailsDiv = true;
        this._AddNewCrosssing = false;
        this._DisabledCrossingInputField = true;
        this._CrossingTypeName = this._SearchCriteria.CrossingTypeName; 
        this.ReloadDatatable();
        this.CommonService.hideSpinnerLoading();
      }, error => {
        this.Utility.LogText(error);
        this.CommonService.hideSpinnerLoading();
      }); 
    } 

  /**add new crossing details */
  AddNewCrossingDetails()
    {
      if(this._SearchCriteria.CrossingType != null)
      {
        this._DisabledCrossingInputField = false;
        this._AddNewCrosssing = true;
        this._CrossingDataModel = new CrossingModel();
        this._ShowCrossingDetailsDiv = false;
        this._CrossingDataModel.TypeOfCrossing = this._SearchCriteria.CrossingType; 
        this._CrossingTypeName = this._SearchCriteria.CrossingTypeName;
      }
      else{
        alert("Please Select Crossing Type!!")
      }         
    }

  /**EDIT new crossing details */
  EditCrossingDetails()
    {
      this._DisabledCrossingInputField = false;
      this._AddNewCrosssing = false;
    }

    /**save deatils to the api */
  SaveCrossingDetails()
    {
      this.CommonService.ShowSpinnerLoading();
      if(!this._SearchCriteria.CrossingType)
      {
        alert("Please select CrossingType !!");
        this.CommonService.hideSpinnerLoading();
        return;        
      }
      if (!this._CrossingDataModel.hasOwnProperty('CrossingApproval')) {
        alert("Please select Crossing Approval option!");
        this.CommonService.hideSpinnerLoading();
        return;
      }
      let url = this.urlService.AddOrUpdateCrossingAPI;     
      this.httpService.HttpPostRequest(url,this._CrossingDataModel,this.AddOrUpdateCrossingCallBack.bind(this),null);
    }

  /**
  * @param dtas 
  */
  AddOrUpdateCrossingCallBack(dtas)
    {
      if (dtas != null)
        {
          let RespDataModel : CrossingDetailsDataModel = dtas;
          if (RespDataModel.StatusCode != 200) 
            {
              alert(RespDataModel.Message);
            }
          if (this._AddNewCrosssing == false)
            {
              alert("Crossing updated sucessfully!!");
              this._DisabledCrossingInputField = true;
            }
          else
            {
              alert("Crossing added sucessfully!!");
              this._DisabledCrossingInputField = true;
              this._CrossingDataModel.CrossingId = RespDataModel.Result.CrossingId;
              this._AddNewCrosssing = false;
            }           
        }
        this._AddNewCrosssing = false;
        this._ShowCrossingDetailsDiv = true;
        this.ReloadDatatable(); 
    }

    /**delete crossing details */
  DeleteCrossingDetails()
    {
      let url = this.urlService.DeleteCrossingAPI + this._CrossingDataModel.CrossingId ;
      this.httpService.get(url,null).subscribe(response => {
        let CrossingDetails : any = response;
        if (CrossingDetails.StatusCode != 200) 
          {
            alert(CrossingDetails.Message);
          }
          else {
            alert("Crossing deleted successfully !");
            this.ResetFlags();
          }
        },error => {
          this.Utility.LogText(error);
        });
    }

  // On file Select
  onChangeDocument(event)
    {
      this.Crossingfile = event.target.files[0];
    }

  FileUpload(isDoc : boolean, fileinput)
    {
      let Doc : CommonDocDataModel;
      if(!this.Crossingfile && isDoc)
      {
        alert("Please select file!!");
        return;
      }
      if(!this._Crossingdoc.Lookupid && isDoc)
        {
          alert("Please select crossing doc type !");
          return;
        }

      this._Crossingdoc.RequestId = this._CrossingDataModel.CrossingId;
      this._Crossingdoc.Document = this.Crossingfile;
      this._Crossingdoc.ToChainage = '';
      this._Crossingdoc.FromChainage = '';
      this._Crossingdoc.DocumentId = 0;
      Doc = this._Crossingdoc;

      /**api call */
      let url = this.urlService.AddCrossingDocumentAPI; 
      this.httpService.Post(url, Doc.GetFormData()).subscribe(response => {
        let crossingDocumentModelResp: CommonDocDataModel[] = response.Result;   
        if(isDoc)
        {       
          this._CrossingDataModel.Documents = crossingDocumentModelResp;
        }
        this.ReloadDatatable();
        this.Utility.LogText(crossingDocumentModelResp);
        alert("Document updated sucessfully!!");
      },error => {
        this.Utility.LogText(error);
      });
      this.FileUploadreset(fileinput)// file object clear
  }

    FileUploadreset(element) 
      {
          element.value = "";
          this.Crossingfile = null;
      }

  /**download crossing details document */
  DownlaodCrossingDocument(doc : CommonDocDataModel)
    {
      let url = this.urlService.DownloadCrossingDocAPI + doc.DocumentId;
      this.APIUtilityService.DownloadDocument(url);
    }


  DeleteCrossingDocument(doc : CommonDocDataModel)
    {
      let APIurl = this.urlService.DeleteCrossingDocumentAPI + doc.DocumentId;
      this.APIUtilityService.DeleteDocument(APIurl,this._CrossingDataModel.Documents,doc);
      this.ReloadDatatable();
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

    ResetFlags()
    {
      this._ShowCrossingDetailsDiv = false;
      this._AddNewCrosssing = false;
      this._DisabledCrossingInputField  = true;
    }
}
