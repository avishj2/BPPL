import { AfterViewInit,Component, OnInit, Input, Output,EventEmitter,ViewChild,SimpleChanges } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { APIUtilityService } from 'src/app/services/APIUtility.service';
import { CommonDropdownModel,CommonDocDataModel,LookupGroupModel} from 'src/app/Model/Base.model';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import { LegalDataModel } from 'src/app/Model/SurveyDocument.model';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-legal-documents',
  templateUrl: './legal-documents.component.html',
  styleUrls: ['./legal-documents.component.css']
})
export class LegalDocumentsComponent implements OnInit {
  @Input() OpenAsChild : boolean;
  /**data table properties  */
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  IsDtInitialized: boolean = false;
  _FilterControls: FilterControls;
  _SearchCriteria: SearchCriteria;
  _LegalDataModel : CommonDocDataModel[];
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it ?";
  Documentfile: File = null; 
  _LegalDocuments : CommonDocDataModel;
  _VillageTaluka :CommonDropdownModel[];
  _LegalDocsType :LookupGroupModel[];
  _VillageTalukaID
  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,
    public APIUtilityService: APIUtilityService,) 
    { 
      this._SearchCriteria = new SearchCriteria();
      this._FilterControls = new FilterControls();
      this._LegalDataModel = [];
      this._LegalDocuments = new CommonDocDataModel();
    }



  async ngOnInit() 
    {
      this.PopulateVillageTaluka();
      this.GetLegalDocsType(); 
      this.dtOptions = 
      {
        pagingType: 'full_numbers',
        pageLength: 10,
        language: {emptyTable : "No Documents!!"}
      };      
      this.GetLegalDocuments(); 
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

  /**get survey and all tabs details based on survey Number*/
  GetLegalDocsType()
    {
      let url = this.urlService.GetAllLookupsForLegalDocsAPI;
      this.httpService.get(url,null).subscribe(response => {
        this._LegalDocsType  = response;
        },error => {
          this.Utility.LogText(error);
        });      
    }

   /**get survey and all tabs details based on survey Number*/
  GetLegalDocuments()
    {
      this.IsDtInitialized = true;
      let url = this.urlService.GetLegalDocumentsAPI;
      this.httpService.HttpGetRequest(url,this.GetLegalDocumentsCallBack.bind(this),null);   
    }

   GetLegalDocumentsCallBack(dtas)
    {
      if (dtas != null)
        {
          this._LegalDataModel  = dtas;
        }
        this.ReloadDatatable();
    }

  onChangeDocument(event)
    {
      this.Documentfile = event.target.files[0];
    }

  UploadDocument(fileInput)
    {
      let Doc : CommonDocDataModel;
      if(!this.Documentfile)
      {
        alert("Please select file!!");
        return;
      }
      if(!this._LegalDocuments.Lookupid)
        {
          alert("Please select Form doc type !");
          return;
        }
      if(this._VillageTalukaID== null)
      {
        this._LegalDocuments.RequestId = 0;
      }
      else{
        this._LegalDocuments.RequestId = Number(this._VillageTalukaID);
      }
      this._LegalDocuments.Document = this.Documentfile;
      this._LegalDocuments.LookupGroupId = 0;
      this._LegalDocuments.DocumentId = 0;
      this._LegalDocuments.ToChainage= '';
      this._LegalDocuments.FromChainage = '';
      Doc = this._LegalDocuments;

      /**api call */
      this.CommonService.ShowSpinner();
      let url = this.urlService.AddLegalDocumentAPI; 
      this.httpService.Post(url, Doc.GetFormData()).subscribe(response => {
        let DocumentModelResp: CommonDocDataModel[] = response.Result;         
        this._LegalDataModel = DocumentModelResp;
        this.Utility.LogText(DocumentModelResp);
        alert("Document updated sucessfully!!");
        this.ReloadDatatable(); 
      },
      error => {
        this.Utility.LogText(error);
      });
      this.CommonService.hideSpinnerLoading();
      this.FileUploadreset(fileInput);
    }

  FileUploadreset(element) 
    {
      element.value = "";
      this.Documentfile = null;  
    }


  GetLookupValue(lookups : CommonDropdownModel[], lookUpid: Number) : any
    {
      if(lookUpid != 0)
        {
          let object = lookups.find(elm=>elm.Value == lookUpid );
          if(object)
          {
            return object.Text;
          }
          else { return lookUpid;}
        }
      else
        {
          lookUpid = null;
          return lookUpid;
        }
      
    }

  GetLookupValueNew(lookups : LookupGroupModel[], lookUpid: Number) : any
    {
      let object = lookups.find(elm=>elm.LookupId == lookUpid );
      if(object)
      {
        return object.lookupName;
      }
      else { return lookUpid;}
    }

  DownloadDocument(argData)
    {
      let url = this.urlService.DownloadLegalDocumentAPI + argData.DocumentId;
      this.APIUtilityService.DownloadDocument(url);
    }

  DeletedDocument(argData)
    {
      let APIurl = this.urlService.DeleteLegalDocumentAPI + argData.DocumentId;
      this.APIUtilityService.DeleteDocument(APIurl,this._LegalDocuments,argData);
      this.ReloadDatatable();
    }
}
