import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { SurveyDropDownsDataModel} from 'src/app/Model/Survey.model';

@Component({
  selector: 'app-revenue-form',
  templateUrl: './revenue-form.component.html',
  styleUrls: ['./revenue-form.component.css']
})

export class RevenueFormComponent implements OnInit {
  _DisabledInputField: boolean = false;
  _AddNewOwner : boolean;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it ?";
  @Input() SurveyDropDownsData : SurveyDropDownsDataModel;
  @Output() Output:EventEmitter<any>= new EventEmitter();
  
  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,) { }

  ngOnInit(): void {
    console.log("FromParentData=>",this.SurveyDropDownsData);
  }
  
  onChangeDocument(event){

  }

}
