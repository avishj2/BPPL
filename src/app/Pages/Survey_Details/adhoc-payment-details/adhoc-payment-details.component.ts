import { Component,AfterViewInit, OnInit, Input,OnChanges, Output,EventEmitter,ViewChild,ViewChildren } from '@angular/core';
import { SearchCriteria, FilterControls} from 'src/app/Model/Filters.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { HttpService } from '../../../services/http.service';
import { CommonDropdownModel, CommonDocDataModel} from 'src/app/Model/Base.model';
import {AdHocPaymentDropDownsModel ,AdHocPaymentModel, AdHocPaymentRespDataModel} from 'src/app/Model/Adhoc.model';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { APIUtilityService } from 'src/app/services/APIUtility.service';

@Component({
  selector: 'app-adhoc-payment-details',
  templateUrl: './adhoc-payment-details.component.html',
  styleUrls: ['./adhoc-payment-details.component.css']
})

export class AdhocPaymentDetailsComponent implements OnInit {
  DisableInputField : boolean = true;
  _ShowPaymentDetailsDiv: boolean = false;
  _FilterControls : FilterControls;
  _SearchCriteria : SearchCriteria;
  _AddNewPaymentDetails : boolean = false;

   /**data table properties  */
   @ViewChild(DataTableDirective, {static: false})
   //@ViewChildren(DataTableDirective, {static: false})
   dtElement: DataTableDirective;
   dtOptions: DataTables.Settings = {};
   dtTrigger: Subject<any> = new Subject();
   /**REFERSH DATATABLE  */
   IsDtInitialized: boolean = false;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it ?";
  _AdHocPaymentDropDownsModel : AdHocPaymentDropDownsModel;
  _AdHocPaymentModel : AdHocPaymentModel;
  _Paymentdoc : CommonDocDataModel ;
  Paymentfile: File = null; // Variable to store file

  constructor(
    public urlService: UrlService,
    private router: Router,
    private httpService: HttpService,
    public Utility :UtilityService,
    public APIUtilityService: APIUtilityService,
  ) {
      this._FilterControls = new FilterControls();
      this.SetFilterControls();
      this._AdHocPaymentDropDownsModel = new AdHocPaymentDropDownsModel();
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

  ngOnInit(): void {
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
      if(this._SearchCriteria.SurveyID != null)
        {
          this._ShowPaymentDetailsDiv = true;
          this._AddNewPaymentDetails= false;
          this.DisableInputField = true;
          this.GetAllAdHocPayments();
        }
      else{
        alert("Please select Survey Number");
      }
    }

  GetAdHocPaymentDropDowns()
    {
      let url = this.urlService.GetAdHocPaymentDropDownsAPI;
      this.httpService.get(url,null).subscribe(response => {
        this._AdHocPaymentDropDownsModel = response;
        },error => {
          console.log("GetAdHocPaymentDropDownsAPI error",error);
        });
    }


    GetAllAdHocPayments()
    {
      let url = this.urlService.GetAllAdHocPaymentsAPI + this._SearchCriteria.OwnerID;
      // this.httpService.get(url,null).subscribe(response => {
      //   this._AdHocPaymentModel = response;
      //   this.ReloadDatatable();
      //   },error => {
      //     console.log("GetAllAdHocPaymentsAPI error",error);
      //   });
      this.httpService.HttpGetRequest(url,this.GetAllAdHocPaymentsCallBack.bind(this),null); 
    }
    
    GetAllAdHocPaymentsCallBack(dtas){
      if (dtas != null)
        {
          this._AdHocPaymentModel = dtas;
        }
      else{
        // this._AdHocPaymentModel = new AdHocPaymentModel();
        // this._AdHocPaymentModel.Documents = [];
        }
      this.ReloadDatatable();
    }

    /**
     * 
     */
  AddNewPaymentDetails()
    {
      if(!this._SearchCriteria.hasOwnProperty('OwnerID'))
      {
        alert("Please select Owner name!!");
      }else
      {
        this.DisableInputField = false;
        this._AdHocPaymentModel = new AdHocPaymentModel();
        this._AddNewPaymentDetails = true;
        this._ShowPaymentDetailsDiv = false;
      }
      
    }
    /**
    * 
   */
  EditPaymentDetails()
    {
      this.DisableInputField = false;
      this._AddNewPaymentDetails = false;
    }


  SavePaymentDetails()
    {
      this._AdHocPaymentModel.SurveyId = this._SearchCriteria.SurveyID;
      this._AdHocPaymentModel.SurveyOwnerId = this._SearchCriteria.OwnerID;
      let url = this.urlService.AddOrUpdateAdHocPaymentAPI;     
      this.httpService.HttpPostRequest(url,this._AdHocPaymentModel,this.AddOrUpdatePaymentCallBack.bind(this),null);
    }

    /**
  * @param dtas 
  */
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
          this.ReloadDatatable();    
      }
      this._AddNewPaymentDetails = false;
      this._ShowPaymentDetailsDiv = true;
  }

  DeletePaymentDetails()
    {
      let url = this.urlService.DeleteAdHocPaymentAPI + this._AdHocPaymentModel.AdHocPaymentId + '&surveyOwnerId='+ this._SearchCriteria.OwnerID;
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
    }

  onChangeDocument(event)
    {
      this.Paymentfile = event.target.files[0];
    }

  FileUpload(isDoc : boolean)
    {
      let Doc : CommonDocDataModel;
      if(!this.Paymentfile && isDoc)
      {
        alert("Please select file!!");
        return;
      }
      if(!this._Paymentdoc.Lookupid && isDoc)
        {
          alert("Please select crossing doc type !");
          return;
        }

      this._Paymentdoc.RequestId = Number(this._SearchCriteria.OwnerID);
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
        if(isDoc)
        {       
          this._AdHocPaymentModel.Documents = DocumentModelResp;
        }
        this.Utility.LogText(DocumentModelResp);
        alert("Document updated sucessfully!!");
      },error => {
        this.Utility.LogText(error);
      });
    }

  DownlaodDocument(doc)
    {
      let url = this.urlService.DownloadPaymentAPI + doc.DocumentId;
      let link = document.createElement('a');
      link.setAttribute('type', 'hidden');
      link.setAttribute("target","_blank");
      link.href = url;
      link.download = "C:/Users/admin/Downloads/";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

  DeleteDocument(doc)
    {
      let APIurl = this.urlService.DeleteAdHocPaymentDocumentAPI + doc.DocumentId;
      let AllDocData =this._AdHocPaymentModel.Documents;
      this.APIUtilityService.DeleteDocument(APIurl,AllDocData,doc);
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
}
