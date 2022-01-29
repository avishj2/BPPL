import { Component,AfterViewInit, OnInit,ViewChild } from '@angular/core';
import {  NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ModelServiceService } from 'src/app/services/model-service.service';
import { AGITerminalsDataModel} from 'src/app/Pages/Survey_Details/Survey_Details.model';
import { SearchCriteria, FilterControls} from 'src/app/Model/Filters.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { HttpService } from '../../../services/http.service';


@Component({
  selector: 'app-terminals-details',
  templateUrl: './terminals-details.component.html',
  styleUrls: ['./terminals-details.component.css']
})
export class TerminalsDetailsComponent implements OnInit {
  DisableInputField : boolean = true;
  _AGITerminalsDataModel : AGITerminalsDataModel;
  /**enable/disable input fields variables*/
  _DisabledInputField: boolean = true;

  _FilterControls : FilterControls;

  constructor(public urlService: UrlService,
    private router: Router,
    private httpService: HttpService,
    public Utility :UtilityService
    )
    {
      this._AGITerminalsDataModel = new AGITerminalsDataModel();
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
        this._FilterControls.ShowSurneyNos = true;
      }
    

  ngOnInit(): void {

  }
 
  GetValuesFromFilters(event)
    {
      this.Utility.LogText(event);
      this._DisabledInputField = true;
    }

  /**
   *  
   * */  
  EditTerminalDetails()
    {
      this._DisabledInputField = false;
    }

  /***
   * 
   */
  AddNewTerminalDetails()
    {
      this._DisabledInputField = false;
    }
}
