import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { UtilityService } from 'src/app/services/utility.service';
import { saveAs } from 'file-saver';
import { DownloadService } from '../../../services/download.service';
import { HttpClient,HttpResponse, HttpHeaders } from "@angular/common/http";
import { TypeOfNotificationDataModel,GazetteDetailsDataModel ,GazetteModel,NotificationModel } from 'src/app/Model/Gazette.model';
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
  _DisabledNoticeInputField: boolean = true;
  /**add new gazette/notification details */
  _AddNewGazette : boolean = false;
  _AddNewNotification : boolean = false;

  _ShowGazetteDetailsDiv : boolean = false;
  _ShowNotificationDetailsDiv : boolean = false;
  
  _TypeOfNotificationDataModel :TypeOfNotificationDataModel[];
  _NotificationDetails : CommonDropdownModel[];
  _GazetteModel : GazetteModel;
  _NotificationModel : NotificationModel;
  /**TypeOfNotification and notification DD values save in these variables */
  _TypeOfNotification : any;
  _NotificationValue;
  /**test */
  _IsEdit : boolean = false;
  _EditDocument;

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
      this._TypeOfNotificationDataModel = [];
      this._NotificationDetails = [];
      this._GazetteModel = new GazetteModel();
      this._NotificationModel = new NotificationModel();

    }

  ngOnInit(): void 
    {
      this.GetTypeOfNotification();
    }

  /**
   * Get type of notification list
   */
  GetTypeOfNotification()
    {
      let url = this.urlService.GetTypeOfNotificationsAPI;
      this.httpService.get(url, null).subscribe(response => {
        this._TypeOfNotificationDataModel = response;
        this.Utility.LogText(this._TypeOfNotificationDataModel);
      }, error => {
        this.Utility.LogText(error);
      });
    }

  /**
   * search gazette details based on the selected typeofNotification and NotificationNo.
   */
  SearchGazetteDetails()
    {
      if(this._TypeOfNotification != null)
      {
        // this.GetGazzateByNotification();
        this._ShowGazetteDetailsDiv = true
        this._DisabledGazetteInputField = true;
      }
      else
        {
          alert("Please select Type of Notification!!");
        }
    }

  /***
   * Get Gazzate details By NotificationAPI 
   */
  GetGazzateByNotification()
    {
      let url = this.urlService.GetGazzateByNotificationAPI + this._NotificationValue;//change
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
      if(this._IsEdit == true && target.files.length != 0)
        {
          this._GazetteModel.Documents.splice(this._EditDocument, 1);
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

          this._GazetteModel.Documents.push({'filePath':Extension ,'fileName': FileName,documentId : 0,gazzateId : this._GazetteModel.Gazzateid,lookupid : this._TypeOfNotification})
          console.log(this._GazetteModel.Documents);
          this._IsEdit = false;
    }

    /**edit uploaded gazette document */
  EditGazetteDocument(arg)
    {
      this._IsEdit = true;
      this._EditDocument = arg
    }
  
  /**
   *  add new Gazzatedetails or edit details 
   *  api call
   */
  SaveGazzateDetails()
    {
      this._GazetteModel.TypeOfNotification = this._TypeOfNotification;
      this._GazetteModel.NotificationNo = this._NotificationValue;
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
          this._DisabledGazetteInputField = true;           
        }
    }
 

  DeleteGazetteDocument(index)
    {
      this._GazetteModel.Documents.splice(index, 1);
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
     let url = this.urlService.GetAllNotificationNosAPI + this._TypeOfNotification;//change
     this.httpService.get(url, null).subscribe(response => {
       this._NotificationDetails = response;
       this.Utility.LogText(this._NotificationDetails);
     }, error => {
       this.Utility.LogText(error);
     });
  }  

/**add new Notification details */
  AddNewNotificationDetails()
    {
      this._AddNewNotification = true;
      this._DisabledNoticeInputField = false;
      this._NotificationModel = new NotificationModel();
    }

  /**edit Notification details */  
  EditNotificationDetails()
    {
      this._DisabledNoticeInputField = false;
      this._AddNewNotification = false;
    }

  SearchNotificationDetails()
    {
      this._ShowNotificationDetailsDiv = true;
      this._DisabledNoticeInputField = true;
      this._AddNewNotification = false;
    }

  /**
   * delete notification delete permanently
   */
  DeleteNotificationDetails()
    {

    }

  DeleteNotificationDocument(index)
    {
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
