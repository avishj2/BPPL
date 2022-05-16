import { Component,AfterViewInit, OnInit, Input,OnChanges, Output,EventEmitter,ViewChild,ChangeDetectorRef } from '@angular/core';
import { SearchCriteria, FilterControls} from 'src/app/Model/Filters.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UtilityService } from 'src/app/services/utility.service';
import { Router,ActivatedRoute } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { HttpService } from '../../../services/http.service';
import { CommonDropdownModel} from 'src/app/Model/Base.model';
import {AdHocPaymentDropDownsModel ,AdHocPaymentModel} from 'src/app/Model/Adhoc.model';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { APIUtilityService } from 'src/app/services/APIUtility.service';
import { CommonService} from 'src/app/services/common.service';
import {CommonDtoService} from 'src/app/services/common.dto.service';

@Component({
  selector: 'app-adhoc-payment-details',
  templateUrl: './adhoc-payment-details.component.html',
  styleUrls: ['./adhoc-payment-details.component.css']
})

export class AdhocPaymentDetailsComponent implements OnInit {
   /**data table properties  */
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it?";
  _AdHocPaymentDropDownsModel : AdHocPaymentDropDownsModel;
  _AdHocPaymentDetails : AdHocPaymentModel[];
  _ShowPaymentDetailsDiv: boolean = false;
  _FilterControls : FilterControls;
  _SearchCriteria : SearchCriteria;
  
  constructor(
    public urlService: UrlService,
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpService,
    public Utility :UtilityService,
    public APIUtilityService: APIUtilityService,
    public CommonService : CommonService,
    private cd: ChangeDetectorRef,
    public CommonDtoService : CommonDtoService,    
  ) {
      this._FilterControls = new FilterControls();
      this._SearchCriteria = new SearchCriteria();
      this.SetFilterControls();
      this._AdHocPaymentDropDownsModel = new AdHocPaymentDropDownsModel();
      this._AdHocPaymentDetails = [];

    }

  /**hide/show filter menu based on the component requirement */
  SetFilterControls()
    {
      this._FilterControls.ShowState = true;
      this._FilterControls.ShowDistrict = true;
      this._FilterControls.ShowTaluka = true;
      this._FilterControls.ShowVillage = true;
      this._FilterControls.ShowSurneyNos = true;
      this._FilterControls.ShowSearchBtn = true;
      this._FilterControls.ShowOwnerName = true;
    }

  ngOnInit(): void 
    {
      this.dtOptions = 
        {
          pagingType: 'full_numbers',
          pageLength: 10,
          language: {emptyTable : "No Details!!"}
        };
      this.GetAdHocPaymentDropDowns();
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

  /**1. Get Values From Filters component and assign into SearchCriteria
  *  2. 
  */
  GetValuesFromFilters(event)
    {
      //this.Utility.LogText(event);
      this._SearchCriteria = event;
      if(this._SearchCriteria.OwnerID != null)
        {
          this.GetAllAdHocPayments();
        }
      else{
        alert("Please select Owner Name");
      }
    }

  GetAdHocPaymentDropDowns()
    {
      let url = this.urlService.GetAdHocPaymentDropDownsAPI;
      this.httpService.get(url,null).subscribe(response => {
        this._AdHocPaymentDropDownsModel = response;
        },error => {
          this.Utility.LogText2("GetAdHocPaymentDropDownsAPI error",error);
        });
    }
    
    GetAllAdHocPayments()
      {
        this.CommonService.ShowSpinnerLoading();
        let url = this.urlService.GetAllAdHocPaymentsAPI + this._SearchCriteria.OwnerID;
        this.httpService.HttpGetRequest(url,this.GetAllAdHocPaymentsCallBack.bind(this),null); 
      }

    /** @abstract
     * 
     */
    GetAllAdHocPaymentsCallBack(dtas){
      if (dtas != null)
        {
          this._AdHocPaymentDetails = dtas;
          this._ShowPaymentDetailsDiv = true;
        }
        this.ReloadDatatable();
    }

    /**
     * 
     */
  AddNewPaymentDetails()
    {
      if (!(this._SearchCriteria && this._SearchCriteria.OwnerID)) 
      {
        alert("Please Select Survey Owner !");
        return;
      }
      else
        {
          this.CommonDtoService._SearchCriteriaDTO = this._SearchCriteria;
          this.CommonDtoService._AdHocPaymentDataDTO = new AdHocPaymentModel();
          this._ShowPaymentDetailsDiv = false;  
        }
    }
    /**
    * 
   */
    ViewPaymentDetails(argdata)
      {
        this.CommonDtoService._SearchCriteriaDTO = this._SearchCriteria;
        this.CommonDtoService._AdHocPaymentDataDTO = argdata;
      }

  DeletePaymentDetails(argdata)
    {
      let url = this.urlService.DeleteAdHocPaymentAPI + argdata.AdHocPaymentId + '&surveyOwnerId='+ argdata.SurveyOwnerId;
      this.httpService.get(url,null).subscribe(response => {
        let PaymentDetails : any = response;
        if (PaymentDetails.StatusCode != 200) 
          {
            alert(PaymentDetails.Message);
          }
          else {
            alert("Payment deleted successfully !");
            this.GetAllAdHocPayments();
          }
        },error => {
          this.Utility.LogText(error);
        });
        this.ReloadDatatable();  
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

    ResetFilterValues(event)
    {
      
    }
}
