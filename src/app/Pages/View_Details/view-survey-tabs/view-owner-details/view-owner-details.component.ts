import { AfterViewInit,Component, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { SurveyDropDownsDataModel,AllSurveyDetailsDataModel,SurveyOwnerModel} from 'src/app/Model/Survey.model';
import { CommonDropdownModel} from 'src/app/Model/Base.model';


@Component({
  selector: 'app-view-owner-details',
  templateUrl: './view-owner-details.component.html',
  styleUrls: ['./view-owner-details.component.css']
})
export class ViewOwnerDetailsComponent implements OnInit {
  @Input() SurveyDropDownsData : SurveyDropDownsDataModel;
  @Input() AllSurveyDetails : AllSurveyDetailsDataModel;
  @Input() SurveyNumber : any;
  @ViewChild(DataTableDirective, {static: false})
  _PopupTitle : string;
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  _SurveyOwnerModel :SurveyOwnerModel
  _AllSurveyDetails : AllSurveyDetailsDataModel;


  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,) 
      {
        this._SurveyOwnerModel = new SurveyOwnerModel();
        this._AllSurveyDetails = new AllSurveyDetailsDataModel();
      }

  ngOnInit(): void 
    {
      this.dtOptions = 
        {
          pagingType: 'full_numbers',
          pageLength: 5,
          //scrollX: true, //enable horizontal scrolling in the table
          //scrollCollapse: true,
        }
      // console.log("Owner FromParentData=>", this.SurveyDropDownsData);
      // console.log("Owner AllSurveyDetails=>",this.AllSurveyDetails)
      this._SurveyOwnerModel.SurveyId = this.SurveyNumber;
      this._AllSurveyDetails.Result.SurveyOwners = this.AllSurveyDetails.Result.SurveyOwners;
      this.ReloadDatatable();
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

  ngAfterViewInit(): void 
    {
      this.dtTrigger.next();
    }

    GetLookupValue(lookups : CommonDropdownModel[], lookUpid: Number) : any
      {
        let object = lookups.find(elm=>elm.Value == lookUpid );
        if(object)
        {
          return object.Text;
        }
        else { return lookUpid;}
      }

}
