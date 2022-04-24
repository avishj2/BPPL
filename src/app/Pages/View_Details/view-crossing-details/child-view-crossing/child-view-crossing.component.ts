import { Component, AfterViewInit, OnInit ,Input, Output,EventEmitter,ViewChild,OnChanges,SimpleChanges,ChangeDetectorRef} from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders} from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CommonDropdownModel,CommonDocDataModel} from 'src/app/Model/Base.model';
import { SearchCriteria, FilterControls,CrossingDropdownDataModel } from 'src/app/Model/Filters.model';
import {CrossingModel } from 'src/app/Model/Crossing.model';
import { APIUtilityService } from 'src/app/services/APIUtility.service';

@Component({
  selector: 'app-child-view-crossing',
  templateUrl: './child-view-crossing.component.html',
  styleUrls: ['./child-view-crossing.component.css']
})
export class ChildViewCrossingComponent implements OnInit,OnChanges {
  @Input() filterdata :SearchCriteria;
  _CrossingDataModel : CrossingModel;
  _CrossingDropdowns :CrossingDropdownDataModel;
  _Crossingdoc : CommonDocDataModel;
  /**data table properties  */
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  _FirstLoad : boolean = false;
  @Output() ChildLoadInfo:EventEmitter<boolean>= new EventEmitter(); 
  _CrossingTypeName : string;

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,
    private cd: ChangeDetectorRef,
    public APIUtilityService: APIUtilityService,) 
      {
        this._CrossingDataModel = new CrossingModel();
        this._CrossingDropdowns = new CrossingDropdownDataModel();
        this._Crossingdoc = new CommonDocDataModel();
      }

  ngOnInit(): void 
    {
      this.PopulateCrossingDropdowns();  
    }

  ngOnChanges(changes: SimpleChanges)
    {
      this.Utility.LogText2("2nd child",this.filterdata);
      this._CrossingTypeName = this.filterdata.CrossingTypeName
      this.GetCrossingDetails();
      this.ChildLoadInfo.emit(true); 
    }

    public reRenderChild() 
      {
        this.cd.detectChanges();
        this.Utility.LogText2("again call",this.filterdata);
        this._CrossingTypeName = this.filterdata.CrossingTypeName
        this.GetCrossingDetails();
        this.ReloadDatatable();
      }

    GetCrossingDetails()
      {
        if(this.filterdata.CrossingID !=null)
          {
            this._CrossingDataModel = new CrossingModel();
            this._CrossingDataModel.Documents = [];
            this.GetCrossingDatabyId();
          }
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
  /** get Crossing Dropdown values*/
  PopulateCrossingDropdowns()
    {
      let url = this.urlService.GetCrossingDropDownsAPI;
      this.httpService.get(url,null).subscribe(response => {
        this._CrossingDropdowns = response;
        this.ReloadDatatable();
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
      let url = this.urlService.GetCrossingByIdAPI + this.filterdata.CrossingID;
      this.httpService.get(url, null).subscribe(response => {
        this._CrossingDataModel = response;
        this.ReloadDatatable();
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

  DownlaodCrossingDocument(doc : CommonDocDataModel)
    {
      let url = this.urlService.DownloadCrossingDocAPI + doc.DocumentId;
      this.APIUtilityService.DownloadDocument(url);
    }
}
