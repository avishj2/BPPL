import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { UtilityService } from 'src/app/services/utility.service';
import { HttpClient,HttpResponse, HttpHeaders } from "@angular/common/http";
import { CommonDropdownModel} from 'src/app/Model/Base.model';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { APIUtilityService } from 'src/app/services/APIUtility.service';
import { CommonService} from 'src/app/services/common.service';
import { GazzateDropDownsDataModel,GazetteDetailsDataModel ,GazetteModel,NotificationModel,NotificationDetailsDataModel, GazzetteDocuments} from 'src/app/Model/Gazette.model';

@Component({
  selector: 'app-view-gazette',
  templateUrl: './view-gazette.component.html',
  styleUrls: ['./view-gazette.component.css']
})
export class ViewGazetteComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  _ShowGazetteDetailsDiv : boolean = false;
  _ShowNotificationDetailsDiv : boolean = false;
  /**selected TypeOfNotification DD value save in this variable */
  _TypeOfNotification : any;
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
  _NotificationDocIndex : any;
  currentJustify = 'justified';//tab alignment 

  constructor(public urlService: UrlService,
    private router: Router,
    private httpService: HttpService,
    public Utility: UtilityService,
    private http: HttpClient,
    public APIUtilityService: APIUtilityService,
    public CommonService : CommonService) 
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

  ngAfterViewInit(): void 
    {
      this.dtTrigger.next();
    }
    /**refresh/reload data table 
     * when data update/delete/add in the datatable  
     * */
    ReloadDatatable(){
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
      if(this._GazetteModel.Gazzateid != null)
      {
        this.GetGazzateByGazzateID();
        this._ShowGazetteDetailsDiv = true
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
    
    
    downloadFile(documentId : number): any 
      {
        let url = this.urlService.DownloadGazzete + documentId;
        return this.http.get(url, {responseType: 'blob'});
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
      this.GetAllGazette();
      this._ShowNotificationDetailsDiv = true;
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
