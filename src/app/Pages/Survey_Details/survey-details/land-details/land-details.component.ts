import { Component, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import {LandModel } from 'src/app/Model/Survey.model';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-land-details',
  templateUrl: './land-details.component.html',
  styleUrls: ['./land-details.component.css']
})

export class LandDetailsComponent implements OnInit {
  _DisabledInputField: boolean = true;
  _LandModel : LandModel;
  _AddNewLand : boolean = false;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it?";

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
    public Utility :UtilityService,
  ) {this._LandModel = new LandModel(); }
  

  ngOnInit(): void {
  
  }

  AddNewLandDetails()
    {
      this._AddNewLand = true;
      this._DisabledInputField = false;
    }

  EditLandDetails()
    {
      this._DisabledInputField = false;
    }

  DeleteLandDetails()
    {

    }
  SaveLandDetails()
    {

    }


}