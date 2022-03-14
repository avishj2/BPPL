import { Component, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import {LandModel,SurveyDropDownsDataModel } from 'src/app/Model/Survey.model';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-restoration-details',
  templateUrl: './restoration-details.component.html',
  styleUrls: ['./restoration-details.component.css']
})
export class RestorationDetailsComponent implements OnInit {
  _DisabledInputField: boolean = false;
  _AddNewDetails : boolean;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it ?";
  /**data table properties  */
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  @Input() SurveyDropDownsData : SurveyDropDownsDataModel;
  @Output() Output:EventEmitter<any>= new EventEmitter();
  _PopupTitle : string;

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,) { }

    ngOnInit(): void {
    
    }

  AddNewRestorationDetails()
    {
      this._PopupTitle = "Add Restoration Details"
    } 


  EditRestorationDetails()
    {
      this._PopupTitle = "Edit Restoration Details"
    }


  DeleteRestorationDetails()
    {

    }

    SaveDetails(){
      
    }
}
