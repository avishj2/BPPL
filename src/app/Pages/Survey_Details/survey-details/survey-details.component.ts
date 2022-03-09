import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { UtilityService } from 'src/app/services/utility.service';
import {SurveyeModel,LandModel } from 'src/app/Model/Survey.model';
@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.css']
})
export class SurveyDetailsComponent implements OnInit {
  _FilterControls: FilterControls;
  _SearchCriteria: SearchCriteria;
/**popup message variables */
popoverTitle ="Delete Details";
popoverMessage = "Are you sure you want to delete it ?";
_AddNewSurveyDetails: boolean = false;
_ShowSurveyDetailsDiv: boolean = false;
_DisabledInputField: boolean = true;
_SurveyModel : SurveyeModel;
_LandModel : LandModel;
_AddNewLand : boolean = false;

  constructor(public urlService: UrlService,
    private router: Router,
    private httpService: HttpService,
    public Utility: UtilityService) 
    {
      this._SearchCriteria = new SearchCriteria();
      this._FilterControls = new FilterControls();
      this.SetFilterControls();
      this._SurveyModel = new SurveyeModel();
      this._LandModel = new LandModel();
    }

  /**hide/show filter menu based on the component requirement */
  SetFilterControls() 
    {
      this._FilterControls.ShowState = true;
      this._FilterControls.ShowDistrict = true;
      this._FilterControls.ShowTaluka = true;
      this._FilterControls.ShowVillage = true;
      this._FilterControls.ShowSurneyNos = true;
    }

  ngOnInit(): void 
    {
      //TEST
      this._ShowSurveyDetailsDiv = true;
      this._DisabledInputField = false;
    }


  /**1. Get Values From Filters component and assign into SearchCriteria
  *  2. 
  */
  GetValuesFromFilters(event) 
    {
      this.Utility.LogText(event);
      this._SearchCriteria = event;
      if (Object.keys(this._SearchCriteria).length === 0) 
      {
        alert("Please Select State, District, taluka or village!!");
        
      }
    }

  /**=========Survey Details Method======== */
  AddNewSurveyDetails()
    {
      this._AddNewSurveyDetails = true;
      this._DisabledInputField = false;
    }

  EditSurveyDetails()
    {
      this._AddNewSurveyDetails = false;
      this._DisabledInputField = false;
    }

  DeleteSurveyDetails()
    {

    }

  SaveSurveyDetails()
    {

    }
    /***==========================  LandDetails    =========================== */
  AddNewLandDetails()
    {
      this._AddNewLand = true;
      this._DisabledInputField = false;
    }

  EditLandDetails()
    {
      this._DisabledInputField = false;
    }

  DeleteLandDetails()
    {

    }
  SaveLandDetails()
    {

    }
}
