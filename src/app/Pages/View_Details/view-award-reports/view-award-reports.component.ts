import { AfterViewInit, Component, OnDestroy, OnInit,Input,Output,ViewChild,QueryList } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import {SurveyDocDropDownsDataModel,CommonReportsDataModel } from 'src/app/Model/SurveyDocument.model';
import {BaseResponse, CommonDropdownModel,CommonDocDataModel} from 'src/app/Model/Base.model';
import { APIUtilityService } from 'src/app/services/APIUtility.service';

@Component({
  selector: 'app-view-award-reports',
  templateUrl: './view-award-reports.component.html',
  styleUrls: ['./view-award-reports.component.css']
})
export class ViewAwardReportsComponent implements AfterViewInit, OnInit {
 /**data table properties  */
 @ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;
 dtOptions: DataTables.Settings = {};
 dtTrigger: Subject<any> = new Subject();
 /**REFERSH DATATABLE  */
 IsDtInitialized: boolean = false;
 _AwardMutations : CommonReportsDataModel[];
 _FilterControls: FilterControls;
 _SearchCriteria: SearchCriteria;
 _SurveyDocDropDownsDataModel : SurveyDocDropDownsDataModel;
  _ShowTable : boolean = false;
  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,
    public APIUtilityService: APIUtilityService,) 
      {
        this._AwardMutations = [];
        this._SearchCriteria = new SearchCriteria();
        this._FilterControls = new FilterControls();
        this.SetFilterControls();
        this._SurveyDocDropDownsDataModel = new SurveyDocDropDownsDataModel();
      }
  /**hide/show filter menu based on the component requirement */
  SetFilterControls() 
    {
      this._FilterControls.ShowState = true;
      this._FilterControls.ShowDistrict = true;
      this._FilterControls.ShowTaluka = true;
      this._FilterControls.ShowVillage = true;
      this._FilterControls.ShowSurneyNos = false;
      this._FilterControls.ShowChainageFrom = false;
      this._FilterControls.ShowChainageTo = false;
      this._FilterControls.ShowSearchBtn = true;
    }
  ngOnInit(): void 
    {
      this.GetSurveyDocumentDropDowns();
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

  /**get value from child component */
  GetValuesFromFilters(event) 
    {
      this.Utility.LogText2("view-award-reports",event);
      this._SearchCriteria = event;
      if(this._SearchCriteria.VillageId != null)
        {
          this.GetAwardAndMutations();
          this._ShowTable = true;
        }
      else
        {
          alert("Please select village!!")
        }
    }
    
  ResetFilterValues(event)
    {
      
    }

  /**Get Survey Document DropDowns values*/
  GetSurveyDocumentDropDowns()
  {
    let url = this.urlService.GetSurveyDocumentDropDowns;
    this.httpService.get(url,null).subscribe(response => {
      this._SurveyDocDropDownsDataModel  = response;
      },error => {
        this.Utility.LogText(error);
      });
  }

  GetAwardAndMutations()
    {
      this.CommonService.ShowSpinnerLoading();
      let url = this.urlService.GetAwardAndMutationsAPI + this._SearchCriteria.VillageId;
      this.httpService.get(url,null).subscribe(response => {
        this._AwardMutations  = response;
        this.CommonService.hideSpinnerLoading();
        this.ReloadDatatable();        
        },error => {
          this.Utility.LogText(error);
          this.CommonService.hideSpinnerLoading();
        });        
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

  DownloadAwardDoc(arg)
    {
      let url = this.urlService.DownloadAwardAndMutationsAPI + arg.DocumentId;
      this.APIUtilityService.DownloadDocument(url);
    }
}
