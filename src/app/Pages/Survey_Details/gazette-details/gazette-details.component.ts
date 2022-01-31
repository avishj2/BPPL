import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AddDocuments ,DocumentDataModel } from '../Survey_Details.model';
import { saveAs } from 'file-saver';
import { DownloadService } from '../../../services/download.service';
import { HttpClient,HttpResponse, HttpHeaders } from "@angular/common/http";
import { NotificationTypeDataModel,CommonDropdownModel,GazetteDetailsDataModel } from 'src/app/Model/Gazette.model';


@Component({
  selector: 'app-gazette-details',
  templateUrl: './gazette-details.component.html',
  styleUrls: ['./gazette-details.component.css']
})
export class GazetteDetailsComponent implements OnInit {
  /**enable/disable input fields variables*/
  _DisabledInputField: boolean = true;
  _AddDocuments :AddDocuments;
  
  _InputFileLabel;
  _DocumentDataModel : DocumentDataModel[];

  _NotificationTypeDataModel :NotificationTypeDataModel[];
  _NotificationDetails : CommonDropdownModel[];
  _StateVillageDetails : CommonDropdownModel[];
  _GazetteDetailsDataModel : GazetteDetailsDataModel;
  _IsEdit : boolean = false;

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
      this._AddDocuments = new AddDocuments();
      this._DocumentDataModel = [];

      this._NotificationTypeDataModel = [];
      this._NotificationDetails = [];
      this._StateVillageDetails = [];
      this._GazetteDetailsDataModel = new GazetteDetailsDataModel();
    }

  ngOnInit(): void 
    {
      this._AddDocuments.ReadJson();
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
      let url = this.urlService.GetAllNotificationNosAPI + this._GazetteDetailsDataModel.Result.typeOfNotification;
      this.httpService.get(url, null).subscribe(response => {
        this._NotificationDetails = response;
        this.Utility.LogText(this._NotificationDetails);
      }, error => {
        this.Utility.LogText(error);
      });
   }


  /**
   * 
   */
  SearchGazetteDetails()
    {
      this._DisabledInputField = true;
      this.GetGazzateByNotification();
    }


    /***
   * Get Gazzate details By NotificationAPI
   */
  GetGazzateByNotification()
  {
    console.log(this._GazetteDetailsDataModel.Result.typeOfNotification);
    if(this._GazetteDetailsDataModel.Result.typeOfNotification != null)
    {
       let url = this.urlService.GetGazzateByNotificationAPI + this._GazetteDetailsDataModel.Result.typeOfNotification;
       this.httpService.get(url, null).subscribe(response => {
         this._GazetteDetailsDataModel.Result = response;
        //  this.Utility.LogText(this._GazetteDetailsDataModel);
       }, error => {
         this.Utility.LogText(error);
       });
    }
    else{
      alert("Please select Type of Notification !!")
    }
   
  }

   /**
   * Get State Village
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
   * 
   */
  AddNewGazetteDetails()
    {
      this._DisabledInputField = false;
      this.GetStateVillage();
    }

  /** 
   * edit Gazette Details 
   */
  EditGazetteDetails()
    {
      this._DisabledInputField = false;
    }

  /**
  * Document upload 
  */
  FileUpload(argEvent: any ) 
    {
      const target: DataTransfer = <DataTransfer>(argEvent.target);
      if(target.files.length === 0){
        alert("Please select file!!");
      }
      else{
        const reader: FileReader = new FileReader();
        reader.readAsBinaryString(target.files[0]);
        const file = argEvent.target.files[0];
        this._InputFileLabel = file.name; //saved file name with extn.
        let FileName = file.name.split('.').slice(0, -1).join('.');
        let Extension = file.name.split(".").pop();//file extension save 

        this._GazetteDetailsDataModel.Result.Documents.push({'filePath':Extension ,'fileName': FileName,documentId : 0,gazzateId : 0,lookupid : this._GazetteDetailsDataModel.Result.typeOfNotification})
        console.log(this._GazetteDetailsDataModel.Result.Documents);
      }
      
      
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

    test(){
      let url =  "http://www.africau.edu/images/default/sample.pdf"
      let headers = new HttpHeaders();
      headers = headers.set('Accept', 'application/pdf');
      return this.http.get(url, { headers: headers, responseType: 'blob' as 'json' });
    }

  /**
   *  add new Gazzatedetails or edit details Save these Details to the
   *  api call
   */
  SaveGazzateDetails()
    {
      
      this._GazetteDetailsDataModel.Result.Villages = this._GazetteDetailsDataModel.Result.Villages.map(i=>Number(i));
      console.log(this._GazetteDetailsDataModel.Result.Villages);
      if(this._GazetteDetailsDataModel.Result.typeOfNotification != null){
        let url = this.urlService.AddOrUpdateGazzateAPI;    
        this.httpService.CallBack = this.AddOrUpdateGazzateCallBack.bind(this);
      //let options :{} = this.utility.PrepareRequestHeaderWithToken();
        this.httpService.HttpPostRequest(url,this._GazetteDetailsDataModel.Result,null,null);  
      }else{
        alert("Please select type of notification and notification No.!!!")
      }
      
    }
   
    /**
    * @param dtas 
    */
  AddOrUpdateGazzateCallBack(dtas : HttpResponse<any>)
    {
      if (dtas != null)
        {
          let data : GazetteDetailsDataModel;
          data = dtas.body;    
          this._GazetteDetailsDataModel = data;
          this._DisabledInputField = true;           
        }
    }

  DeleteDocument(index)
    {
      this._GazetteDetailsDataModel.Result.Documents.splice(index, 1);
    }


  /**Delete Gazette Details */
  DeleteGazetteDetails()
    {
      let url = this.urlService.DeleteGazzateAPI;
      this.httpService.get(url, null).subscribe(response => {
        // this._ = response;
        // this.ReloadDatatable();
        // this.Utility.LogText(this._VillageModel);
      }, error => {
        this.Utility.LogText(error);
      });
    }

}
