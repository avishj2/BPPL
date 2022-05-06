import { AfterViewInit, Component, OnDestroy, OnInit,Input,Output,ViewChild,QueryList } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { APIUtilityService } from 'src/app/services/APIUtility.service';
import {SurveyModel,ChildControlModel ,SurveyDropDownsDataModel,SurveyResponeDataModel, AllSurveyDetailsDataModel } from 'src/app/Model/Survey.model';
import { CommonDropdownModel} from 'src/app/Model/Base.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-survey-tabs',
  templateUrl: './view-survey-tabs.component.html',
  styleUrls: ['./view-survey-tabs.component.css']
})
export class ViewSurveyTabsComponent implements OnInit {
  _FilterControls: FilterControls;
  _SearchCriteria: SearchCriteria;
  _SurveyDropDownsDataModel : SurveyDropDownsDataModel;
  _SurveyModel : SurveyModel;
  _AllSurveyDetails : AllSurveyDetailsDataModel;
  @ViewChild('tabset')
  tabset: any;
  @Input() public fromParent;
  _ShowPopModel : boolean = false;

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,
    public APIUtilityService: APIUtilityService,
    public activeModal: NgbActiveModal) 
      {
        this._SearchCriteria = new SearchCriteria();
        this._FilterControls = new FilterControls();
        this.SetFilterControls();
        this._SurveyModel = new SurveyModel();
        this._SurveyDropDownsDataModel = new SurveyDropDownsDataModel();
        this.GetSurveyDropDowns();
      }
    /**hide/show filter menu based on the component requirement */
    SetFilterControls() 
      {
        this._FilterControls.ShowState = true;
        this._FilterControls.ShowDistrict = true;
        this._FilterControls.ShowTaluka = true;
        this._FilterControls.ShowVillage = true;
        this._FilterControls.ShowSurneyNos = true;
        this._FilterControls.ShowSearchBtn = true;
      }
  ngOnInit(): void 
    {
      if(this.fromParent)
        {
          this.Utility.LogText2("Survey model", this.fromParent);
          this._ShowPopModel = this.fromParent.ShowModel; 
          this._SearchCriteria.SurveyName = this.fromParent.SurveyName
          this.GetSurveyDetailsByName(); 
        } 
    }

  GetSurveyDetailsByName()
    {
      this.CommonService.ShowSpinnerLoading();
      let url = this.urlService.GetSurveyDetailsByNameAPI + this.fromParent.SurveyName + +'&villageName='+this.fromParent.VillageName + '&tehsilName='+ this.fromParent.TehsilName;
      this.httpService.get(url,null).subscribe(response => {
        this._AllSurveyDetails  = response;
        if (this._AllSurveyDetails.StatusCode != 200) 
          {
            alert(this._AllSurveyDetails.Message);
            this.closeModal(null)
          }
          else {
            this._SurveyModel = this._AllSurveyDetails.Result.Survey;
          }
        this.CommonService.hideSpinnerLoading();
        },error => {
          this.Utility.LogText(error);
          this.CommonService.hideSpinnerLoading();
          this.closeModal(null)
        });
    }

  /**1. Get Values From Filters component and assign into SearchCriteria
  * 2. 
  */
  GetValuesFromFilters(event) 
  {
    this.Utility.LogText(event);
    this._SearchCriteria = event;
    if (Object.keys(this._SearchCriteria).length === 0) 
      {
        alert("Please Select State, District, taluka or village!!");
        return;
      }
    if(this._SearchCriteria.VillageId != null && this._SearchCriteria.SurveyID != null)
      {
        this._SurveyModel.SurveyId = this._SearchCriteria.SurveyID;
        this.tabset.select(0);
        this.GetSurveyDetailsById();
      }
    else{
      alert("Please Select Village and Survey Details!!");
    }
  }

  /**Get ALL Survey details DropDowns */
  GetSurveyDropDowns()
    {
      let url = this.urlService.GetSurveyDropDownsAPI;
      this.httpService.get(url, null).subscribe(response => {
        this._SurveyDropDownsDataModel.CropNames = response.CropNames;
        this._SurveyDropDownsDataModel.CultivateLandTypes = response.CultivateLandTypes;
        this._SurveyDropDownsDataModel.DamageNames = response.DamageNames;
        this._SurveyDropDownsDataModel.DamageTypes = response.DamageTypes;
        this._SurveyDropDownsDataModel.LandClassifications = response.LandClassifications;
        this._SurveyDropDownsDataModel.RevenueFormTypes = response.RevenueFormTypes;
        this._SurveyDropDownsDataModel.SeasonNameTypes = response.SeasonNameTypes;
        this._SurveyDropDownsDataModel.SurveyLandTypes = response.SurveyLandTypes;
        this._SurveyDropDownsDataModel.TreeNames = response.TreeNames;
        this._SurveyDropDownsDataModel.TreeRanges = response.TreeRanges;
        this._SurveyDropDownsDataModel.AwardTypes = response.AwardTypes;
        this._SurveyDropDownsDataModel.OwnerTypes = response.OwnerTypes;
        this.Utility.LogText(this._SurveyDropDownsDataModel);
        this._SurveyDropDownsDataModel.SurveyID = this._SearchCriteria.SurveyID;
      }, error => {
        this.Utility.LogText(error);
      });
    }

  ActiveTab(evt)
    {
      this.Utility.LogText2('ActiveTab ID=>', evt.nextId)
    }

  ResetFilterValues(event)
  {
    
  }

  /**get survey and all tabs details based on survey Number*/
  GetSurveyDetailsById()
    {
      this.CommonService.ShowSpinnerLoading();
      let url = this.urlService.GetSurveyDetailsByIdAPI + this._SurveyModel.SurveyId;
      this.httpService.get(url,null).subscribe(response => {
        this._AllSurveyDetails  = response;
        if (this._AllSurveyDetails.StatusCode != 200) 
          {
            alert(this._AllSurveyDetails.Message);
          }
          else {
            this._SurveyModel = this._AllSurveyDetails.Result.Survey;
          }
        this.CommonService.hideSpinnerLoading();
        },error => {
          this.Utility.LogText(error);
          this.CommonService.hideSpinnerLoading();
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

      /**after click on top right side of model it excute */
  closeModal(sendData) 
    {
      this.activeModal.close(sendData);
    }
}
