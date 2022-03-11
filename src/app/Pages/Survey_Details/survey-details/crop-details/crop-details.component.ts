import { Component, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';
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


@Component({
  selector: 'app-crop-details',
  templateUrl: './crop-details.component.html',
  styleUrls: ['./crop-details.component.css']
})
export class CropDetailsComponent implements OnInit {
  /**data table properties  */
// @ViewChild(DataTableDirective, {static: false})
@ViewChild('closebutton') closebutton;

dtElement: DataTableDirective;
dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();
/**REFERSH DATATABLE  */
IsDtInitialized: boolean = false;
  _AddNewCropDetails : boolean;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it ?";
  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,
    private fb: FormBuilder,
    ) { }

    public ngOnInit(): void {


  }
  AddNewCropDetails(){

  }
  EditCropDetails(){

  }
  DeleteCropDetails(){
    
  }

  public SaveDetails(){
    this.closebutton.nativeElement.click();
  }
}