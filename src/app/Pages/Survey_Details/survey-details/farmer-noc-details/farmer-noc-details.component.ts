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
  selector: 'app-farmer-noc-details',
  templateUrl: './farmer-noc-details.component.html',
  styleUrls: ['./farmer-noc-details.component.css']
})
export class FarmerNocDetailsComponent implements OnInit {
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it?";
  @Input() AllSurveyDetails : AllSurveyDetailsDataModel;
  @Input() SurveyNumber : any;
  @Output() Output:EventEmitter<any>= new EventEmitter(); 
  _AllSurveyDetails : AllSurveyDetailsDataModel;
  _ShowSurveyNOCDiv : boolean;
  _DisabledInputField : boolean = true;
  _SurveyFarmerNOCModel :SurveyFarmerNOCModel;
  _AddNewNOC : boolean = false;

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

    AddNewSurveyNOC()
      {
        if(this.SurveyNumber != null)
          {
            this._ShowSurveyNOCDiv = true;
            this._AddNewNOC = true;
            this._DisabledInputField = false;
            this._SurveyFarmerNOCModel  = new SurveyFarmerNOCModel();
          }
        else
          {
            alert("Please Select Survey Number!!");
          }
      }

    EditSurveyNOC()
      {
        this._AddNewNOC = false;
        this._DisabledInputField = false;
      }

    SaveDetails()
      {
        this._SurveyFarmerNOCModel.SurveyId = Number(this.SurveyNumber);
        let url = this.urlService.AddOrUpdateSurveyFarmerNOCAPI;     
        this.httpService.HttpPostRequest(url,this._SurveyFarmerNOCModel,this.AddOrUpdateNOCCallBack.bind(this),null);
      }
    AddOrUpdateNOCCallBack(dtas)
    {
      if (dtas != null)
        {
          let RespDataModel : NOCRespDataModel  = dtas;
          if (RespDataModel.StatusCode != 200) 
            {
              alert(RespDataModel.Message);
            }
          if (this._AddNewNOC == false)
            {
              alert("NOC Details updated sucessfully!!");
              this._SurveyFarmerNOCModel = RespDataModel.Result;
            }
          else
            {
              alert("NOC Details added sucessfully!!");
              this._SurveyFarmerNOCModel = RespDataModel.Result;
              this._AddNewNOC = false;
            }  
        }
        this._AddNewNOC = false;
        this._DisabledInputField = true;
    }

  DeleteSurveyNOC()
    {
      let url = this.urlService.DeleteSurveyFarmerNOCAPI + this._SurveyFarmerNOCModel.SurveyFarmerNocId + '&surveyId='+ this._SurveyFarmerNOCModel.SurveyId;
      this.httpService.get(url,null).subscribe(response => {
        let NOCDetails : any = response;
        if (NOCDetails.StatusCode != 200) 
          {
            alert(NOCDetails.Message);
          }
          else {
            alert("NOC Details deleted successfully!");
            this._SurveyFarmerNOCModel = NOCDetails.Result;
           
          }
        },error => {
          this.Utility.LogText(error);
        });
    }
}
