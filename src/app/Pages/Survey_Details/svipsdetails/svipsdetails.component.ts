import { AfterViewInit,Component, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import {SVIPSRespModel , SVIPSModel,SVIPSDropDownsModel} from 'src/app/Model/SVIPS.model';
import { CommonDropdownModel,CommonDocDataModel} from 'src/app/Model/Base.model';
import { APIUtilityService } from 'src/app/services/APIUtility.service';

@Component({
  selector: 'app-svipsdetails',
  templateUrl: './svipsdetails.component.html',
  styleUrls: ['./svipsdetails.component.css']
})
export class SVIPSDetailsComponent implements OnInit {
  _SVIPSModel : SVIPSModel;
  _SVIPSDropDownsModel : SVIPSDropDownsModel;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  IsDtInitialized: boolean = false;
  _DisabledInputField : boolean = true;
  _ShowDetailsDiv : boolean = false;
  _AddNewSVIPS : boolean = false;
  _VillageTaluka :CommonDropdownModel[];
  _SVIPSDetails :CommonDropdownModel[];
  
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it ?";
  _SVIPSdoc :CommonDocDataModel;
  SVIPFile: File = null; // Variable to store file
  _SVIPSDetailsId: any;
  
  constructor(
    public urlService: UrlService,
    public APIUtilityService: APIUtilityService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,) 
      { 
        this._SVIPSDropDownsModel  = new SVIPSDropDownsModel();
        this._SVIPSModel = new SVIPSModel();
        this._SVIPSdoc = new CommonDocDataModel();
      }

  ngOnInit(): void 
    {
      this.SVIPSDropDowns();
      this.PopulateVillageTaluka();
      this.GetAllSVIPSDetails();
    }

  ngAfterViewInit(): void 
    {
      this.dtTrigger.next();      
    }

  SVIPSDropDowns()
    {
      let url = this.urlService.GetSVIPSDropDownsAPI;
      this.httpService.get(url,null).subscribe(response => {
        this._SVIPSDropDownsModel  = response;
        },error => {
          this.Utility.LogText(error);
        });      
    }


  GetAllSVIPSDetails()
    {
      let url = this.urlService.GetAllSVIPSDetailsAPI;
      this.httpService.get(url,null).subscribe(response => {
        this._SVIPSDetails  = response;
        },error => {
          this.Utility.LogText(error);
        });      
    }

  /**get all Taluka and village details */
  PopulateVillageTaluka()
    {
      let url = this.urlService.GetAllTalukaVillagesAPI;
      this.httpService.get(url,null).subscribe(response => {
      this._VillageTaluka = response;
      },
      error => {
        this.Utility.LogText2("GetAllTalukaVillagesAPI error",error);
      });
    }

  GetSVIPSDetailsById()
    {
      if(this._SVIPSDetailsId != null)
        {
          let url = this.urlService.GetSVIPSDetailsByIdAPI + this._SVIPSDetailsId;
          this.httpService.get(url, null).subscribe(response => {
            this._SVIPSModel = response;        
            this._ShowDetailsDiv = true;
            this._AddNewSVIPS = false;
            this._DisabledInputField = true;
            this.ReloadDatatable();
          }, error => {
            this.Utility.LogText(error);
          }); 
        }      
    } 

  AddNewSVIPSDetails()
    {
      this._ShowDetailsDiv = false;
      this._DisabledInputField = false;
      this._AddNewSVIPS = true;
      this._SVIPSModel = new SVIPSModel();
    }

  EditSVIPSDetails()
    {      
      if(this._SVIPSModel.SVIPSDetailsId != null)
      {
        this._DisabledInputField = false;
        this._AddNewSVIPS = false;
      }
      else{
        alert("SV-IPS DetailsId no found!")
      }      
    }  
  

  SaveSVIPSDetails()
    {
      this._SVIPSModel.VillageId = Number(this._SVIPSModel.VillageId);
      this._SVIPSModel.SVDetailsType = Number(this._SVIPSModel.SVDetailsType);
      this._SVIPSModel.Chainage = Number(this._SVIPSModel.Chainage);
      let url = this.urlService.AddOrUpdateSVIPSDetailsAPI;
      this.httpService.HttpPostRequest(url,this._SVIPSModel,this.AddOrUpdateSVIPSCallBack.bind(this),null);   
    }

    AddOrUpdateSVIPSCallBack(dtas)
      {
        if (dtas != null)
        {
          let RespDataModel : SVIPSRespModel = dtas;
          if (RespDataModel.StatusCode != 200) 
            {
              alert(RespDataModel.Message);
            }
          if (this._AddNewSVIPS == false)
            {
              alert("SV-IPS updated sucessfully!!");
              this._SVIPSDetails = RespDataModel.Result;
              this._DisabledInputField = true;
            }
          else
            {
              alert("SV-IPS added sucessfully!!");
              this._SVIPSDetails = RespDataModel.Result;
              this._DisabledInputField = true;          
              this._AddNewSVIPS = false;
              RespDataModel.Result.forEach(element => {
                this._SVIPSModel.SVIPSDetailsId = element.Value;
              });
            }           
        }
        this._AddNewSVIPS = false;
        this._ShowDetailsDiv = true;
        this.ReloadDatatable(); 
      }


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

  DeleteSVIPSDetails()
    {
      let url = this.urlService.DeleteSVIPSDetailsAPI + this._SVIPSModel.SVIPSDetailsId ;
      this.httpService.get(url,null).subscribe(response => {
        let APIResponse : any = response;
        if (APIResponse.StatusCode != 200) 
          {
            alert(APIResponse.Message);
          }
          else {
            alert("SV-IPS deleted successfully !");
            this._SVIPSDetails = APIResponse.Result;
            this._SVIPSDetailsId = null;
            this.ResetFlags();
          }
        },error => {
          this.Utility.LogText(error);
        });
    }

  // On file Select
  onChangeDocument(event)
    {
      this.SVIPFile = event.target.files[0];
    }

  FileUpload(isDoc : boolean, fileinput)
    {
        let Doc : CommonDocDataModel;
        if(!this.SVIPFile && isDoc)
        {
          alert("Please select file!!");
          return;
        }
        if(!this._SVIPSdoc.Lookupid && isDoc)
          {
            alert("Please select crossing doc type !");
            return;
          }

        this._SVIPSdoc.RequestId = Number(this._SVIPSDetailsId);
        this._SVIPSdoc.Document = this.SVIPFile;
        this._SVIPSdoc.ToChainage = '';
        this._SVIPSdoc.FromChainage = '';
        this._SVIPSdoc.DocumentId = 0;
        Doc = this._SVIPSdoc;

        /**api call */
        let url = this.urlService.AddSVIPSDetailsDocumentAPI; 
        this.httpService.Post(url, Doc.GetFormData()).subscribe(response => {
          let DocumentModelResp: CommonDocDataModel[] = response.Result;   
          if(isDoc)
          {       
            this._SVIPSModel.Documents = DocumentModelResp;
          }
          this.ReloadDatatable();
          this.Utility.LogText(DocumentModelResp);
          alert("Document updated sucessfully!!");
        },error => {
          this.Utility.LogText(error);
        });
        this.FileUploadreset(fileinput)// file object clear
    }

 FileUploadreset(element) 
   {
       element.value = "";
       this.SVIPFile = null;
   }

  /**download crossing details document */
  DownlaodSVIPSDocument(doc : CommonDocDataModel)
    {
      let url = this.urlService.SVIPSDownloadAPI + doc.DocumentId;
      this.APIUtilityService.DownloadDocument(url);
    }


  DeleteSVIPSDocument(doc : CommonDocDataModel)
    {
      let APIurl = this.urlService.DeleteSVIPSDetailsDocumentAPI + doc.DocumentId;
      this.APIUtilityService.DeleteDocument(APIurl,this._SVIPSModel.Documents,doc);
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
      this._ShowDetailsDiv = false;
      this._AddNewSVIPS = false;
      this._DisabledInputField  = true;
    }
}
