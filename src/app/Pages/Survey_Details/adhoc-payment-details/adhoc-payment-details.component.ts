import { Component,AfterViewInit, OnInit, Input,OnChanges, Output,EventEmitter,ViewChild,ChangeDetectorRef, QueryList } from '@angular/core';
import { SearchCriteria, FilterControls} from 'src/app/Model/Filters.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UtilityService } from 'src/app/services/utility.service';
import { Router,ActivatedRoute } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { HttpService } from '../../../services/http.service';
import { CommonDropdownModel,CommonDocDataModel} from 'src/app/Model/Base.model';
import {AdHocPaymentDropDownsModel ,AdHocPaymentModel, AdHocPaymentRespDataModel} from 'src/app/Model/Adhoc.model';
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
  @ViewChild(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;
  dtOptions: DataTables.Settings[] = [];
  dtTrigger: Subject<any> = new Subject();

  // child Dt
  dtTrigger_c: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized_c: boolean = false;

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
  _ShowParent : boolean = true;
  // Child component
  DisableInputField : boolean = false;
  _AddNewPaymentDetails : boolean = false;
  _AdHocPaymentModel : AdHocPaymentModel;
  _Paymentdoc : CommonDocDataModel ;
  Paymentfile: File = null; // Variable to store file

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
      this._AdHocPaymentModel = new AdHocPaymentModel();
      this._Paymentdoc = new CommonDocDataModel();

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
      this.dtOptions[1] = 
        {
          pagingType: 'full_numbers',
          pageLength: 10,
          language: {emptyTable : "No Details!!"}
        };
      this.GetAdHocPaymentDropDowns();

      this.dtOptions[2] = 
      {
        pagingType: 'full_numbers',
        pageLength: 5,
        language: {emptyTable : "No Documents!!"}
      };
    }

  ngAfterViewInit(): void 
    {
      this.dtTrigger.next();
      this.dtTrigger_c.next();
    }    

  /**refresh/reload data table 
  *when data update/delete/add in the datatable  
  **/
  ReloadDatatable()
    {
      try
      {
        /**initialized datatable */
        this.dtElements.forEach((dtElement: DataTableDirective,index: number) => {
          if(dtElement.dtInstance)
            // dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtElement.dtInstance.then((dtInstance: any) => {
              dtInstance.destroy(); 
              this.Utility.LogText(`The DataTable ${index} instance ID is: ${dtInstance.table().node().id}`);         
          });
        });
        this.dtTrigger.next(); 
        this.dtTrigger_c.next();  
      }
      catch(e)
      {
         //console.log(e);
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
          //this._ShowPaymentDetailsDiv = false;  
          this._ShowParent = false;
          this.GetDataFromParent();
        }
    }
    /**
    * 
   */
    ViewPaymentDetails(argdata)
      {
        this.CommonDtoService._SearchCriteriaDTO = this._SearchCriteria;
        this.CommonDtoService._AdHocPaymentDataDTO = argdata;
        this._ShowParent = false;
        this.GetDataFromParent();
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

    // Child methods

    GetDataFromParent()
      {
        /**add new payment details */
        if (!(this.CommonDtoService._AdHocPaymentDataDTO&&this.CommonDtoService._AdHocPaymentDataDTO.AdHocPaymentId))
          {
            this._AdHocPaymentModel = new AdHocPaymentModel();
            this._AddNewPaymentDetails = true;
            this.DisableInputField = false;
          } 
        /**edit/delete doc */
        if ((this.CommonDtoService._AdHocPaymentDataDTO.AdHocPaymentId !=null))  
          {
            this._AdHocPaymentModel = this.CommonDtoService._AdHocPaymentDataDTO;
            this.DisableInputField = true;
            this._AddNewPaymentDetails = false;
          }
      }

      EditPaymentDetails()
      {
        this._AddNewPaymentDetails = false;
        this.DisableInputField = false;
      }

   

    SavePaymentDetails()
    {
      this.CommonService.ShowSpinnerLoading();
      this._AdHocPaymentModel.SurveyId = this._SearchCriteria.SurveyID;
      this._AdHocPaymentModel.SurveyOwnerId = this._SearchCriteria.OwnerID;
      let url = this.urlService.AddOrUpdateAdHocPaymentAPI;     
      this.httpService.HttpPostRequest(url,this._AdHocPaymentModel,this.AddOrUpdatePaymentCallBack.bind(this),null);
    }

    AddOrUpdatePaymentCallBack(dtas)
    {
      if (dtas != null)
        {
          let RespDataModel : AdHocPaymentRespDataModel = dtas;
          if (RespDataModel.StatusCode != 200) 
            {
              alert(RespDataModel.Message);
            }
          if (this._AddNewPaymentDetails == false)
            {
              alert("Payment updated sucessfully!!");
              this.DisableInputField = true;
            }
          else
            {
              alert("Payment added sucessfully!!");
              this.DisableInputField = true;
              this._AdHocPaymentModel.AdHocPaymentId  = RespDataModel.Result.AdHocPaymentId;
              this._AddNewPaymentDetails = false;
            }   
        }
        this._AddNewPaymentDetails = false;
        this.ReloadDatatable();  
    }

    DeletePaymentDetails_c()
      {
        let url = this.urlService.DeleteAdHocPaymentAPI + this._AdHocPaymentModel.AdHocPaymentId + '&surveyOwnerId='+ this._AdHocPaymentModel.SurveyOwnerId;
        this.httpService.get(url,null).subscribe(response => {
          let PaymentDetails : any = response;
          if (PaymentDetails.StatusCode != 200) 
            {
              alert(PaymentDetails.Message);
            }
            else {
              alert("Payment deleted successfully!");
              this.GoBackToPaymentList();

            }
          },error => {
            this.Utility.LogText(error);
          });
      }

      onChangeDocument(event)
      {
        this.Paymentfile = event.target.files[0];
      }

      FileUpload(fileInput)
    {
      let Doc : CommonDocDataModel;
      if(!this.Paymentfile)
      {
        alert("Please select file!!");
        return;
      }
      if(!this._Paymentdoc.Lookupid)
        {
          alert("Please select crossing doc type !");
          return;
        }

      this._Paymentdoc.RequestId = Number(this._AdHocPaymentModel.AdHocPaymentId);
      this._Paymentdoc.Document = this.Paymentfile;
      this._Paymentdoc.DocumentId = 0;
      this._Paymentdoc.ToChainage = '';
      this._Paymentdoc.FromChainage = '';
      this._Paymentdoc.Description = '';
      Doc = this._Paymentdoc;

      /**api call */
      let url = this.urlService.AddAdHocPaymentDocumentAPI; 
      this.httpService.Post(url, Doc.GetFormData()).subscribe(response => {
        let DocumentModelResp: CommonDocDataModel[] = response.Result;        
        this._AdHocPaymentModel.Documents = DocumentModelResp;
        this.ReloadDatatable();
        this.Utility.LogText(DocumentModelResp);
        alert("Document updated sucessfully!!");
      });
      this.FileUploadreset(fileInput)// file object clear
    }

    FileUploadreset(element) 
    {
      element.value = "";
      this.Paymentfile = null;
    }

    DownlaodDocument(doc)
    {
      let url = this.urlService.DownloadPaymentAPI + doc.DocumentId;
      this.APIUtilityService.DownloadDocument(url);
    }

  DeleteDocument(doc)
    {
      let APIurl = this.urlService.DeleteAdHocPaymentDocumentAPI + doc.DocumentId;
      this.APIUtilityService.DeleteDocument(APIurl,this._AdHocPaymentModel.Documents,doc)
      .subscribe(response => {
        this.ReloadDatatable();
      });
    } 

    GoBackToPaymentList()
    {
      this._ShowParent = true;
    }
}
