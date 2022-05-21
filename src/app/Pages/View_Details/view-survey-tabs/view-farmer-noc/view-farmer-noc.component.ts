import { AfterViewInit,Component, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { SurveyDropDownsDataModel,AllSurveyDetailsDataModel,SurveyFarmerNOCModel,NOCRespDataModel} from 'src/app/Model/Survey.model';
import { CommonDropdownModel} from 'src/app/Model/Base.model';

@Component({
  selector: 'app-view-farmer-noc',
  templateUrl: './view-farmer-noc.component.html',
  styleUrls: ['./view-farmer-noc.component.css']
})
export class ViewFarmerNocComponent implements OnInit {
  @Input() AllSurveyDetails : AllSurveyDetailsDataModel;
  @Input() SurveyNumber : any;
  @Output() Output:EventEmitter<any>= new EventEmitter(); 
  _AllSurveyDetails : AllSurveyDetailsDataModel;
  _SurveyFarmerNOCModel :SurveyFarmerNOCModel;
  _ShowSurveyNOCDiv : boolean;

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,) 
      { 
        this._AllSurveyDetails = new AllSurveyDetailsDataModel();
        this._SurveyFarmerNOCModel  = new SurveyFarmerNOCModel();
      }


  ngOnInit(): void 
    {
      if(this.AllSurveyDetails.Result.SurveyFarmerNOCModels != null)
        {
          this._ShowSurveyNOCDiv = true;
          this.Utility.LogText2("Noc Data=>",this.AllSurveyDetails.Result.SurveyFarmerNOCModels);
          this._SurveyFarmerNOCModel = this.AllSurveyDetails.Result.SurveyFarmerNOCModels;
        }
        else{
          this._ShowSurveyNOCDiv = false;
        }
      
    }
}
