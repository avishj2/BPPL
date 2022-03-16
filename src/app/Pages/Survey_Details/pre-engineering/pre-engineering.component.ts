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
import {SurveyDocDropDownsDataModel,ProjectReportsDataModel } from 'src/app/Model/SurveyDocument.model';
import {BaseResponse, CommonDropdownModel,CommonDocDataModel} from 'src/app/Model/Base.model';

@Component({
  selector: 'app-pre-engineering',
  templateUrl: './pre-engineering.component.html',
  styleUrls: ['./pre-engineering.component.css']
})

export class PreEngineeringComponent implements AfterViewInit, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: any = {};
  datatable: any;
  _FilterControls: FilterControls;
  _SearchCriteria: SearchCriteria;
  _SurveyDocDropDownsDataModel : SurveyDocDropDownsDataModel;
  _ProjectReports : ProjectReportsDataModel[];
  Documentfile: File = null; 
  _Projectdoc : CommonDocDataModel;


  //test
  _ShowUploadedDocModel : ShowUploadedDocModel;
  _CategoryDataModel :CategoryDataModel;
  _CategoryID : any;
  _AddDocuments : AddDocuments;
  _IsGazette : boolean; //
  _StateValue : any;
  _TalukaName : string;

  constructor(
    public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,)
    {
      this._ShowUploadedDocModel = new ShowUploadedDocModel();
      this._CategoryDataModel = new CategoryDataModel()
      this._AddDocuments = new AddDocuments();

      this._SearchCriteria = new SearchCriteria();
      this._FilterControls = new FilterControls();
      this.SetFilterControls();
      this._SurveyDocDropDownsDataModel = new SurveyDocDropDownsDataModel();
      this._ProjectReports = [];
      this._Projectdoc = new CommonDocDataModel();
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
    }

  ngOnInit(): void {
    this._CategoryDataModel.ReadFromString()
    this._AddDocuments.ReadJson();
    this.dtOptions = 
      {
        pagingType: 'full_numbers',
        pageLength: 10,//onpage load loaded 5 rows, datatable bydefault shows 10 rows
      };
    this.GetSurveyDocumentDropDowns();
  }

  CategoryChange()
    {
      this.Documentfile = null;
      if(this._CategoryID == 1)
      {
        this.GetProjectReports();
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
      this._Projectdoc.FromChainage= '';
      Doc = this._Projectdoc;

      /**api call */
      this.CommonService.ShowSpinner();
      let url = this.urlService.AddProjectReportAPI; 
      this.httpService.Post(url, Doc.GetFormData()).subscribe(response => {
        let DocumentModelResp: CommonDocDataModel[] = response.Result;         
        this._ProjectReports = DocumentModelResp;
        this.Utility.LogText(DocumentModelResp);
        alert("Document updated sucessfully!!");
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
      let url = this.urlService.DeleteCrossingDocumentAPI + arg.DocumentId;
        this.httpService.get(url,null).subscribe(response => {
        let index = this._ProjectReports.indexOf(arg);
        this._ProjectReports.splice(index,1);
        alert("document deleted Sucessfully!");  
        }, 
        error => {
          this.Utility.LogText(error);
        });
      }

  ngAfterViewInit(): void 
  {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void 
  {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
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
  GetValuesFromFilters(event) 
    {
      this.Utility.LogText2("Pre-eng",event);
    }

  /**After add chainage details refresh datatable  */
  rerenderDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  /**In Input Box add only numbric values */
  NumberOnly(event): boolean 
  {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  StateChange(event){
    if(this._StateValue =="1"){
      this._TalukaName = "Tahsil"
    }else{
      this._TalukaName = "Taluka"
    }
  }
  
  openDocument(){
    let url = "http://www.africau.edu/images/default/sample.pdf";
    window.open(url);
  }

  /**
  * if category is Award and mutation and attachment upload to the server   
  */
  UploadData(){
    this.rerenderDataTable()
  }
}
