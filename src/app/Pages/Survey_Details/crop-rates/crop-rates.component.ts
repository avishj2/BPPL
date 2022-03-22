import { AfterViewInit,Component, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SurveyDropDownsDataModel,AllSurveyDetailsDataModel,CropDataModel,CropRespDataModel} from 'src/app/Model/Survey.model';
import { CommonDropdownModel} from 'src/app/Model/Base.model';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';

@Component({
  selector: 'app-crop-rates',
  templateUrl: './crop-rates.component.html',
  styleUrls: ['./crop-rates.component.css']
})
export class CropRatesComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  _PopupTitle : string;
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;

  _FilterControls: FilterControls;
  _SearchCriteria: SearchCriteria;

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,)
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
      this._FilterControls.ShowSurneyNos = false;
      this._FilterControls.ShowSearchBtn = true;
    }
  ngOnInit(): void {
  }
  AddNewCropDetails(){
    
  }

}
