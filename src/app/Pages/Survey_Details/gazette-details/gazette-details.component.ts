import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { UtilityService } from 'src/app/services/utility.service';
import { saveAs } from 'file-saver';
import { DownloadService } from '../../../services/download.service';
import { HttpClient,HttpResponse, HttpHeaders } from "@angular/common/http";
import { GazzateDropDownsDataModel,GazetteDetailsDataModel ,GazetteModel,NotificationModel,NotificationDetailsDataModel} from 'src/app/Model/Gazette.model';
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

 /**confirmation popup, message variables */
 popoverTitle ="Delete Details";
 popoverMessage = "Are you sure you want to delete it ?";
 currentJustify = 'justified';//tab alignment 

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
    }

  /** 
   * edit existing Gazette Details 
   */
  EditGazetteDetails()
    {
      this._DisabledGazetteInputField = false;
      this._AddNewGazette = false;
    }

 
  /**
  * Document upload in gazette details tab
  */
  FileUpload(argEvent: any) 
    {
      const target: DataTransfer = <DataTransfer>(argEvent.target);
      if(this._IsEditGazetteDoc == true && target.files.length != 0)
        {
          this._GazetteModel.Documents.splice(this._GazetteDocIndex, 1);
          //let data = document.getElementById("Edit");
        }
      else if(target.files.length === 0)
        {
          alert("Please select file!!");
          return;
        }
          const reader: FileReader = new FileReader();
          reader.readAsBinaryString(target.files[0]);
          const file = argEvent.target.files[0];
          let FileName = file.name.split('.').slice(0, -1).join('.');
          let Extension = file.name.split(".").pop();//file extension save 

          this._GazetteModel.Documents.push({'filePath':Extension ,'fileName': FileName,documentId : 0,gazzateId : this._GazetteModel.Gazzateid,lookupid : this._TypeOfNotification,notificationId : 0})
          console.log(this._GazetteModel.Documents);
          this._IsEditGazetteDoc = false;
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
            }   
        }
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

  DeleteGazetteDocument(index)
    {
      this._GazetteModel.Documents.splice(index, 1);
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
      const target: DataTransfer = <DataTransfer>(argEvent.target);
      if(this._IsEditNotificationDoc == true && target.files.length != 0)
        {
          //at the time of doc edit, removed existing document
          this._NotificationModel.Documents.splice(this._NotificationDocIndex, 1);//delete existing document
        }
      else if(target.files.length === 0)
        {
          alert("Please select file!!");
          return;
        }
          const reader: FileReader = new FileReader();
          reader.readAsBinaryString(target.files[0]);
          const file = argEvent.target.files[0];
          let FileName = file.name.split('.').slice(0, -1).join('.');
          let Extension = file.name.split(".").pop();//file extension save 

          this._NotificationModel.Documents.push({'filePath':Extension ,'fileName': FileName,documentId : 0,gazzateId : this._GazetteModel.Gazzateid,lookupid : this._TypeOfNotification,notificationId : 0})
          console.log(this._GazetteModel.Documents);
          this._IsEditNotificationDoc = false;
    }

  EditNotificationDocument(arg)
    {
      this._IsEditNotificationDoc = true;
      this._NotificationDocIndex = this._NotificationModel.Documents.indexOf(arg);
    }

    /**delete uploaded document */
  DeleteNotificationDocument(arg)
    {
      let Index = this._NotificationModel.Documents.indexOf(arg);
      this._NotificationModel.Documents.splice(Index , 1);
      // array.splice(index, 1);
    }

  DownlaodDocument()
    {
      let url =  "http://www.africau.edu/images/default/sample.pdf";
      let link = document.createElement('a');
      link.setAttribute('type', 'hidden');
      link.href = url;
      link.download = "C:/Users/admin/Downloads/";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

}
