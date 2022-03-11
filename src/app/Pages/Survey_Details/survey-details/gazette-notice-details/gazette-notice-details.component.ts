import { Component, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-gazette-notice-details',
  templateUrl: './gazette-notice-details.component.html',
  styleUrls: ['./gazette-notice-details.component.css']
})
export class GazetteNoticeDetailsComponent implements OnInit {
/**data table properties  */
@ViewChild(DataTableDirective, {static: false})
dtElement: DataTableDirective;
dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();
/**REFERSH DATATABLE  */
IsDtInitialized: boolean = false;

_DisabledInputField: boolean = false;
_AddNewDetails : boolean;
/**popup message variables */
popoverTitle ="Delete Details";
popoverMessage = "Are you sure you want to delete it ?";

  constructor() { }

  ngOnInit(): void {
    
  }

}
