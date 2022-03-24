import { Component, OnInit } from '@angular/core';
import { CrossDetailsDataModel } from 'src/app/Pages/Survey_Details/Survey_Details.model';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import { HttpService } from '../../../services/http.service';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient, HttpResponse, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { APIUtilityService } from 'src/app/services/APIUtility.service';
import { CommonDropdownModel, CommonDocDataModel} from 'src/app/Model/Base.model';
import { CrossingDetailsDataModel,CrossingModel } from 'src/app/Model/Crossing.model';
import { CrossingDropdownDataModel } from 'src/app/Model/Filters.model';
import { TwoDigitDecimaNumberDirective } from 'src/app/Pages/filters/two-digit-decima-number.directive';

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


  constructor(public urlService: UrlService,
    public APIUtilityService: APIUtilityService,
    private router: Router,
    private httpService: HttpService,
    public Utility: UtilityService,) 
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
      this._FilterControls.ShowState = true;
      this._FilterControls.ShowDistrict = true;
      this._FilterControls.ShowTaluka = true;
      this._FilterControls.ShowChainageFrom = true;
      this._FilterControls.ShowChainageTo = true;
      this._FilterControls.ShowVillage = true;
      this._FilterControls.ShowCrossingTypes = true;
      this._FilterControls.ShowCrossingNumber = true;
      this._FilterControls.ShowSearchBtn = true;
    }

  ngOnInit(): void 
    {
      this.PopulateCrossingDropdowns();
      
    }

  GetValuesFromFilters(event) 
    {
      this.Utility.LogText(event);
      this._SearchCriteria = event;
      if(this._SearchCriteria.CrossingID != null)
        {
          this.GetCrossingDatabyId();
          this._ShowCrossingDetailsDiv = true;
          this._AddNewCrosssing = false;
          this._DisabledCrossingInputField = true;
        }
      else{
        alert("Please select Crossing ID")
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

  /***
   * Get CROSSING details By ID 
   */
  GetCrossingDatabyId()
    {
      let url = this.urlService.GetCrossingByIdAPI + this._SearchCriteria.CrossingID;
      this.httpService.get(url, null).subscribe(response => {
        this._CrossingDataModel = response;
      }, error => {
        this.Utility.LogText(error);
      }); 
    } 

  /**add new crossing details */
  AddNewCrossingDetails()
    {
      this._DisabledCrossingInputField = false;
      this._AddNewCrosssing = true;
      this._CrossingDataModel = new CrossingModel();
      this._ShowCrossingDetailsDiv = false;
      this._CrossingDataModel.TypeOfCrossing = this._SearchCriteria.CrossingType;
      this._CrossingDataModel.CrossingId = this._SearchCriteria.CrossingID;
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
      if(!this._SearchCriteria.CrossingID && this._CrossingDataModel.CrossingApproval != null)
      {
        alert("Please select CrossingType and CrossingID!!");
        return;
      }
      if (!this._CrossingDataModel.hasOwnProperty('CrossingApproval')) {
        alert("Please select Crossing Approval option!");
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
          let GazetteRespDataModel : CrossingDetailsDataModel = dtas;
          if (GazetteRespDataModel.StatusCode != 200) 
            {
              alert(GazetteRespDataModel.Message);
            }
          if (this._AddNewCrosssing == false)
            {
              alert("Gazette updated sucessfully!!");
              this._DisabledCrossingInputField = true;
            }
          else
            {
              alert("Gazette added sucessfully!!");
              this._DisabledCrossingInputField = true;
              this._CrossingDataModel.CrossingId = GazetteRespDataModel.Result.CrossingId;
              this._AddNewCrosssing = false;
            }   
        }
        this._AddNewCrosssing = false;
        this._ShowCrossingDetailsDiv = true;
    }

    /**delete crossing details */
  DeleteCrossingDetails()
    {
      let url = this.urlService.DeleteCrossingAPI + this._SearchCriteria.CrossingID ;
      this.httpService.get(url,null).subscribe(response => {
        let CrossingDetails : any = response;
        if (CrossingDetails.StatusCode != 200) 
          {
            alert(CrossingDetails.Message);
          }
          else {
            alert("Crossing deleted successfully !");
            this._CrossingDataModel = new CrossingModel();
            this.GetCrossingDatabyId();
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

  FileUpload(isDoc : boolean)
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
        this.Utility.LogText(crossingDocumentModelResp);
        alert("Document updated sucessfully!!");
      },error => {
        this.Utility.LogText(error);
      });
  }

  /**download crossing details document */
  DownlaodCrossingDocument(doc : CommonDocDataModel)
    {
      let url = this.urlService.DownloadCrossingDocAPI + doc.DocumentId;
      let link = document.createElement('a');
      link.setAttribute('type', 'hidden');
      link.setAttribute("target","_blank");
      link.href = url;
      link.download = "C:/Users/admin/Downloads/";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }


  DeleteCrossingDocument(doc : CommonDocDataModel)
    {
      let url = this.urlService.DeleteCrossingDocumentAPI + doc.DocumentId;
      this.httpService.get(url,null).subscribe(response => {
      let index = this._CrossingDataModel.Documents.indexOf(doc);
      this._CrossingDataModel.Documents.splice(index,1);
      alert("Crossing document deleted !");  
      }, 
      error => {
        this.Utility.LogText(error);
      });
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
}
