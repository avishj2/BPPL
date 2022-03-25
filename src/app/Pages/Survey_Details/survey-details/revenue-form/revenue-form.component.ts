import { Component,AfterViewInit, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { SurveyDropDownsDataModel,RevenueRespDataModel,AllSurveyDetailsDataModel} from 'src/app/Model/Survey.model';
import {CommonDocDataModel,CommonDropdownModel}from 'src/app/Model/Base.model';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-revenue-form',
  templateUrl: './revenue-form.component.html',
  styleUrls: ['./revenue-form.component.css']
})

export class RevenueFormComponent implements AfterViewInit, OnInit {
  _AddNewDetails : boolean;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it ?";
  @Input() SurveyDropDownsData : SurveyDropDownsDataModel;
  @Input() AllSurveyDetails : AllSurveyDetailsDataModel;
  @Input() SurveyNumber : any;
  @Output() Output:EventEmitter<any>= new EventEmitter();
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  _Revenuedoc : CommonDocDataModel;
  Documentfile: File = null; 
  _AllSurveyDetails : AllSurveyDetailsDataModel;

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,) 
    { 
      this._Revenuedoc = new CommonDocDataModel();
      this._AllSurveyDetails = new AllSurveyDetailsDataModel()
    }

  ngOnInit(): void 
  {
    console.log("FromParentData=>",this.SurveyDropDownsData.RevenueFormTypes);
    this._AllSurveyDetails.Result.SurveyDocuments = this.AllSurveyDetails.Result.SurveyDocuments;
    this.rerenderDataTable();
  }

  
  onChangeDocument(event)
  {
    this.Documentfile = event.target.files[0];
  }

  FileUpload()
    {
      let Doc : CommonDocDataModel;
      if(!this.Documentfile)
      {
        alert("Please select file!!");
        return;
      }
      if(!this._Revenuedoc.Lookupid)
        {
          alert("Please select Form doc type !");
          return;
        }

      this._Revenuedoc.RequestId = Number(this.SurveyNumber);
      this._Revenuedoc.Document = this.Documentfile;
      this._Revenuedoc.DocumentId = 0;
      this._Revenuedoc.LookupGroupId = 0;
      Doc = this._Revenuedoc;

      /**api call */
      let url = this.urlService.AddSurveyDocumentAPI; 
      this.httpService.Post(url, Doc.GetFormData()).subscribe(response => {
        let DocumentModelResp: CommonDocDataModel[] = response.Result;         
        this._AllSurveyDetails.Result.SurveyDocuments = DocumentModelResp;
        this.Utility.LogText(DocumentModelResp);
        alert("Document updated sucessfully!!");
        this.rerenderDataTable();
        this.SetParentData();
      },error => {
        this.Utility.LogText(error);
      });
    }

  DownloadDocument(arg)
  {
    let url = this.urlService.DownloadRevDocAPI + arg.DocumentId;
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.setAttribute("target","_blank");
    link.href = url;
    link.download = "C:/Users/admin/Downloads/";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  SetParentData()
    {
      this.AllSurveyDetails.Result.SurveyDocuments = this._AllSurveyDetails.Result.SurveyDocuments
    }

  DeleteDocument(arg)
  {
    let url = this.urlService.DeleteCrossingDocumentAPI + arg.DocumentId;
      this.httpService.get(url,null).subscribe(response => {
      let index = this._AllSurveyDetails.Result.SurveyDocuments.indexOf(arg);
      this._AllSurveyDetails.Result.SurveyDocuments.splice(index,1);
      this.SetParentData();
      this.rerenderDataTable();
      alert("Revenue document deleted !");  
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

  ngAfterViewInit(): void 
  {
    this.dtTrigger.next();
  }

/**refresh/reload data table 
*when data update/delete/add in the datatable  
**/
rerenderDataTable()
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
}
