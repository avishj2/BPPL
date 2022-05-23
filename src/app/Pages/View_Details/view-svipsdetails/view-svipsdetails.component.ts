import { AfterViewInit,Component, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import {SVIPSRespModel , SVIPSModel,SVIPSDropDownsModel} from 'src/app/Model/SVIPS.model';
import { CommonDropdownModel,CommonDocDataModel} from 'src/app/Model/Base.model';
import { APIUtilityService } from 'src/app/services/APIUtility.service';

@Component({
  selector: 'app-view-svipsdetails',
  templateUrl: './view-svipsdetails.component.html',
  styleUrls: ['./view-svipsdetails.component.css']
})
export class ViewSVIPSDetailsComponent implements OnInit {
  _SVIPSModel : SVIPSModel;
  _SVIPSDropDownsModel : SVIPSDropDownsModel;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  IsDtInitialized: boolean = false;
  _VillageTaluka :CommonDropdownModel[];
  _SVIPSDetails :CommonDropdownModel[];
  _SVIPSDetailsId: any;
  _ShowDetailsDiv : boolean = false;

  constructor(
    public urlService: UrlService,
    public APIUtilityService: APIUtilityService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,) 
      { 
        this._SVIPSDropDownsModel  = new SVIPSDropDownsModel();
        this._SVIPSModel = new SVIPSModel();
      }

  ngOnInit(): void 
    {
      this.SVIPSDropDowns();
      this.PopulateVillageTaluka();
      this.GetAllSVIPSDetails();
    }

  ngAfterViewInit(): void 
    {
      this.dtTrigger.next();      
    }

  SVIPSDropDowns()
    {
      let url = this.urlService.GetSVIPSDropDownsAPI;
      this.httpService.get(url,null).subscribe(response => {
        this._SVIPSDropDownsModel  = response;
        },error => {
          this.Utility.LogText(error);
        });      
    }


  GetAllSVIPSDetails()
    {
      let url = this.urlService.GetAllSVIPSDetailsAPI;
      this.httpService.get(url,null).subscribe(response => {
        this._SVIPSDetails  = response;
        },error => {
          this.Utility.LogText(error);
        });      
    }

  /**get all Taluka and village details */
  PopulateVillageTaluka()
    {
      let url = this.urlService.GetAllTalukaVillagesAPI;
      this.httpService.get(url,null).subscribe(response => {
      this._VillageTaluka = response;
      },
      error => {
        this.Utility.LogText2("GetAllTalukaVillagesAPI error",error);
      });
    }

  GetSVIPSDetailsById()
    {
      if(this._SVIPSDetailsId != null)
        {
          let url = this.urlService.GetSVIPSDetailsByIdAPI + this._SVIPSDetailsId;
          this.httpService.get(url, null).subscribe(response => {
            this._SVIPSModel = response;        
            this._ShowDetailsDiv = true;
            this.ReloadDatatable();
          }, error => {
            this.Utility.LogText(error);
          }); 
        }      
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

  /**download crossing details document */
  DownlaodSVIPSDocument(doc : CommonDocDataModel)
    {
      let url = this.urlService.SVIPSDownloadAPI + doc.DocumentId;
      this.APIUtilityService.DownloadDocument(url);
    }
}
