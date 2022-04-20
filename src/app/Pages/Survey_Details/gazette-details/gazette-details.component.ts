import { Component,AfterViewInit,QueryList, OnInit, Input,OnChanges, Output,EventEmitter,ViewChild,ViewChildren } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { UtilityService } from 'src/app/services/utility.service';
import { saveAs } from 'file-saver';
import { DownloadService } from '../../../services/download.service';
import { HttpClient,HttpResponse, HttpHeaders } from "@angular/common/http";
import { GazzateDropDownsDataModel,GazetteDetailsDataModel ,GazetteModel,NotificationModel,NotificationDetailsDataModel, GazzetteDocuments} from 'src/app/Model/Gazette.model';
import { CommonDropdownModel} from 'src/app/Model/Base.model';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { APIUtilityService } from 'src/app/services/APIUtility.service';
import { CommonService} from 'src/app/services/common.service';

@Component({
  selector: 'app-gazette-details',
  templateUrl: './gazette-details.component.html',
  styleUrls: ['./gazette-details.component.css']
})
export class GazetteDetailsComponent implements OnInit {
  // @ViewChild('multiSelect') multiSelect;
  /**enable/disable input fields variables*/
  _DisabledGazetteInputField: boolean = true;
  /**add new gazette/notification details */
  _AddNewGazette : boolean = false;
  _ShowGazetteDetailsDiv : boolean = false;
  /**selected TypeOfNotification DD value save in this variable */
  _TypeOfNotification : any;
  /**edit uploaded documents flag */
  _IsEditGazetteDoc : boolean = false;
  _GazetteDocIndex : any;
  /**new apis data model */
  _GazzateDropDownsDataModel : GazzateDropDownsDataModel;
  _GetGazetteByTypeNotification  : CommonDropdownModel[];
  _GetAllGazetteDetails : CommonDropdownModel[];
  _GazetteModel : GazetteModel;

  /**notification tab variables/ object */
  _IsEditNotificationDoc : boolean = false;
  _NotificationValue: any;
  _NotificationDetails : CommonDropdownModel[];
  _NotificationModel : NotificationModel;
  _ShowNotificationDetailsDiv : boolean = false;
  _AddNewNotification : boolean = false;//add new notification
  _DisabledNoticeInputField: boolean = true;
  _NotificationDocIndex : any;

  _gazzettedoc : GazzetteDocuments ;
  _notificationDoc : GazzetteDocuments;
  /**data table properties  */
  @ViewChild(DataTableDirective, {static: false})
  //@ViewChildren(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;

 /**confirmation popup, message variables */
 popoverTitle ="Delete Details";
 popoverMessage = "Are you sure you want to delete it ?";
 currentJustify = 'justified';//tab alignment 

 file: File = null; // Variable to store file
 notificationFile : File = null;


  constructor(public urlService: UrlService,
    private router: Router,
    private httpService: HttpService,
    public Utility: UtilityService,
    private downloadService: DownloadService,
    private http: HttpClient,
    public APIUtilityService: APIUtilityService,
    public CommonService : CommonService
    ) 
    { 
      this._GazetteModel = new GazetteModel();
      this._GazzateDropDownsDataModel =  new GazzateDropDownsDataModel();
      this._NotificationDetails = [];
      this._GetGazetteByTypeNotification =[];
      /**notification tab object */
      this._NotificationModel = new NotificationModel();
      this._GetAllGazetteDetails = [];
      this._gazzettedoc = new GazzetteDocuments();
      this._notificationDoc = new GazzetteDocuments();

    }

  ngOnInit(): void 
    {
      this.dtOptions = 
      {
        pagingType: 'full_numbers',
        pageLength: 5,
      };
      this.GetGazzateDropDowns();//gazette tab api
      this.GetAllNotificationNos();//Notification Tab API
    }

  ngAfterViewInit(): void 
    {
      this.dtTrigger.next();
      //console.log('ngAfterViewInit');
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
            this.dtTrigger2.next();
          });
        }
      else
        {
          this.IsDtInitialized = true;
          this.dtTrigger.next();
          this.dtTrigger2.next();
        }
    }
    
  /**
   * Get type of notification list
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

  /**
   * Get All Gazzates based on the selected TypeOfNotification
   */
  GetGazzatesByTypeOfNotification()
    {
      let url = this.urlService.GetAllGazzatesbasedOntypeOfNoAPI + this._TypeOfNotification;
      this.httpService.get(url, null).subscribe(response => {
        this._GetGazetteByTypeNotification = response;
        // this.ReloadDatatable();
      }, error => {
        this.Utility.LogText(error);
      });
    }

  /**
   * search gazette details based on the selected typeofNotification and NotificationNo.
   */
  SearchGazetteDetails()
    {
      this.Utility.LogText(this._GazetteModel.Gazzateid);
      if(this._GazetteModel.Gazzateid != null)
      {
        this.GetGazzateByGazzateID();
        this._ShowGazetteDetailsDiv = true
        this._DisabledGazetteInputField = true;
      }
      else
        {
          alert("Please select Gazette!!");
        }
    }

  /***
   * Get Gazzate details By Gazetteid 
   */
  GetGazzateByGazzateID()
    {
      this.CommonService.ShowSpinnerLoading();
      let url = this.urlService.GetGazzateByIdAPI + this._GazetteModel.Gazzateid;
      this.httpService.get(url, null).subscribe(response => {
        this._GazetteModel = response;
        // this.ReloadDatatable();
        this.Utility.LogText(this._GazetteModel);
        this.CommonService.hideSpinnerLoading();
      }, error => {
        this.Utility.LogText(error);
        this.CommonService.hideSpinnerLoading();
      }); 
    }  

  /**
   * add new gazette details 
   */
  AddNewGazetteDetails()
    {
      this._DisabledGazetteInputField = false;
      this._GazetteModel = new GazetteModel();
      this._AddNewGazette = true;
      this._ShowGazetteDetailsDiv = false;
    }

  /** 
   * edit existing Gazette Details 
   */
  EditGazetteDetails()
    {
      this._DisabledGazetteInputField = false;
      this._AddNewGazette = false;
    }

   // On file Select
   onChange(event) {
    this.file = event.target.files[0];
   } 

  /**
  * Document upload in gazette details tab
  */
   FileUpload(isGazzette : boolean,fileInput) 
    {
        let gDoc : GazzetteDocuments;
        if(!this.file && isGazzette)
        {
          alert("Please select file!!");
          return;
        }
        if(!this._gazzettedoc.Lookupid && isGazzette)
        {
           alert("Please select gazzette doc type !");
           return;
        }

        if(!this.notificationFile && !isGazzette)
        {
          alert("Please select file!!");
          return;
        }
        if(!this._notificationDoc.Lookupid && !isGazzette)
        {
           alert("Please select Notification doc type !");
           return;
        }

        // Need to check if the gazzate is in edit mode ( Send current doc) or add mode ( send all docs at once)
        if(isGazzette)
        {
          this._gazzettedoc.GazzateId = this._GazetteModel.Gazzateid;
          this._gazzettedoc.Document = this.file;
          gDoc = this._gazzettedoc;
        }
        else
        {
          this._notificationDoc.GazzateId = this._NotificationModel.GazzateId;
          this._notificationDoc.NotificationId = this._NotificationModel.NotificationId;
          this._notificationDoc.Document = this.notificationFile;
          gDoc = this._notificationDoc;
        }

        let url = this.urlService.AddGazzetteDocument; 
        this.httpService.Post(url, gDoc.GetFormData()).subscribe(response => {
          let gazzetteDocumentModelResp: GazzetteDocuments[] = response.Result;   
          if(isGazzette)
          {       
            this._GazetteModel.Documents = gazzetteDocumentModelResp;
          }
          else
          {
             this._NotificationModel.Documents = gazzetteDocumentModelResp;
          }
          this.Utility.LogText(gazzetteDocumentModelResp);
          alert("Document updated sucessfully!!");
          // this.ReloadDatatable();
        },error => {
          this.Utility.LogText(error);
        });
        this.FileUploadreset(fileInput)
    }

    
    FileUploadreset(element) 
      {
        element.value = "";
        this.file = null;
        this.notificationFile = null;
      }


    downloadFile(documentId : number): any 
    {
      let url = this.urlService.DownloadGazzete + documentId;
      return this.http.get(url, {responseType: 'blob'});
    }

    /**edit uploaded gazette document */
  EditGazetteDocument(arg)
    {
      this._IsEditGazetteDoc = true;
      const index = this._GazetteModel.Documents.indexOf(arg);
      this._GazetteDocIndex = index
    }
  
  /**
   *  add new Gazzatedetails or edit details 
   *  api call
   */
  SaveGazzateDetails()
    {
      this.CommonService.ShowSpinnerLoading();
      if(!this._TypeOfNotification)
      {
         alert("Please select type of notification !");
         return;
      }
      this._GazetteModel.TypeOfNotification = this._TypeOfNotification;
      let url = this.urlService.AddOrUpdateGazzateAPI;     
      this.httpService.HttpPostRequest(url,this._GazetteModel,this.AddOrUpdateGazzateCallBack.bind(this),null);
    }
   
    /**
    * @param dtas 
    */
  AddOrUpdateGazzateCallBack(dtas)
    {
      if (dtas != null)
        {
          let GazetteRespDataModel : GazetteDetailsDataModel = dtas;
          if (GazetteRespDataModel.StatusCode != 200) 
            {
              alert(GazetteRespDataModel.Message);
            }
          if (this._AddNewGazette == false)
            {
              alert("Gazette updated sucessfully!!");
              this._DisabledGazetteInputField = true;
              // this.ReloadDatatable();
            }
          else
            {
              alert("Gazette added sucessfully!!");
              this._DisabledGazetteInputField = true;
              this._GazetteModel.Gazzateid = GazetteRespDataModel.Result.Gazzateid;
              this._AddNewGazette = false;
              // this.ReloadDatatable();
            }   
        }
        this._AddNewGazette = false;
        this._ShowGazetteDetailsDiv = true;
    }

  /**Delete Gazette Details */
  DeleteGazetteDetails()
    {
      let url = this.urlService.DeleteGazzateAPI + this._GazetteModel.Gazzateid;
      this.httpService.get(url, null).subscribe(response => {
        let GazetteDeleteResponse: any = response;
        if (GazetteDeleteResponse.StatusCode != 200) 
        {
          alert(GazetteDeleteResponse.Message);
        }
        else {
          alert("Gazette deleted successfully !");
          this._GazetteModel = new GazetteModel();
          this.GetGazzatesByTypeOfNotification();
        }
      }, error => {
        this.Utility.LogText(error);
      });
    }

  DeleteGazetteDocument( doc : GazzetteDocuments, isGazzette : boolean)
    {
        let url = this.urlService.DeleteGazzetteDocument + doc.DocumentId;
        this.httpService.get(url,null).subscribe(response => {
          alert("Gazzette document deleted !");
          if(isGazzette)
          {
            let index = this._GazetteModel.Documents.indexOf(doc);
            this._GazetteModel.Documents.splice(index,1);
          }
          else
          {
            let index = this._NotificationModel.Documents.indexOf(doc);
            this._NotificationModel.Documents.splice(index,1);
          }
          // this.ReloadDatatable();
        }, error => {
          this.Utility.LogText(error);
        });
    }

/**================================== Notification Tab methods ========================================**/
 /**
   * get all notification api call on type of notification dropdown onchange
   */
  GetAllNotificationNos()
    {
      let url = this.urlService.GetAllNotificationNosAPI;
      this.httpService.get(url, null).subscribe(response => {
        this._NotificationDetails = response;
        // this.ReloadDatatable();
        this.Utility.LogText(this._NotificationDetails);
      }, error => {
        this.Utility.LogText(error);
      });
    } 

  /**
   * Search notification details based on the selected Notification no
   **/  
  SearchNotificationDetails()
    {
      this.GetNotificationById();
      this._ShowNotificationDetailsDiv = true;
      this._DisabledNoticeInputField = true;
      this._AddNewNotification = false;
      this.GetAllGazette();
    }

  /**get Notification By Notification Id*/
  GetNotificationById()
    {
      this.CommonService.ShowSpinnerLoading()
      let url = this.urlService.GetNotificationByIdAPI + this._NotificationValue;
      this.httpService.get(url, null).subscribe(response => {
        this._NotificationModel = response;
        this.Utility.LogText(this._NotificationModel);
        this.CommonService.hideSpinnerLoading();
      }, error => {
        this.Utility.LogText(error);
        this.CommonService.hideSpinnerLoading();
      });
    } 

  GetAllGazette()
    {
      let url = this.urlService.GetAllGazzatesAPI; //null;
      this.httpService.get(url, null).subscribe(response => {
        this._GetAllGazetteDetails = response;
      }, error => {
        this.Utility.LogText(error);
      });
    } 


/**add new Notification details */
  AddNewNotificationDetails()
    {
      this._AddNewNotification = true;
      this._DisabledNoticeInputField = false;
      this.GetAllGazette();
      this._NotificationModel = new NotificationModel();
      this._ShowNotificationDetailsDiv = false;
    }

  /**edit Notification details */  
  EditNotificationDetails()
    {
      this._DisabledNoticeInputField = false;
      this._AddNewNotification = false;
      this.GetAllGazette();
    }

    /**
   *  add new Notification details or edit details 
   *  api call
   */
  SaveNotificationDetails()
    {
      if(!this._NotificationModel.GazzateId)
      {
         alert("Please select Gazzete number !");
         return;
      }
      this.CommonService.ShowSpinnerLoading();
      this._NotificationModel.NotificationNo = this._NotificationValue;
      let url = this.urlService.AddOrUpdateNotificationAPI;    
      this.httpService.HttpPostRequest(url,this._NotificationModel,this.AddOrUpdateNotificationCallBack.bind(this),null);
    }
 
  /**
  * @param dtas 
  */
  AddOrUpdateNotificationCallBack(dtas)
    {
      if (dtas != null)
        {
          let NotificationRespDataModel : NotificationDetailsDataModel = dtas;
          if (NotificationRespDataModel.StatusCode != 200) 
            {
              alert(NotificationRespDataModel.Message);
            }
          if (this._AddNewNotification == false)
            {
              alert("Notification updated sucessfully!!");
              this._DisabledNoticeInputField = true;
              this.GetAllNotificationNos();//Notification Tab API
            }
          else
            {
              alert("Notification added sucessfully!!");
              this._DisabledNoticeInputField = true;
              this._AddNewNotification = false;
              this.GetAllNotificationNos();//Notification Tab API
            }  
            // this.ReloadDatatable(); 
        }
    }

  /**
   * delete notification delete permanently
   */
  DeleteNotificationDetails()
    {
      let url = this.urlService.DeleteNotificationAPI + this._NotificationModel.NotificationId;
      this.httpService.get(url, null).subscribe(response => {
        let NotificationDeleteResp: any = response;
        if (NotificationDeleteResp.StatusCode != 200) 
        {
          alert(NotificationDeleteResp.Message);
        }
        else {
          alert("Notification deleted successfully !");
          this._NotificationModel = new NotificationModel();
          this.GetAllNotificationNos();
        }
      }, error => {
        this.Utility.LogText(error);
      });
    }

  /**
   * Upload notification documents
   */
  NotificationDocUpload(argEvent : any)
    {
      this.notificationFile = argEvent.target.files[0];
    }

  DownlaodDocument(doc : GazzetteDocuments)
    {
      let url = this.urlService.DownloadGazzete + doc.DocumentId;
      this.APIUtilityService.DownloadDocument(url);
    }

    GetLookupValue(lookups : CommonDropdownModel[],lookUpid: number) : any
    {
        let object = lookups.find(elm=>elm.Value == lookUpid );
        if(object)
        {
          return object.Text;
        }
        else { return lookUpid;}
    }

}
