import { Component, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import {SurveyDropDownsDataModel,AllSurveyDetailsDataModel} from 'src/app/Model/Survey.model';
import { CommonDropdownModel} from 'src/app/Model/Base.model';
import { GazzateDropDownsDataModel, GazetteModel,GazzetteDocuments} from 'src/app/Model/Gazette.model';
import { APIUtilityService } from 'src/app/services/APIUtility.service';

@Component({
  selector: 'app-gazette-notice-details',
  templateUrl: './gazette-notice-details.component.html',
  styleUrls: ['./gazette-notice-details.component.css']
})
export class GazetteNoticeDetailsComponent implements OnInit {
  /**data table properties  */
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  @Input() AllSurveyDetails : AllSurveyDetailsDataModel;
  @Input() SurveyNumber : any;
  @ViewChild('closebutton') closebutton;
  _DisabledInputField: boolean = false;
  _AddNewDetails : boolean;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it ?";
  _GazzateDropDownsDataModel : GazzateDropDownsDataModel;
  _GazetteModel : GazetteModel[];
  _GazzetteDocuments : GazzetteDocuments[];

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,
    public APIUtilityService: APIUtilityService,) 
    { 
      this._GazzateDropDownsDataModel =  new GazzateDropDownsDataModel();
      this._GazetteModel = [];
      this._GazzetteDocuments = [];
    }

  ngOnInit(): void 
    {
      this.GetGazzateDropDowns();
      this.Utility.LogText2("FromParentData=>",this.AllSurveyDetails.Result.Gazzates);
      this._GazetteModel = this.AllSurveyDetails.Result.Gazzates;
      this.ReloadDatatable();
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

    /**
     * Get type of gazette list
     */
    GetGazzateDropDowns()
      {
        let url = this.urlService.GetGazzateDropDownsAPI;
        this.httpService.get(url, null).subscribe(response => {
          this._GazzateDropDownsDataModel = response;
          this.Utility.LogText(this._GazzateDropDownsDataModel);
        }, error => {
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

    DownloadDocument(doc)
    {
      let url = this.urlService.DownloadGazzete + doc.DocumentId;
      this.APIUtilityService.DownloadDocument(url);
    }

  ViewDocuments(argdata)
    {
      this._GazzetteDocuments = argdata;
    }
}
