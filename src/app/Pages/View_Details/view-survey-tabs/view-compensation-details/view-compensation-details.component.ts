import { Component,AfterViewInit, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';
import { SurveyDropDownsDataModel,AllSurveyDetailsDataModel,CompensationModel} from 'src/app/Model/Survey.model';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CommonDropdownModel} from 'src/app/Model/Base.model';

@Component({
  selector: 'app-view-compensation-details',
  templateUrl: './view-compensation-details.component.html',
  styleUrls: ['./view-compensation-details.component.css']
})
export class ViewCompensationDetailsComponent implements OnInit {
  _AllSurveyDetails : AllSurveyDetailsDataModel;
  @Input() AllSurveyDetails : AllSurveyDetailsDataModel;
  @Input() SurveyNumber : any;
  _CompensationModel : CompensationModel;
  /**data table properties  */
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  constructor(
    public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,) 
    {
      this._CompensationModel = new CompensationModel();
      this._AllSurveyDetails = new AllSurveyDetailsDataModel();
    }

  ngOnInit(): void 
    {
      this._AllSurveyDetails.Result.Trees = this.AllSurveyDetails.Result.Trees;
      this._AllSurveyDetails.Result.Crops = this.AllSurveyDetails.Result.Crops;
      this._AllSurveyDetails.Result.LandDetails = this.AllSurveyDetails.Result.LandDetails;
      this._AllSurveyDetails.Result.SurveyOwnersDrp = this.AllSurveyDetails.Result.SurveyOwnersDrp;
      this._CompensationModel = this.Utility.CalTotalCompensation(this._AllSurveyDetails.Result.LandDetails,this._AllSurveyDetails.Result.Crops,this._AllSurveyDetails.Result.Trees);
    }
  
  ngAfterViewInit(): void 
    {
      this.dtTrigger.next();
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