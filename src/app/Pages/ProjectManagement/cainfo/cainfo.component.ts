import { Component, OnInit,ViewChild } from '@angular/core';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import {CommonDropdownModel, CommonDocDataModel} from 'src/app/Model/Base.model';
import { CADropdownModel ,CADataRespDataModel ,CADataModel} from 'src/app/Model/CA.model';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { APIUtilityService } from 'src/app/services/APIUtility.service';

@Component({
  selector: 'app-cainfo',
  templateUrl: './cainfo.component.html',
  styleUrls: ['./cainfo.component.css']
})
export class CAInfoComponent implements OnInit {
  /**data table properties  */
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  _DisabledInputField : boolean = true;
  _CADropdownModel : CADropdownModel;
  _AddNewCA : boolean = false;
  _CADataModel : CADataModel;
  _CAdocumnet : CommonDocDataModel ;
  _ShowCADetailsDiv: boolean = false;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it ?";
  CAfile: File = null; // Variable to store file

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,
    public APIUtilityService: APIUtilityService,) 
    { 
      this._CADropdownModel = new CADropdownModel();
      this._CADataModel = new CADataModel();
      this._CAdocumnet = new CommonDocDataModel();
      // _CAdocumnet.Lookupid
    }

  ngOnInit(): void 
    {
      this.GetCADetailsDropDowns();
      // this._DisabledInputField = false;
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

  SerachDetails()
    {
      this._ShowCADetailsDiv = true;
      this.GetCADetails();
    }

  GetCADetailsDropDowns()
    {
      let url = this.urlService.GetCADetailsDropDownsAPI;
      this.httpService.get(url, null).subscribe(response => {
        this._CADropdownModel = response;
        this.Utility.LogText(this._CADropdownModel);
        }, error => {
          this.Utility.LogText(error);
        });
    }

  GetCADetails()
    {
      let url = this.urlService.GetCADetailsAPI + this._CAdocumnet.RequestId;
      this.httpService.get(url, null).subscribe(response => {
        this._CADataModel = response; 
        this.Utility.LogText(this._CADataModel);    
        this._ShowCADetailsDiv = true;
        this._AddNewCA = false;
        this._DisabledInputField = true;
        this.IsDtInitialized = true;
        this.ReloadDatatable();
        }, error => {
        this.Utility.LogText(error);
      }); 
    }

  AddCADetails()
    {
      this._AddNewCA = true;
      this._DisabledInputField = false;
      this._CADataModel = new CADataModel();
    }


  EditCADetails()
    {
      if(this._CAdocumnet.RequestId != null)
        {
          this._AddNewCA = false;
          this._DisabledInputField = false;
        }
        else{
          alert("Please select CA Name!");
        }
    }

  AddOrUpdateCADetails()
    {
      this.CommonService.ShowSpinnerLoading();
      let url = this.urlService.AddOrUpdateCADetailsAPI;
      this.httpService.HttpPostRequest(url,this._CADataModel,this.GetAllAdHocPaymentsCallBack.bind(this),null); 
    }

    /** 
    * @abstract
    */
  GetAllAdHocPaymentsCallBack(dtas)
    {
      if (dtas != null)
        {
          let RespDataModel : CADataRespDataModel = dtas;
          if (RespDataModel.StatusCode != 200) 
          {
            alert(RespDataModel.Message);
          }
          if (this._AddNewCA == false)
            {
              alert("CA Details updated sucessfully!!");
              this._DisabledInputField = true;
            }
          else
            {
              alert("CA Details added sucessfully!!");
              this._DisabledInputField = true;
              this._CADataModel.CADetailsId  = RespDataModel.Result.CADetailsId
              this._AddNewCA = false;
            }   
        }
        this._AddNewCA = false;
        this._ShowCADetailsDiv = true;
        this.ReloadDatatable();  
    }

  DeleteCADetails()
    {
      let url = this.urlService.DeleteCADetailsAPI + this._CADataModel.CADetailsId ;
      this.httpService.get(url,null).subscribe(response => {
        let CrossingDetails : any = response;
        if (CrossingDetails.StatusCode != 200) 
          {
            alert(CrossingDetails.Message);
          }
          else {
            alert("CA deleted Successfully!");
            this.GetCADetailsDropDowns();
            this.ResetFlags();
          }
        },error => {
          this.Utility.LogText(error);
        });
    }

  ResetFlags()
    {
      this._ShowCADetailsDiv = false;
      this._AddNewCA = false;
      this._DisabledInputField  = true;
    }

  // On file Select
  onChangeDocument(event)
    {
      this.CAfile = event.target.files[0];
    }

  FileUpload(isDoc : boolean, fileinput)
    {
      let Doc : CommonDocDataModel;
      if(!this.CAfile && isDoc)
      {
        alert("Please select file!!");
        return;
      }
      if(!this._CAdocumnet.Lookupid && isDoc)
        {
          alert("Please select CA doc type !");
          return;
        }
      this._CAdocumnet.RequestId = Number(this._CAdocumnet.RequestId);
      this._CAdocumnet.Document = this.CAfile;
      this._CAdocumnet.ToChainage = '';
      this._CAdocumnet.FromChainage = '';
      this._CAdocumnet.DocumentId = 0;
      Doc = this._CAdocumnet;

      /**api call */
      let url = this.urlService.AddCADetailsDocumentAPI; 
      this.httpService.Post(url, Doc.GetFormData()).subscribe(response => {
          let crossingDocumentModelResp: CommonDocDataModel[] = response.Result;   
          if(isDoc)
          {       
            this._CADataModel.Documents = crossingDocumentModelResp;
          }
          this.ReloadDatatable();
          this.Utility.LogText(crossingDocumentModelResp);
          alert("Document updated sucessfully!!");
        });
      this.FileUploadreset(fileinput)// file object clear
  }

  FileUploadreset(element) 
    {
        element.value = "";
        this.CAfile = null;
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


  /**download crossing details document */
  DownlaodCADocument(doc : CommonDocDataModel)
    {
      let url = this.urlService.DownloadCAdocAPI + doc.DocumentId;
      this.APIUtilityService.DownloadDocument(url);
    }

  DeleteCADocument(doc : CommonDocDataModel)
    {
      let APIUrl = this.urlService.DeleteCADetailsDocumentAPI + doc.DocumentId;
      this.APIUtilityService.DeleteDocument(APIUrl,this._CADataModel.Documents,doc).subscribe(response => {
        this.ReloadDatatable();
      });
      
    }

}
