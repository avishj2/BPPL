import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { UtilityService } from 'src/app/services/utility.service';
import {SurveyModel,ChildControlModel ,SurveyDropDownsDataModel,SurveyResponeDataModel, AllSurveyDetailsDataModel } from 'src/app/Model/Survey.model';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CommonDropdownModel} from 'src/app/Model/Base.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.css']
})
export class SurveyDetailsComponent implements OnInit {
  _FilterControls: FilterControls;
  _SearchCriteria: SearchCriteria;
  _ChildControlModel : ChildControlModel;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it ?";
  _AddNewSurveyDetails: boolean = false;
  _ShowSurveyDetailsDiv: boolean = false;
  _DisabledInputField: boolean = true;
  _SurveyModel : SurveyModel;
  _SurveyDropDownsDataModel : SurveyDropDownsDataModel;
  _AllSurveyDetails : AllSurveyDetailsDataModel
  _ActivetabTitle : string = "Survey- ";

  @ViewChild('tabset')
  tabset: any;

  constructor(public urlService: UrlService,
    private router: Router,
    private httpService: HttpService,
    public Utility: UtilityService,
    public CommonService :CommonService ) 
    {
      this._SearchCriteria = new SearchCriteria();
      this._FilterControls = new FilterControls();
      this._ChildControlModel = new ChildControlModel();
      this.SetFilterControls();
      this._SurveyModel = new SurveyModel();
      this._SurveyDropDownsDataModel = new SurveyDropDownsDataModel();
      this.GetSurveyDropDowns();
      //this._SurveyDropDownsDataModel.SurveyID = this._SearchCriteria.SurveyID;
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

      //this._DisabledInputField = false;
    }



  /**1. Get Values From Filters component and assign into SearchCriteria
  * 2. 
  */
  GetValuesFromFilters(event) 
    {
      this._ActivetabTitle = "Survey- " + this._SearchCriteria.VillageName;
      this.Utility.LogText(event);
      this._SearchCriteria = event;
      if (Object.keys(this._SearchCriteria).length === 0) 
      {
        // this.CommonService.hideSpinnerLoading();
        alert("Please Select State, District, taluka or village!!");
      }      
      if(this._SearchCriteria.VillageId != null && this._SearchCriteria.SurveyID != null){
        this._ShowSurveyDetailsDiv = true;
        this._AddNewSurveyDetails = false;
        this._DisabledInputField = true;
        this._SurveyModel.SurveyId = this._SearchCriteria.SurveyID;
        this.tabset.select(0);
        this.GetSurveyDetailsById();
      }
      else{
        alert("Please Select Village and Survey Details!!");
      }
    }

    SearchFilterChanged(event)
      {
        let newSearchCriteria : SearchCriteria = event;
        if(!this._ShowSurveyDetailsDiv && !this._AddNewSurveyDetails && this._DisabledInputField)
        {
            this._SearchCriteria = newSearchCriteria;
            this.Utility.LogText(this._SearchCriteria);
        }
      }

  /**Get ALL Survey details DropDowns */
  GetSurveyDropDowns()
    {
      let url = this.urlService.GetSurveyDropDownsAPI;
      this.httpService.get(url, null).subscribe(response => {
        // this._SurveyDropDownsDataModel = response
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
  /**get survey and all tabs details based on survey Number*/
  GetSurveyDetailsById()
    {
      this.CommonService.ShowSpinner();
      let url = this.urlService.GetSurveyDetailsByIdAPI + this._SurveyModel.SurveyId;
      this.httpService.get(url,null).subscribe(response => {
        this._AllSurveyDetails  = response;
        if (this._AllSurveyDetails.StatusCode != 200) 
          {
            alert(this._AllSurveyDetails.Message);
            // this.CommonService.hideSpinnerLoading();
          }
          else {
            this._SurveyModel = this._AllSurveyDetails.Result.Survey;
          }
        },error => {
          this.Utility.LogText(error);
        });
    }

  AddNewSurveyDetails()
    {
      if(this._SearchCriteria.VillageId != null){
        this._AddNewSurveyDetails = true;
        this._DisabledInputField = false;
        this._ShowSurveyDetailsDiv = false;
        this._SurveyModel = new SurveyModel();
      }
      else{
        alert("Please Select Village!!")
      }
      
    }

  EditSurveyDetails()
    {
      if(this._SurveyModel.SurveyId != null){
        this._AddNewSurveyDetails = false;
        this._DisabledInputField = false;
      }
      else{
        alert("Please Select Survey Number!!")
      }
    }

  DeleteSurveyDetails()
    {
      this.CommonService.ShowSpinner();
      let url = this.urlService.DeleteSurveyAPI + this._SurveyModel.SurveyId;
      this.httpService.get(url,null).subscribe(response => {
        let SurveyDetails : any = response;
        if (SurveyDetails.StatusCode != 200) 
          {
            alert(SurveyDetails.Message);
          }
          else {
            alert("Survey deleted successfully !");
            this._SurveyModel = new SurveyModel();
          }
        },error => {
          this.Utility.LogText(error);
        });
    }

  SaveSurveyDetails()
    {
      this._SurveyModel.VillageId = this._SearchCriteria.VillageId;
      let url = this.urlService.AddOrUpdateSurveyAPI;     
      this.httpService.HttpPostRequest(url,this._SurveyModel,this.AddOrUpdateSurveyCallBack.bind(this),null);
    }

    /**
  * @param dtas 
  */
  AddOrUpdateSurveyCallBack(dtas)
  {
    if (dtas != null)
      {
        let SurveyRespDataModel : SurveyResponeDataModel = dtas;
        if (SurveyRespDataModel.StatusCode != 200) 
          {
            alert(SurveyRespDataModel.Message);
          }
        if (this._AddNewSurveyDetails == false)
          {
            alert("Survey updated sucessfully!!");
            this._DisabledInputField = true;
          }
        else
          {
            alert("Survey added sucessfully!!");
            this._DisabledInputField = true;
            this._SurveyModel.SurveyId = SurveyRespDataModel.Result.SurveyId;
            this._AddNewSurveyDetails = false;
          }   
      }
      this._AddNewSurveyDetails = false;
      this._ShowSurveyDetailsDiv = true;
  }

  ActiveTab(evt)
    {
      this.Utility.LogText2('ActiveTab ID=>', evt.nextId)
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
