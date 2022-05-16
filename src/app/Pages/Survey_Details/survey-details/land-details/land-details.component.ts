import { Component,AfterViewInit, OnInit, Input,OnChanges, Output,EventEmitter,ViewChild,ViewChildren } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { SurveyDropDownsDataModel,AllSurveyDetailsDataModel,LandDataModel,LandRespDataModel} from 'src/app/Model/Survey.model';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CommonDropdownModel,BaseResponse} from 'src/app/Model/Base.model';

@Component({
  selector: 'app-land-details',
  templateUrl: './land-details.component.html',
  styleUrls: ['./land-details.component.css']
})

export class LandDetailsComponent implements AfterViewInit, OnInit {
  _LandDataModel : LandDataModel;
  _AddNewLand : boolean = false;
  _PopupTitle : string;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it?";
  @Input() SurveyDropDownsData : SurveyDropDownsDataModel;
  @Input() AllSurveyDetails : AllSurveyDetailsDataModel;
  @Input() SurveyNumber : any;
  @Output() Output:EventEmitter<any>= new EventEmitter(); 
  @ViewChild('closebutton') closebutton;
  /**data table properties  */
  @ViewChild(DataTableDirective, {static: false})
  //@ViewChildren(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  _AllSurveyDetails : AllSurveyDetailsDataModel;

  constructor(
    public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,
    ) {
      this._LandDataModel = new LandDataModel();
      this._AllSurveyDetails = new AllSurveyDetailsDataModel();
    }
  

  ngOnInit() 
  {
    this.dtOptions = 
      {
        pagingType: 'full_numbers',
        pageLength: 5,
        language: {emptyTable : "No Lands!!"}
      };
    this.Utility.LogText2("tdtgrg=>", this.SurveyDropDownsData);
    this.Utility.LogText2("land AllSurveyDetails=>",this.AllSurveyDetails)
    this._LandDataModel.SurveyId = this.SurveyNumber;
    this._AllSurveyDetails.Result.LandDetails = this.AllSurveyDetails.Result.LandDetails;
    this._AllSurveyDetails.Result.SurveyOwnersDrp = this.AllSurveyDetails.Result.SurveyOwnersDrp;
    this.ReloadDatatable();
    
  }
  ngAfterViewInit(): void 
    {
      this.dtTrigger.next();
    }

  /**refresh/reload data table 
  *when data update/delete/add in the datatable  
  **/
  ReloadDatatable()
  {
    /**initialized datatable */
    if (this.IsDtInitialized) 
      {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => 
        {
          dtInstance.destroy();//Destroy the table first
          this.dtTrigger.next();//Call the dtTrigger to rerender again
        });
      }
    else
      {
        this.IsDtInitialized = true;
        this.dtTrigger.next();
      }
  }

  AddNewLandDetails()
    {
      if(this.SurveyNumber != null){
        this._AddNewLand = true;
        this._PopupTitle = "Add Land Details";
        this._LandDataModel = new LandDataModel(); 
      }
      else
        {
          alert("Please Select Survey Number!!");
        }
    }

  EditLandDetails(arg)
    {
      this._LandDataModel = arg;
      this._PopupTitle = "Edit Land Details";
      //this.GetLookupValue(this.SurveyDropDownsData.LandClassifications, this._LandDataModel.LandType);
    }

  SaveLandDetails()
    {
      this.CommonService.ShowSpinner();
      this._LandDataModel.SurveyId = this.SurveyNumber;
      let url = this.urlService.AddOrUpdateSurveyLandAPI;     
      this.httpService.HttpPostRequest(url,this._LandDataModel,this.AddOrUpdateLandCallBack.bind(this),null);
    }

  AddOrUpdateLandCallBack(dtas)
    {
      if (dtas != null)
        {
          let RespDataModel : LandRespDataModel  = dtas;
          if (RespDataModel.StatusCode != 200) 
            {
              alert(RespDataModel.Message);
            }
          if (this._AddNewLand == false)
            {
              alert("Survey Land updated sucessfully!!");
              this._AllSurveyDetails.Result.LandDetails = RespDataModel.Result;
              this.SetParentData();
              this.closebutton.nativeElement.click();
              this.ReloadDatatable();
            }
          else
            {
              alert("Survey Land added sucessfully!!");
              this._AllSurveyDetails.Result.LandDetails = RespDataModel.Result;
              this._AddNewLand = false;
              this.SetParentData();
              this.closebutton.nativeElement.click();
              this.ReloadDatatable();
            }   
        }
        this._AddNewLand = false;
        
    }


  SetParentData()
    {
      this.AllSurveyDetails.Result.LandDetails = this._AllSurveyDetails.Result.LandDetails
    }

  DeleteLandDetails(arg)
    {
      let url = this.urlService.DeleteSurveyLandAPI + arg.SurveyLandId + '&surveyId='+ arg.SurveyId;
      this.httpService.get(url,null).subscribe(response => {
        let LandDetails : any = response;
        if (LandDetails.StatusCode != 200) 
          {
            alert(LandDetails.Message);
          }
          else {
            alert("Land Details deleted successfully!");
            this._AllSurveyDetails.Result.LandDetails = response.Result;
            this.SetParentData();
            this.ReloadDatatable();
          }
        },error => {
          this.Utility.LogText(error);
        });
    }


  GetLookupValue(lookups : CommonDropdownModel[], lookUpid: Number) : any
    {
      let object = lookups.find(elm=>elm.Value == lookUpid );
      if(object)
      {
        return object.Text;
      }
      else { return lookUpid;}
    }
}
