import { Component, OnInit ,Input, Output,EventEmitter,ViewChild,OnChanges,SimpleChanges} from '@angular/core';
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
import { SearchCriteria, FilterControls,CrossingDropdownDataModel } from 'src/app/Model/Filters.model';
import {CrossingModel } from 'src/app/Model/Crossing.model';

@Component({
  selector: 'app-child-view-crossing',
  templateUrl: './child-view-crossing.component.html',
  styleUrls: ['./child-view-crossing.component.css']
})
export class ChildViewCrossingComponent implements OnInit,OnChanges {
  @Input() filterdata :SearchCriteria;
  _CrossingDataModel : CrossingModel;
  _CrossingDropdowns :CrossingDropdownDataModel;

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,) 
      {
        this._CrossingDataModel = new CrossingModel();
        this._CrossingDropdowns = new CrossingDropdownDataModel();
      }

  ngOnInit(): void 
    {
      this.PopulateCrossingDropdowns();  
    }

    ngOnChanges(changes: SimpleChanges)
    {
      this.Utility.LogText2("2nd child",this.filterdata);
      if(this.filterdata.CrossingID !=null)
      {
        this.GetCrossingDatabyId();
      }
    }

  /** get Crossing Dropdown values*/
  PopulateCrossingDropdowns()
    {
      let url = this.urlService.GetCrossingDropDownsAPI;
      this.httpService.get(url,null).subscribe(response => {
        this._CrossingDropdowns = response;
        },
        error => {
          this.Utility.LogText(error);
        });
    }

  /***
   * Get CROSSING details By ID 
   */
  GetCrossingDatabyId()
    {
      let url = this.urlService.GetCrossingByIdAPI + this.filterdata.CrossingID;
      this.httpService.get(url, null).subscribe(response => {
        this._CrossingDataModel = response;
      }, error => {
        this.Utility.LogText(error);
      }); 
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
}
