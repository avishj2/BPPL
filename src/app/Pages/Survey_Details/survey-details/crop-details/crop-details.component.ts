import { AfterViewInit,Component, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { SurveyDropDownsDataModel,AllSurveyDetailsDataModel,CropDataModel,CropRespDataModel} from 'src/app/Model/Survey.model';
import { CommonDropdownModel} from 'src/app/Model/Base.model';

@Component({
  selector: 'app-crop-details',
  templateUrl: './crop-details.component.html',
  styleUrls: ['./crop-details.component.css']
})
export class CropDetailsComponent implements AfterViewInit, OnInit {
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it?";
  @Input() SurveyDropDownsData : SurveyDropDownsDataModel;
  @Input() AllSurveyDetails : AllSurveyDetailsDataModel;
  @Input() SurveyNumber : any;
  @Output() Output:EventEmitter<any>= new EventEmitter(); 
  @ViewChild('closebutton') closebutton;
  _PopupTitle : string;
   /**data table properties  */
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;

  _AddNewCropDetails : boolean;
  _CropDataModel :CropDataModel
  _AllSurveyDetails : AllSurveyDetailsDataModel;

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,
    )
      { 
        this._CropDataModel = new CropDataModel();
        this._AllSurveyDetails = new AllSurveyDetailsDataModel();
      }

  ngOnInit(): void {
      this.dtOptions = 
      {
        pagingType: 'full_numbers',
        pageLength: 5,
      };
      this.Utility.LogText2("FromParentData=>",this.SurveyDropDownsData);
      this._AllSurveyDetails.Result.Crops = this.AllSurveyDetails.Result.Crops;
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

  AddNewCropDetails()
    {
      if(this.SurveyNumber != null)
        {
          this._AddNewCropDetails = true;
          this._PopupTitle = "Add Crop Details";
          this._CropDataModel = new CropDataModel();
        }
        else
          {
            alert("Please Select Survey Number!!");
          }
    }
  EditCropDetails(arg)
    {
      this._CropDataModel = arg;
      this._PopupTitle = "Edit Crop Details";
      this._AddNewCropDetails = false;
    }

  SaveDetails()
    {
      this.CommonService.ShowSpinner();
      this._CropDataModel.SurveyId = this.SurveyNumber;
      let url = this.urlService.AddOrUpdateSurveyCropAPI;     
      this.httpService.HttpPostRequest(url,this._CropDataModel,this.AddOrUpdateCropCallBack.bind(this),null);
    }

  AddOrUpdateCropCallBack(dtas)
    {
      if (dtas != null)
        {
          let RespDataModel : CropRespDataModel  = dtas;
          if (RespDataModel.StatusCode != 200) 
            {
              alert(RespDataModel.Message);
            }
          if (this._AddNewCropDetails == false)
            {
              alert("Crop updated sucessfully!!");
              this._AllSurveyDetails.Result.Crops = RespDataModel.Result;
              this.closebutton.nativeElement.click();
            }
          else
            {
              alert("Crop added sucessfully!!");
              this._AllSurveyDetails.Result.Crops = RespDataModel.Result;
              this._AddNewCropDetails = false;
              this.closebutton.nativeElement.click();
            }  
          this.SetParentData();  
          this.ReloadDatatable();   
        }
        this._AddNewCropDetails = false;
    }

  SetParentData()
    {
      this.AllSurveyDetails.Result.Crops = this._AllSurveyDetails.Result.Crops
    }

  DeleteCropDetails(arg)
    {
      this.CommonService.ShowSpinner();
      let url = this.urlService.DeleteSurveyCropAPI + arg.SurveyCropId + '&surveyId='+ arg.SurveyId;
      this.httpService.get(url,null).subscribe(response => {
        let CropDetails : any = response;
        if (CropDetails.StatusCode != 200) 
          {
            alert(CropDetails.Message);
          }
          else {
            alert("Crops Details deleted successfully!");
            this._AllSurveyDetails.Result.Crops = response.Result;
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
