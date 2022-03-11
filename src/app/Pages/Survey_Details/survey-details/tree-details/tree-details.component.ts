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
  selector: 'app-tree-details',
  templateUrl: './tree-details.component.html',
  styleUrls: ['./tree-details.component.css']
})
export class TreeDetailsComponent implements OnInit {
  _DisabledInputField: boolean = false;
  _AddNewTree : boolean;
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
      public Utility :UtilityService,) { }

  ngOnInit(): void {

  }

  AddNewTreeDetails(){

  }
  EditTreeDetails(){

  }

  DeleteTreeDetails(){

  }

  SaveTreeDetails(){

  }

}
