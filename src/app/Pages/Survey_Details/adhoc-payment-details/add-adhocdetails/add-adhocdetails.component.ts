import { Component,AfterViewInit, OnInit, Input,OnChanges, Output,EventEmitter,ViewChild,ViewChildren,ChangeDetectorRef } from '@angular/core';
import { SearchCriteria} from 'src/app/Model/Filters.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UtilityService } from 'src/app/services/utility.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { HttpService } from 'src/app/services/http.service';
import { CommonDropdownModel, CommonDocDataModel} from 'src/app/Model/Base.model';
import {AdHocPaymentDropDownsModel ,AdHocPaymentModel, AdHocPaymentRespDataModel} from 'src/app/Model/Adhoc.model';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { APIUtilityService } from 'src/app/services/APIUtility.service';
import { CommonService} from 'src/app/services/common.service';
import {CommonDtoService} from 'src/app/services/common.dto.service';

@Component({
  selector: 'app-add-adhocdetails',
  templateUrl: './add-adhocdetails.component.html',
  styleUrls: ['./add-adhocdetails.component.css']
})
export class AddAdhocdetailsComponent implements OnInit {
  DisableInputField : boolean = false;
  _ShowPaymentDetailsDiv: boolean = false;
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
  popoverMessage = "Are you sure you want to delete it?";
  _AdHocPaymentDropDownsModel : AdHocPaymentDropDownsModel;
  _AdHocPaymentModel : AdHocPaymentModel;
  _Paymentdoc : CommonDocDataModel ;
  Paymentfile: File = null; // Variable to store file

  constructor(public urlService: UrlService,
    private router: Router,
    private httpService: HttpService,
    public Utility :UtilityService,
    public APIUtilityService: APIUtilityService,
    public CommonService : CommonService,
    private route: ActivatedRoute,
    public CommonDtoService : CommonDtoService,) 
      {
        this._AdHocPaymentDropDownsModel = new AdHocPaymentDropDownsModel();
        this._AdHocPaymentModel = new AdHocPaymentModel();
        this._Paymentdoc = new CommonDocDataModel();
        this._SearchCriteria = new SearchCriteria();
      }

  ngOnInit(): void 
    {
      this.dtOptions = 
        {
          pagingType: 'full_numbers',
          pageLength: 5,
          language: {emptyTable : "No Documents!!"}
        };
      this.GetAdHocPaymentDropDowns();
      this._SearchCriteria = this.CommonDtoService._SearchCriteriaDTO;
      this.Utility.LogText2("get data", this._SearchCriteria);
      this.GetDataFromParent();
    }


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

  GetAdHocPaymentDropDowns()
    {
      let url = this.urlService.GetAdHocPaymentDropDownsAPI;
      this.httpService.get(url,null).subscribe(response => {
        this._AdHocPaymentDropDownsModel = response;
        },error => {
          this.Utility.LogText2("GetAdHocPaymentDropDownsAPI error",error);
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

    /**add/edit payment deatils */
    SavePaymentDetails()
      {
        this.CommonService.ShowSpinnerLoading();
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
        }
        this._AddNewPaymentDetails = false;
        this.ReloadDatatable();  
    }

    DeletePaymentDetails()
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
      },error => {
        this.Utility.LogText(error);
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
      this.APIUtilityService.DeleteDocument(APIurl,this._AdHocPaymentModel.Documents,doc);
      this.ReloadDatatable();
    } 

      /**Go Back To AssetsList page*/
  GoBackToPaymentList()
    {
      this.router.navigate(['View_Adhoc_Payment'], { relativeTo: this.route.parent });
      // this.child.reRenderParent();
    }
}
