import { AfterViewInit, Component, OnDestroy, OnInit,Input,Output,ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
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
  selector: 'app-view-alignment-reports',
  templateUrl: './view-alignment-reports.component.html',
  styleUrls: ['./view-alignment-reports.component.css']
})
export class ViewAlignmentReportsComponent implements OnInit {
  /**data table properties  */
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  _AlignmentSheets : CommonReportsDataModel[];
  _SurveyDocDropDownsDataModel : SurveyDocDropDownsDataModel;

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,
    public APIUtilityService: APIUtilityService,) 
    { 
      this._AlignmentSheets = [];
      this._SurveyDocDropDownsDataModel = new SurveyDocDropDownsDataModel();
     
    }

  ngOnInit(): void 
  {
    this.dtOptions = 
        {
          pagingType: 'full_numbers',
          pageLength:10,
          destroy: true,
        };
    this.GetSurveyDocumentDropDowns();
    this.GetAlignmentSheets();
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

  GetAlignmentSheets()
    {
      let url = this.urlService.GetAlignmentSheetsAPI;
      this.httpService.get(url,null).subscribe(response => {
        this._AlignmentSheets  = response;
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

  DownloadDocument(arg)
    {
      let url = this.urlService.DownloadAlignmentSheetAPI + arg.DocumentId;
      this.APIUtilityService.DownloadDocument(url);
    }
}
