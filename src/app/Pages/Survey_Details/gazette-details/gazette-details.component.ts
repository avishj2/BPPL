import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { UtilityService } from 'src/app/services/utility.service';
import { saveAs } from 'file-saver';
import { DownloadService } from '../../../services/download.service';
import { HttpClient,HttpResponse, HttpHeaders } from "@angular/common/http";
import { NotificationTypeDataModel,CommonDropdownModel,GazetteDetailsDataModel ,GazetteModel } from 'src/app/Model/Gazette.model';


@Component({
  selector: 'app-gazette-details',
  templateUrl: './gazette-details.component.html',
  styleUrls: ['./gazette-details.component.css']
})
export class GazetteDetailsComponent implements OnInit {
  /**enable/disable input fields variables*/
  _DisabledInputField: boolean = true;

  _InputFileLabel;//file type label

  _NotificationTypeDataModel :NotificationTypeDataModel[];
  _NotificationDetails : CommonDropdownModel[];
  _StateVillageDetails : CommonDropdownModel[];
  _GazetteModel : GazetteModel;
  _TypeOfNotification : any;
  _NotificationValue;
  _ShowGazetteDetailsDiv : boolean = false;
  _AddNewGazette : boolean = false;

  _IsEdit : boolean = false;
  _EditDocument;

 /**popup message variables */
 popoverTitle ="Delete Details";
 popoverMessage = "Are you sure you want to delete it ?";


  constructor(public urlService: UrlService,
    private router: Router,
    private httpService: HttpService,
    public Utility: UtilityService,
    private downloadService: DownloadService,
    private http: HttpClient
    ) 
    { 
      this._NotificationTypeDataModel = [];
      this._NotificationDetails = [];
      this._StateVillageDetails = [];
      this._GazetteModel = new GazetteModel();

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
        this._NotificationTypeDataModel = response;
        this.Utility.LogText(this._NotificationTypeDataModel);
      }, error => {
        this.Utility.LogText(error);
      });
    }

  /**
   * get all notification api call on type of notification dropdown onchange
   */
   GetAllNotificationNos()
   {
      let url = this.urlService.GetAllNotificationNosAPI + this._TypeOfNotification;
      this.httpService.get(url, null).subscribe(response => {
        this._NotificationDetails = response;
        this.Utility.LogText(this._NotificationDetails);
      }, error => {
        this.Utility.LogText(error);
      });
   }

  /**
   * search gazette details based on the selected typeofNotification and NotificationNo.
   */
  SearchGazetteDetails()
    {
      if(this._TypeOfNotification != null && this._NotificationValue != null)
      {
        this.GetGazzateByNotification();
        this._ShowGazetteDetailsDiv = true
        this._DisabledInputField = true;
      }
      else
        {
          alert("Please select Type of Notification and Notification No.!!");
        }
    }

  /***
   * Get Gazzate details By NotificationAPI
   */
  GetGazzateByNotification()
    {
      // let url = this.urlService.GetGazzateByNotificationAPI + this._TypeOfNotification;
      let url = this.urlService.GetGazzateByNotificationAPI + this._NotificationValue;
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
      this._DisabledInputField = false;
      this.GetStateVillage();
      this._GazetteModel = new GazetteModel();
      this._AddNewGazette = true;
    }

  /** 
   * edit existing Gazette Details 
   */
  EditGazetteDetails()
    {
      this._DisabledInputField = false;
      this.GetStateVillage();
    }

  /**
  * Get State Village list
  */
  GetStateVillage()
    {
      let url = this.urlService.GetStateVillageAPI;
      this.httpService.get(url, null).subscribe(response => {
        this._StateVillageDetails = response;
        this.Utility.LogText(this._StateVillageDetails);
      }, error => {
        this.Utility.LogText(error);
      });
    }

  /**
  * Document upload 
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
          this._InputFileLabel = file.name; //saved file name with extn.
          let FileName = file.name.split('.').slice(0, -1).join('.');
          let Extension = file.name.split(".").pop();//file extension save 

          this._GazetteModel.Documents.push({'filePath':Extension ,'fileName': FileName,documentId : 0,gazzateId : this._GazetteModel.Gazzateid,lookupid : this._TypeOfNotification})
          console.log(this._GazetteModel.Documents);
    }

  EditDocument(arg)
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
      /**array datatype change */
      this._GazetteModel.Villages = this._GazetteModel.Villages.map(i=>Number(i));
      console.log(this._GazetteModel.Villages);
      this._GazetteModel.TypeOfNotification = this._TypeOfNotification;
      this._GazetteModel.NotificationNo = this._NotificationValue;
      let url = this.urlService.AddOrUpdateGazzateAPI;    
      // this.httpService.CallBack = this.AddOrUpdateGazzateCallBack.bind(this);
      //let options :{} = this.utility.PrepareRequestHeaderWithToken();
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
          this._DisabledInputField = true;           
        }
    }
 

  DeleteDocument(index)
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



  DownlaodDocument()
    {
      //this.downloadService.SavePdfFile("http://www.africau.edu/images/default/sample.pdf","downloadfile");
      //this.downloadService.SavePdfFile("C:/Users/admin/Downloads/CL-10-Model", "downloadfile");
      let url =  "http://www.africau.edu/images/default/sample.pdf";
      let link = document.createElement('a');
      link.setAttribute('type', 'hidden');
      link.href = url;
      link.download = "C:/Users/admin/Downloads/";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

  test()
    {
      let url =  "http://www.africau.edu/images/default/sample.pdf"
      let headers = new HttpHeaders();
      headers = headers.set('Accept', 'application/pdf');
      return this.http.get(url, { headers: headers, responseType: 'blob' as 'json' });
    }


}
