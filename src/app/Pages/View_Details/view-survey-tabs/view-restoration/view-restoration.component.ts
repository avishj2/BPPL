import { AfterViewInit,Component, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { SurveyDropDownsDataModel,AllSurveyDetailsDataModel,RestorationDataModel} from 'src/app/Model/Survey.model';
import { CommonDropdownModel} from 'src/app/Model/Base.model';

@Component({
  selector: 'app-view-restoration',
  templateUrl: './view-restoration.component.html',
  styleUrls: ['./view-restoration.component.css']
})
export class ViewRestorationComponent implements OnInit {
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
  _RestorationDataModel :RestorationDataModel;
  _AllSurveyDetails : AllSurveyDetailsDataModel;


  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,) 
      {
        this._RestorationDataModel = new RestorationDataModel();
        this._AllSurveyDetails = new AllSurveyDetailsDataModel();
      }

  ngOnInit(): void {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        scrollX: true, //enable horizontal scrolling in the table
        scrollCollapse: true,
      }
      this._RestorationDataModel.SurveyId = this.SurveyNumber;
      this._AllSurveyDetails.Result.RestorationDetails = this.AllSurveyDetails.Result.RestorationDetails;
      this._AllSurveyDetails.Result.SurveyOwnersDrp = this.AllSurveyDetails.Result.SurveyOwnersDrp;
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

