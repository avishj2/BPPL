import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { UtilityService } from 'src/app/services/utility.service';
import { HttpClient,HttpResponse, HttpHeaders } from "@angular/common/http";
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { APIUtilityService } from 'src/app/services/APIUtility.service';
import { CommonService} from 'src/app/services/common.service';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';

@Component({
  selector: 'app-view-noticedeatils',
  templateUrl: './view-noticedeatils.component.html',
  styleUrls: ['./view-noticedeatils.component.css']
})
export class ViewNoticedeatilsComponent implements OnInit {
  _FilterControls: FilterControls;
  _SearchCriteria: SearchCriteria;
  /**data table properties  */
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  _ShowTableDiv : boolean = false;

  constructor(public urlService: UrlService,
    private router: Router,
    private httpService: HttpService,
    public Utility: UtilityService,
    private http: HttpClient,
    public APIUtilityService: APIUtilityService,
    public CommonService : CommonService) 
      {
        this._SearchCriteria = new SearchCriteria();
        this._FilterControls = new FilterControls();
        this.SetFilterControls();
      }

  /**hide/show filter menu based on the component requirement */
  SetFilterControls() 
    {
      this._FilterControls.ShowState = true;
      this._FilterControls.ShowDistrict = true;
      this._FilterControls.ShowTaluka = true;
      this._FilterControls.ShowVillage = true;
      this._FilterControls.ShowSearchBtn = true;
    }

  ngOnInit(): void 
    {

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
  ResetFilterValues(event)
    {
      
    }
    
  GetValuesFromFilters(event)
    {
      this._SearchCriteria = event;
      this._ShowTableDiv = true;
    }

}
