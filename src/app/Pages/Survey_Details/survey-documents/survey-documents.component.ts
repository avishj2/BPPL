import { AfterViewInit, Component, OnDestroy, OnInit,Input,Output,ViewChildren,QueryList } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CategoryDataModel} from '../Survey_Details.model';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import {SurveyDocDropDownsDataModel,CommonReportsDataModel } from 'src/app/Model/SurveyDocument.model';
import {BaseResponse, CommonDropdownModel,CommonDocDataModel} from 'src/app/Model/Base.model';
import { APIUtilityService } from 'src/app/services/APIUtility.service';

@Component({
  selector: 'app-survey-documents',
  templateUrl: './survey-documents.component.html',
  styleUrls: ['./survey-documents.component.css']
})

export class SurveyDocumentsComponent implements OnInit {
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;
  dtOptions: DataTables.Settings[] = [];
  dtTrigger1: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();
  dtTrigger3: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  _dtElements

  _FilterControls: FilterControls;
  _SearchCriteria: SearchCriteria;
  _SurveyDocDropDownsDataModel : SurveyDocDropDownsDataModel;
  _ProjectReports : CommonReportsDataModel[];
  _AlignmentSheets : CommonReportsDataModel[];
  _AwardMutations : CommonReportsDataModel[];

  Documentfile: File = null; 
  _Projectdoc : CommonDocDataModel;
  _Aligntdoc : CommonDocDataModel;
  _Mutationdoc : CommonDocDataModel;

  _CategoryDataModel :CategoryDataModel;
  _CategoryID : any;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it ?";

  constructor(
    public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,
    public APIUtilityService: APIUtilityService,)
    {
      this._CategoryDataModel = new CategoryDataModel()
      this._SearchCriteria = new SearchCriteria();
      this._FilterControls = new FilterControls();
      this.SetFilterControls();
      this._SurveyDocDropDownsDataModel = new SurveyDocDropDownsDataModel();
      this._ProjectReports = [];
      this._AlignmentSheets = [];
      this._AwardMutations = [];
      this._Projectdoc = new CommonDocDataModel();
      this._Aligntdoc = new CommonDocDataModel();
      this._Mutationdoc = new CommonDocDataModel();
    }

   /**hide/show filter menu based on the component requirement */
   SetFilterControls() 
    {
      this._FilterControls.ShowState = true;
      this._FilterControls.ShowDistrict = true;
      this._FilterControls.ShowTaluka = true;
      this._FilterControls.ShowVillage = true;
      this._FilterControls.ShowSurneyNos = false;
      this._FilterControls.ShowChainageFrom = false;
      this._FilterControls.ShowChainageTo = false;
      this._FilterControls.ShowSearchBtn = true;
    }

  ngOnInit(): void {
    this._CategoryDataModel.ReadFromString();
    this.dtOptions[1] = {
      pagingType: 'full_numbers',
      destroy:true //Add to allow the datatable to destroy
    };
    this.dtOptions[2] = {
      pagingType: 'full_numbers',
      destroy:true 
    };
    this.dtOptions[3] = {
      pagingType: 'full_numbers',
      destroy:true 
    };
    this.GetSurveyDocumentDropDowns();
  }

  /**refresh/reload data table 
 * when data update/delete/add in the datatable  
 * */
   rerenderDataTable(){
    /**initialized datatable */
    if (this.IsDtInitialized) 
      {
        this._dtElements.forEach((dtElement: DataTableDirective,index: number) => {
          if(dtElement.dtInstance)
            // dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtElement.dtInstance.then((dtInstance: any) => {
              dtInstance.destroy(); 
              this.Utility.LogText(`The DataTable ${index} instance ID is: ${dtInstance.table().node().id}`);         
          });
        });
        this.dtTrigger1.next(); 
        this.dtTrigger2.next(); 
        this.dtTrigger3.next();       
      }
      else
        {
          this.IsDtInitialized = true;
          this.dtTrigger1.next(); 
          this.dtTrigger2.next(); 
          this.dtTrigger3.next(); 
        }
  }

  ngAfterViewInit() {
    this.dtTrigger1.next();
    this.dtTrigger2.next();
    this.dtTrigger3.next();
 }

 ViewInit() {
  this.dtTrigger1.next();
  this.dtTrigger2.next();
  this.dtTrigger3.next();
}

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger1.unsubscribe();
    this.dtTrigger2.unsubscribe();
    this.dtTrigger3.unsubscribe();
  }

  /**get value from child component */
  GetValuesFromFilters(event) 
    {
      this.Utility.LogText2("Pre-eng",event);
      this._SearchCriteria = event;
      if(this._SearchCriteria.VillageId != null)
        {
          this.GetAwardAndMutations();
          this.rerenderDataTable(); 
        }
      else
        {
          alert("Please select village!!")
        }
    }

    SearchFilterChanged(event)
    {
      let newSearchCriteria : SearchCriteria = event;
        if(newSearchCriteria.VillageId !=null)
        {
          this._SearchCriteria = newSearchCriteria;
          this.Utility.LogText(this._SearchCriteria);
          this.GetAwardAndMutations();
          this.rerenderDataTable(); 
        }
    }

  CategoryChange()
    {
      this.Documentfile = null;
      if(this._CategoryID == 1)
        {
          this.GetProjectReports();
        } 
      if(this._CategoryID == 2)
        {
          this.GetAlignmentSheets();
        }
      if(this._CategoryID == 3)
        {
          
        }
        this.ViewInit()
        this.Utility.LogText2("this.dtElements",this.dtElements)
        this._dtElements = this.dtElements
        // this.ngOnDestroy()
    }

 /**Get Survey Document DropDowns values*/
 GetSurveyDocumentDropDowns()
  {
    let url = this.urlService.GetSurveyDocumentDropDowns;
    this.httpService.get(url,null).subscribe(response => {
      this._SurveyDocDropDownsDataModel  = response;
      },error => {
        this.Utility.LogText(error);
      });
  }

GetProjectReports()
  {
    let url = this.urlService.GetProjectReports;
    this.httpService.get(url,null).subscribe(response => {
      this._ProjectReports  = response;
      this.rerenderDataTable(); 
      },error => {
        this.Utility.LogText(error);
      });
  }

  onChangeDocument(event)
    {
      this.Documentfile = event.target.files[0];
    }

  UploadProjectReport(fileInput)
    {
      let Doc : CommonDocDataModel;
      if(!this.Documentfile)
      {
        alert("Please select file!!");
        return;
      }
      if(!this._Projectdoc.Lookupid)
        {
          alert("Please select Form doc type !");
          return;
        }

      this._Projectdoc.RequestId = 0;
      this._Projectdoc.Document = this.Documentfile;
      this._Projectdoc.LookupGroupId = 0;
      this._Projectdoc.DocumentId = 0;
      this._Projectdoc.ToChainage= '';
      this._Projectdoc.FromChainage = '';
      Doc = this._Projectdoc;

      /**api call */
      this.CommonService.ShowSpinner();
      let url = this.urlService.AddProjectReportAPI; 
      this.httpService.Post(url, Doc.GetFormData()).subscribe(response => {
        let DocumentModelResp: CommonDocDataModel[] = response.Result;         
        this._ProjectReports = DocumentModelResp;
        this.Utility.LogText(DocumentModelResp);
        alert("Document updated sucessfully!!");
        this.rerenderDataTable(); 
      },error => {
        this.Utility.LogText(error);
      });
      this.CommonService.hideSpinnerLoading();
      this.FileUploadreset(fileInput);
    }

  DownloadDocument(arg)
    {
      let url = this.urlService.DownloadProjectReportAPI + arg.DocumentId;
      this.APIUtilityService.DownloadDocument(url);
    }

    
  DeleteProjectDocument(arg)
    {
      let APIurl = this.urlService.DeleteProjectReportAPI + arg.DocumentId;
      this.APIUtilityService.DeleteDocument(APIurl,this._ProjectReports,arg);
      this.rerenderDataTable();
    }


    FileUploadreset(element) 
      {
        element.value = "";
        this.Documentfile = null;  
      }


// ==========2. alignment sheet functions =======
GetAlignmentSheets()
  {
    let url = this.urlService.GetAlignmentSheetsAPI;
    this.httpService.get(url,null).subscribe(response => {
      this._AlignmentSheets  = response;
      this.rerenderDataTable();
      },error => {
        this.Utility.LogText(error);
      });
  }

UploadAlignmentSheet(fileInput)
  {
    let Doc : CommonDocDataModel;
    if(!this.Documentfile)
    {
      alert("Please select file!!");
      return;
    }
    if(!this._Aligntdoc.Lookupid)
      {
        alert("Please select Form doc type !");
        return;
      }

    this._Aligntdoc.RequestId = 0;
    this._Aligntdoc.Document = this.Documentfile;
    this._Aligntdoc.DocumentId = 0;
    Doc = this._Aligntdoc;

    /**api call */
    this.CommonService.ShowSpinner();
    let url = this.urlService.AddAlignmentSheetAPI; 
    this.httpService.Post(url, Doc.GetFormData()).subscribe(response => {
      let DocumentModelResp: CommonDocDataModel[] = response.Result;         
      this._AlignmentSheets = DocumentModelResp;
      this.rerenderDataTable();
      alert("Document updated sucessfully!!");
    },error => {
      this.Utility.LogText(error);
    });
    this.FileUploadreset(fileInput);
  }

  DownloadAlignDoc(arg)
    {
      let url = this.urlService.DownloadAlignmentSheetAPI + arg.DocumentId;
      this.APIUtilityService.DownloadDocument(url);
    }

  DeleteAlignmentDoc(arg)
    {
      let APIurl = this.urlService.DeleteAlignmentSheetAPI + arg.DocumentId;
      this.APIUtilityService.DeleteDocument(APIurl,this._AlignmentSheets,arg);
      this.rerenderDataTable();
    }


//=========== Award And Mutation ================
  GetAwardAndMutations()
    {
      let url = this.urlService.GetAwardAndMutationsAPI + this._SearchCriteria.VillageId;
      this.httpService.get(url,null).subscribe(response => {
        this._AwardMutations  = response;
        },error => {
          this.Utility.LogText(error);
        });
    }

  UploadAwardMutation(fileInput)
    {
      if(this._SearchCriteria.VillageId != null)
      {
        let Doc : CommonDocDataModel;
        if(!this.Documentfile)
        {
          alert("Please select file!!");
          return;
        }
        if(!this._Mutationdoc.Lookupid)
          {
            alert("Please select Form doc type !");
            return;
          }

        this._Mutationdoc.RequestId = Number(this._SearchCriteria.VillageId);
        this._Mutationdoc.Document = this.Documentfile;
        this._Mutationdoc.DocumentId = 0;
        this._Mutationdoc.ToChainage = '';
        this._Mutationdoc.FromChainage = '';
        Doc = this._Mutationdoc;

        /**api call */
        this.CommonService.ShowSpinner();
        let url = this.urlService.AddAwardAndMutationsAPI; 
        this.httpService.Post(url, Doc.GetFormData()).subscribe(response => {
          let DocumentModelResp: CommonDocDataModel[] = response.Result;         
          this._AwardMutations = DocumentModelResp;
          this.rerenderDataTable();
          alert("Document updated sucessfully!!");
        },error => {
          this.Utility.LogText(error);
        });
        this.FileUploadreset(fileInput)
      }
      else{
        alert("Please select Village!!")
      }
    }

  DownloadAwardDoc(arg)
    {
      let url = this.urlService.DownloadAwardAndMutationsAPI + arg.DocumentId;
      this.APIUtilityService.DownloadDocument(url);
    }

  DeleteAwardDoc(arg)
    {
      let APIurl = this.urlService.DeleteAwardAndMutationsAPI + arg.DocumentId;
      this.APIUtilityService.DeleteDocument(APIurl,this._AwardMutations,arg);
      this.rerenderDataTable();  
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
