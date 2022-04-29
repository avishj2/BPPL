import { AfterViewInit,ElementRef,Component, OnInit, Input, Output,EventEmitter,ViewChild,SimpleChanges,OnChanges } from '@angular/core';
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
import {CrossingModel,CrossingsSummaryRespModel,CrossingSummaryReqModel,CrossingsValueTotalModel } from 'src/app/Model/Crossing.model';
import { ChildViewCrossingComponent} from '../view-crossing-details/child-view-crossing/child-view-crossing.component';
import printJS from 'print-js';

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
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
  _CrossingsDataTotal :CrossingsValueTotalModel;

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
        this._CrossingsDataTotal = new CrossingsValueTotalModel();  
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
        else{
          this._ShowChildViewpage = false;
          this.IsDtInitialized = true;
          this.GetCrossingSummary();
        }
    }

    ResetFilterValues(event)
      {
        
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
        this._CrossingSummaryReqModel.EndChainage = this._SearchCriteria.ChainageTo;
        this.httpService.HttpPostRequest(url,this._CrossingSummaryReqModel,this.CrossingSummaryCallBack.bind(this),null);
      }

    CrossingSummaryCallBack(dtas)
      {
        if(dtas!=null)
        {
          this._CrossingsModel = dtas;
          this._CrossingsDataTotal = new CrossingsValueTotalModel();
          this.TableColumnSum(this._CrossingsModel.Crossings);
        }
        this.ReloadDatatable();
      }
      
    printpdf()
      {
        if(this._ShowChildViewpage == false)
          {
            const Table = this.pdfTable.nativeElement;
            printJS({printable: Table, type:'html', gridStyle: 
            'border: 1px solid black; margin-bottom: -1px;',targetStyles: ['*'],documentTitle: ""}) 
          }
        else{
          alert("Show the Crossing table first!!")
        }            
      }

  TableColumnSum(data)
    {
      data.forEach(element => {
        element.RefundableAmount = Number(element.RefundableAmount)
        element.NonRefundableAmount = Number(element.NonRefundableAmount)
      });    
      for(let i=0;i<data.length;i++)
        { 
          this._CrossingsDataTotal.NoOfCrossingTotal+= data[i].NoOfCrossing
          this._CrossingsDataTotal.DemandNoteReceivedTotal += data[i].DemandNoteReceived
          this._CrossingsDataTotal.ProposalReceivedTotal+= data[i].ProposalReceived
          this._CrossingsDataTotal.PermissionReceivedTotal += data[i].PermissionReceived
          this._CrossingsDataTotal.RefundableAmountTotal += data[i].RefundableAmount
          this._CrossingsDataTotal.NonRefundableAmountTotal += data[i].NonRefundableAmount
        }
      this._CrossingsDataTotal.NoOfCrossingTotal = Number(this._CrossingsDataTotal.NoOfCrossingTotal.toFixed(2));
      this._CrossingsDataTotal.DemandNoteReceivedTotal = Number(this._CrossingsDataTotal.DemandNoteReceivedTotal.toFixed(2));
      this._CrossingsDataTotal.ProposalReceivedTotal = Number(this._CrossingsDataTotal.ProposalReceivedTotal.toFixed(2));
      this._CrossingsDataTotal.PermissionReceivedTotal = Number(this._CrossingsDataTotal.PermissionReceivedTotal.toFixed(2));
      this._CrossingsDataTotal.RefundableAmountTotal = Number(this._CrossingsDataTotal.RefundableAmountTotal.toFixed(2));
      this._CrossingsDataTotal.NonRefundableAmountTotal = Number(this._CrossingsDataTotal.NonRefundableAmountTotal.toFixed(2));
      console.log(this._CrossingsDataTotal)
    }
}
