import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { UtilityService } from 'src/app/services/utility.service';
import {SurveyeModel,LandModel,ChildControlModel } from 'src/app/Model/Survey.model';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

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
  _SurveyModel : SurveyeModel;

  constructor(public urlService: UrlService,
    private router: Router,
    private httpService: HttpService,
    public Utility: UtilityService) 
    {
      this._SearchCriteria = new SearchCriteria();
      this._FilterControls = new FilterControls();
      this._ChildControlModel = new ChildControlModel();
      this.SetFilterControls();
      this._SurveyModel = new SurveyeModel();
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
  * 2. 
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

  ActiveTab(evt){
      //console.log('evte',evt);
      console.log('ActiveTab ID=>', evt.nextId)
    }


}
