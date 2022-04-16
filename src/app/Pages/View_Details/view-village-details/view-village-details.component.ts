import { AfterViewInit, Component,ElementRef, OnInit,Input,Output, ViewChild ,QueryList, ViewChildren} from '@angular/core';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { APIUtilityService } from 'src/app/services/APIUtility.service';
import { VillageSummaryReqModel,ViewVillageModel } from 'src/app/Model/Village.model';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-view-village-details',
  templateUrl: './view-village-details.component.html',
  styleUrls: ['./view-village-details.component.css']
})
export class ViewVillageDetailsComponent implements OnInit {
  _FilterControls: FilterControls;
  _SearchCriteria: SearchCriteria;
  _ViewVillageModel : ViewVillageModel;
  _VillageSummaryReqModel : VillageSummaryReqModel;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  _ShowDetailsDiv : boolean = false;

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,
    public APIUtilityService: APIUtilityService,)
    {
      this._SearchCriteria = new SearchCriteria();
      this._FilterControls = new FilterControls();
      this.SetFilterControls();
      this._VillageSummaryReqModel = new VillageSummaryReqModel();
      this._ViewVillageModel = new ViewVillageModel();
    }

  /**hide/show filter menu based on the component requirement */
  SetFilterControls() 
    {
      this._FilterControls.ShowState = true;
      this._FilterControls.ShowDistrict = true;
      this._FilterControls.ShowTaluka = true;  
      this._FilterControls.ShowSearchBtn = true;
    }

  ngOnInit(): void {
    this.dtOptions = 
    {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
  }

  ngAfterViewInit(): void 
    {
      this.dtTrigger.next();
    }
  /**refresh/reload data table 
   * when data update/delete/add in the datatable  
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

  GetValuesFromFilters(event)
  {
    this._SearchCriteria = event;
    if(!(this._SearchCriteria && this._SearchCriteria.TalukaId ==null))
      {
        //this.IsDtInitialized = true;
        this._ShowDetailsDiv = true;
        this.GetVillageSummary();
      }
      else{
        alert("Please Select Tahsil!!");
      }
  }

  GetVillageSummary()
    {
      let url = this.urlService.GetVillageSummaryAPI;
      this._VillageSummaryReqModel.StartChainage = this._SearchCriteria.ChainageFrom;
      this._VillageSummaryReqModel.EndChainage = this._SearchCriteria.ChainageTo;
      this._VillageSummaryReqModel.TalukaId = this._SearchCriteria.TalukaId;
      this.httpService.HttpPostRequest(url,this._VillageSummaryReqModel,this.VillageSummaryCallBack.bind(this),null);
    }

    VillageSummaryCallBack(dtas)
      {
        if(dtas!= null)
        {
          this._ViewVillageModel = dtas;
        }
        this.ReloadDatatable();
      }

}
