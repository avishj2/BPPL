import { AfterViewInit,Component, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CommonDropdownModel} from 'src/app/Model/Base.model';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import {CrossingModel } from 'src/app/Model/Crossing.model';
import { ChildViewCrossingComponent} from '../view-crossing-details/child-view-crossing/child-view-crossing.component';


@Component({
  selector: 'app-view-crossing-details',
  templateUrl: './view-crossing-details.component.html',
  styleUrls: ['./view-crossing-details.component.css']
})
export class ViewCrossingDetailsComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  _PopupTitle : string;
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  _FilterControls :FilterControls;
  _SearchCriteria : SearchCriteria;
  _CrossingDataModel : CrossingModel;
  _ShowChildViewpage : boolean = false;
  @ViewChild(ChildViewCrossingComponent) child: ChildViewCrossingComponent;
  _FirstLoad : boolean = false;

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,) 
      { 
        this._FilterControls = new FilterControls();
        this._SearchCriteria = new SearchCriteria();
        this.SetFilterControls();
        this._CrossingDataModel = new CrossingModel();
      }
  /**hide/show filter menu based on the component requirement */
  SetFilterControls() 
    {
      this._FilterControls.ShowState = false;
      this._FilterControls.ShowDistrict = false;
      this._FilterControls.ShowTaluka = false;
      this._FilterControls.ShowChainageFrom = false;
      this._FilterControls.ShowChainageTo = false;
      this._FilterControls.ShowVillage = false;
      this._FilterControls.ShowCrossingTypes = true;
      this._FilterControls.ShowCrossingNumber = true;
      this._FilterControls.ShowSearchBtn = true;
    }

  ngOnInit(): void {

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

    /**get value from filter component */
  GetValuesFromFilters(event) 
    {
      this.Utility.LogText(event);
      this._SearchCriteria = event;
      if(this._SearchCriteria.CrossingID != null)
        {
          this._ShowChildViewpage = true;
          if(this._FirstLoad == true)
          {
            this.child.reRender();
          }
        }
        if(this._SearchCriteria.CrossingType != null && this._SearchCriteria.CrossingID == null) 
        {
          this._ShowChildViewpage = false;
        }
        if(this._SearchCriteria.CrossingType == null)
        {
          alert("Please select Crossing details!!")
        }
        this._FirstLoad = true;
    }
}
