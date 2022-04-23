import { AfterViewInit,Component, OnInit, Input, Output,EventEmitter,ViewChild,SimpleChanges,OnChanges } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CommonDropdownModel} from 'src/app/Model/Base.model';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import {CrossingModel,CrossingsSummaryRespModel,CrossingSummaryReqModel } from 'src/app/Model/Crossing.model';
import { ChildViewCrossingComponent} from '../view-crossing-details/child-view-crossing/child-view-crossing.component';


@Component({
  selector: 'app-view-crossing-details',
  templateUrl: './view-crossing-details.component.html',
  styleUrls: ['./view-crossing-details.component.css']
})
export class ViewCrossingDetailsComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  _FilterControls :FilterControls;
  _SearchCriteria : SearchCriteria;
  _CrossingDataModel : CrossingModel;
  _ShowChildViewpage : boolean = false;
  @ViewChild(ChildViewCrossingComponent) child: ChildViewCrossingComponent;
  _CrossingSummaryReqModel : CrossingSummaryReqModel;
  _CrossingsModel :CrossingsSummaryRespModel;
  _ChildPageLoad : boolean = false;

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,) 
      { 
        this._FilterControls = new FilterControls();
        this._SearchCriteria = new SearchCriteria();
        this.SetFilterControls();
        this._CrossingDataModel = new CrossingModel();
        this._CrossingSummaryReqModel = new CrossingSummaryReqModel();
        this._CrossingsModel = new CrossingsSummaryRespModel();

      }
  /**hide/show filter menu based on the component requirement */
  SetFilterControls() 
    {
      this._FilterControls.ShowState = false;
      this._FilterControls.ShowDistrict = false;
      this._FilterControls.ShowTaluka = false;
      this._FilterControls.ShowChainageFrom = true;
      this._FilterControls.ShowChainageTo = true;
      this._FilterControls.ShowVillage = false;
      this._FilterControls.ShowCrossingTypes = true;
      this._FilterControls.ShowCrossingNumber = true;
      this._FilterControls.ShowSearchBtn = true;
    }

  ngOnInit(): void {
    this.dtOptions = 
      {
        pagingType: 'full_numbers',
        pageLength: 10,
      };    
  }
  ngAfterViewInit(): void 
    {
      this.dtTrigger.next();
    }

  /**refresh/reload data table 
   * when data update/delete/add in the datatable  
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

    /**get value from filter component */
  GetValuesFromFilters(event) 
    {      
      this.Utility.LogText(event);
      this._SearchCriteria = event;
      if(this._SearchCriteria.CrossingID != null)
        {
          this._ShowChildViewpage = true;          
          if(this._ChildPageLoad == true)
          {
            this.child.reRenderChild();
          }
        }
        if(this._SearchCriteria.CrossingType != null && this._SearchCriteria.CrossingID == null) 
        {
          this._ShowChildViewpage = false;
          this.IsDtInitialized = true;
          this.GetCrossingSummary();
        }
        if(Object.keys(this._SearchCriteria).length === 0) 
        {
          this._ShowChildViewpage = false;
          this.IsDtInitialized = true;
          this.GetCrossingSummary();
        }
    }

    /**once the child page has been loaded or not info */
    LoadInfo(event)
      {
        this._ChildPageLoad = event;
      }

    /**Getcrossing deatils  */
    GetCrossingSummary()
      {
        this.CommonService.ShowSpinnerLoading();
        let url = this.urlService.GetCrossingSummaryAPI;
        this._CrossingSummaryReqModel.CrossingType = Number(this._SearchCriteria.CrossingType);
        this._CrossingSummaryReqModel.StartChainage = this._SearchCriteria.ChainageFrom;
        this._CrossingSummaryReqModel.StartChainage = this._SearchCriteria.ChainageTo;
        this.httpService.HttpPostRequest(url,this._CrossingSummaryReqModel,this.CrossingSummaryCallBack.bind(this),null);
      }

    CrossingSummaryCallBack(dtas)
      {
        if(dtas!=null)
        {
          this._CrossingsModel = dtas;
        }
        this.ReloadDatatable();
      }
}
