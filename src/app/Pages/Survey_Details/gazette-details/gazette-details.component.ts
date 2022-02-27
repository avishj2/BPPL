import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { UtilityService } from 'src/app/services/utility.service';
import { saveAs } from 'file-saver';
import { DownloadService } from '../../../services/download.service';
import { HttpClient,HttpResponse, HttpHeaders } from "@angular/common/http";
import { GazzateDropDownsDataModel,GazetteDetailsDataModel ,GazetteModel,NotificationModel,NotificationDetailsDataModel, GazzetteDocuments} from 'src/app/Model/Gazette.model';
import { CommonDropdownModel} from 'src/app/Model/Base.model';


@Component({
  selector: 'app-gazette-details',
  templateUrl: './gazette-details.component.html',
  styleUrls: ['./gazette-details.component.css']
})
export class GazetteDetailsComponent implements OnInit {
  @ViewChild('multiSelect') multiSelect;
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
    private http: HttpClient
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
      this.GetGazzateDropDowns();//gazette tab api
      this.GetAllNotificationNos();//Notification Tab API
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
      let url = this.urlService.GetAllGazzatesAPI + this._TypeOfNotification;
      this.httpService.get(url, null).subscribe(response => {
        this._GetGazetteByTypeNotification = response;
      }, error => {
        this.Utility.LogText(error);
      });
    }

  /**
   * search gazette details based on the selected typeofNotification and NotificationNo.
   */
  SearchGazetteDetails()
    {
      console.log(this._GazetteModel.Gazzateid);
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
      let url = this.urlService.GetGazzateByIdAPI + this._GazetteModel.Gazzateid;
      this.httpService.get(url, null).subscribe(response => {
        this._GazetteModel = response;
        this.Utility.LogText(this._GazetteModel);
      }, error => {
        this.Utility.LogText(error);
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
   FileUpload(isGazzette : boolean) 
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
        },error => {
          this.Utility.LogText(error);
        });
    }

    downloadFile(documentId : number): any {
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
            }
          else
            {
              alert("Gazette added sucessfully!!");
              this._DisabledGazetteInputField = true;
              this._GazetteModel.Gazzateid = GazetteRespDataModel.Result.Gazzateid;
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
      let url = this.urlService.GetNotificationByIdAPI + this._NotificationValue;
      this.httpService.get(url, null).subscribe(response => {
        this._NotificationModel = response;
        this.Utility.LogText(this._NotificationModel);
      }, error => {
        this.Utility.LogText(error);
      });
    } 

  GetAllGazette()
    {
      let url = this.urlService.GetAllGazzatesAPI; //null;
      this.httpService.get(url, null).subscribe(response => {
        this._GetAllGazetteDetails = response;
        // this.Utility.LogText(this._GetAllGazetteDetails);
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
            }
          else
            {
              alert("Notification added sucessfully!!");
              this._DisabledNoticeInputField = true;
            }   
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
      let link = document.createElement('a');
      link.setAttribute('type', 'hidden');
      link.setAttribute("target","_blank");
      link.href = url;
      link.download = "C:/Users/admin/Downloads/";
      document.body.appendChild(link);
      link.click();
      link.remove();
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
