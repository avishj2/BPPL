import { AfterViewInit, Component, OnDestroy, OnInit,Input,Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ShowUploadedDocModel ,CategoryDataModel,AddDocuments} from '../Survey_Details.model';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import {SurveyDocDropDownsDataModel,CommonReportsDataModel } from 'src/app/Model/SurveyDocument.model';
import {BaseResponse, CommonDropdownModel,CommonDocDataModel} from 'src/app/Model/Base.model';

@Component({
  selector: 'app-pre-engineering',
  templateUrl: './pre-engineering.component.html',
  styleUrls: ['./pre-engineering.component.css']
})

export class PreEngineeringComponent implements AfterViewInit, OnInit {
  /**data table properties  */
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;

  //====alignement ====
  dtOptions2: DataTables.Settings = {};
  dtTrigger2: Subject<any> = new Subject();

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

  constructor(
    public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,)
    {
      this._CategoryDataModel = new CategoryDataModel()
      this._SearchCriteria = new SearchCriteria();
      this._FilterControls = new FilterControls();
      this.SetFilterControls();
      this._SurveyDocDropDownsDataModel = new SurveyDocDropDownsDataModel();
      this._ProjectReports = [];
      this.  _AlignmentSheets = [];
      this. _AwardMutations = [];
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
      this._FilterControls.ShowSearchBtn = false;
    }

  ngOnInit(): void {
    this._CategoryDataModel.ReadFromString();
    this.dtOptions = 
      {
        pagingType: 'full_numbers',
        pageLength: 10,//onpage load loaded 5 rows, datatable bydefault shows 10 rows
      };
    this.GetSurveyDocumentDropDowns();
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
    }

 /**Get Survey Document DropDowns values*/
 GetSurveyDocumentDropDowns()
  {
    //this.CommonService.ShowSpinner();
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

  UploadProjectReport()
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
    }

  DownloadDocument(arg)
    {
      let url = this.urlService.DownloadProjectReportAPI + arg.DocumentId;
      let link = document.createElement('a');
      link.setAttribute('type', 'hidden');
      link.setAttribute("target","_blank");
      link.href = url;
      link.download = "C:/Users/admin/Downloads/";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

    
  DeleteProjectDocument(arg)
    {
      let url = this.urlService.DeleteProjectReportAPI + arg.DocumentId;
      this.httpService.get(url,null).subscribe(response => {
      let index = this._ProjectReports.indexOf(arg);
      this._ProjectReports.splice(index,1);
      alert("document deleted Sucessfully!");  
      this.rerenderDataTable();
      }, 
      error => {
        this.Utility.LogText(error);
      });
    }

  ngAfterViewInit(): void 
    {
      this.dtTrigger.next();
      this.dtTrigger2.next();
    }

// ========== alignment sheet functions =======
GetAlignmentSheets()
  {
    let url = this.urlService.GetAlignmentSheetsAPI;
    this.httpService.get(url,null).subscribe(response => {
      this.  _AlignmentSheets  = response;
      this.rerenderDataTable2();
      },error => {
        this.Utility.LogText(error);
      });
  }

UploadAlignmentSheet()
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
      this.  _AlignmentSheets = DocumentModelResp;
      this.rerenderDataTable2();
      alert("Document updated sucessfully!!");
    },error => {
      this.Utility.LogText(error);
    });
  }

  DownloadAlignDoc(arg)
    {
      let url = this.urlService.DownloadAlignmentSheetAPI + arg.DocumentId;
      let link = document.createElement('a');
      link.setAttribute('type', 'hidden');
      link.setAttribute("target","_blank");
      link.href = url;
      link.download = "C:/Users/admin/Downloads/";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

  DeleteAlignmentDoc(arg)
    {
      let url = this.urlService.DeleteAlignmentSheetAPI + arg.DocumentId;
        this.httpService.get(url,null).subscribe(response => {
        let index = this._ProjectReports.indexOf(arg);
        this._ProjectReports.splice(index,1);
        alert("document deleted Sucessfully!");  
        this.rerenderDataTable2();
        }, 
        error => {
          this.Utility.LogText(error);
        });
    }


//=========== Award And Mutation ================
  GetAwardAndMutations()
    {
      let url = this.urlService.GetAwardAndMutationsAPI + this._SearchCriteria.VillageId;
      this.httpService.get(url,null).subscribe(response => {
        this. _AwardMutations  = response;
        this.rerenderDataTable();
        },error => {
          this.Utility.LogText(error);
        });
    }

  UploadAwardMutation()
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
        this. _AwardMutations = DocumentModelResp;
        this.rerenderDataTable();
        alert("Document updated sucessfully!!");
      },error => {
        this.Utility.LogText(error);
      });
    }

  DownloadAwardDoc(arg)
    {
      let url = this.urlService.DownloadAwardAndMutationsAPI + arg.DocumentId;
      let link = document.createElement('a');
      link.setAttribute('type', 'hidden');
      link.setAttribute("target","_blank");
      link.href = url;
      link.download = "C:/Users/admin/Downloads/";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

  DeleteAwardDoc(arg)
    {
      let url = this.urlService.DeleteAwardAndMutationsAPI + arg.DocumentId;
      this.httpService.get(url,null).subscribe(response => {
      let index = this._ProjectReports.indexOf(arg);
      this._ProjectReports.splice(index,1);
      alert("document deleted Sucessfully!");
      this.rerenderDataTable();  
      }, 
      error => {
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

/**refresh/reload data table 
 * when data update/delete/add in the datatable  
 * */
  rerenderDataTable(){
    /**initialized datatable */
  if (this.IsDtInitialized) 
    {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => 
      {
        dtInstance.destroy();//Destroy the table first
        this.dtTrigger.next();//Call the dtTrigger to rerender again
        this.dtTrigger2.next();
      });
    }
    else
      {
        this.IsDtInitialized = true;
        this.dtTrigger.next();
        this.dtTrigger2.next();
      }
  }
  

rerenderDataTable2(){
  if (this.IsDtInitialized) 
    {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => 
      {
        dtInstance.destroy();//Destroy the table first
        this.dtTrigger2.next();
      });
    }
    else
      {
        this.IsDtInitialized = true;
        this.dtTrigger2.next();
      }
  }
}
