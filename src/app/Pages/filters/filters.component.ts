import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { StateDetails,DistrictDetails,TalukaDetails,VillageDetails,SearchCriteria, DropDownChangeEnum, FilterControls,CrossingDropdownDataModel} from 'src/app/Model/Filters.model';
import { UtilityService } from 'src/app/services/utility.service';
import { DropdownDataModel } from './filters.model';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import {from} from 'rxjs';
import { TwoDigitDecimaNumberDirective } from './two-digit-decima-number.directive';
import {CommonDropdownModel} from 'src/app/Model/Base.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})

export class FiltersComponent implements OnInit {
  /** FilterControls for filter menu show/hide */
  @Input() filterControls : FilterControls;
  @Output() filterOutput:EventEmitter<SearchCriteria>= new EventEmitter(); 
 _TahsilLabel : string = "Tahsil";
  //api models
  _StateDataModel : StateDetails[];
  _DistrictDetails : DistrictDetails[];
  _TalukaDetails : TalukaDetails[];
  _VillageDetails : VillageDetails[];
  _SearchCriteria : SearchCriteria;
  _CrossingDetails :CrossingDropdownDataModel;
  _CrossingIds : CommonDropdownModel[];
  _SurveyDetails : CommonDropdownModel[];
  _OwnerDetails : CommonDropdownModel[];
  
  constructor(
    public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,
    )
    {
      this._SearchCriteria = new SearchCriteria();
      this._CrossingDetails = new CrossingDropdownDataModel();
    }

  ngOnInit() 
    {
      this.PopulateState();
      /**get data From parent component */
      this.Utility.LogText(this.filterControls);
      this.PopulateCrossingType();
    }

  /**API CALL FOR state details */
  PopulateState()
    {
      let url = this.urlService.GetAllStatesAPI; 
      //=====method 1 ===      
      // this.APIUtilityService.CallBack = this.CallBackStateDetails.bind(this);
      // this.APIUtilityService.HttpGetRequest(url,null);  

      //===== method 2(without callback function)=====
      this.httpService.get(url,null).subscribe(res => {
        console.log('data response', res);
        this._StateDataModel = res;
        },error => {
          console.log("error",error);
        });
    }

    /**@abstract
     * =====method 1 ===      
     */
  // CallBackStateDetails(dtas : HttpResponse<StateDetails>)
  //   {
  //     if (dtas != null) 
  //     {
  //       let data;
  //       data = dtas; 
  //       this._StateDataModel = data;    
  //     }
  //   }

   /**Get all District list base on the selected state */
   PopulateDistrict(arg)
    {
      if(this._SearchCriteria.StateId == 2)
        {
          this._TahsilLabel = "Taluka";
        }
      else
        {
          this._TahsilLabel = "Tahsil";
        }
      this.ResetDropDowns(DropDownChangeEnum.StateChanged);
      let url = this.urlService.GetDistrictByStateAPI + arg;  
      this.httpService.get(url,null).subscribe(response => {
        console.log('data response', response);
        this._DistrictDetails = response;
        },error => {
          console.log("error",error);
        });
    }

  /**get all Taluka details base on the selected DistrictId */
  PopulateTaluka(argDistrictID)
    {
      this.ResetDropDowns(DropDownChangeEnum.DistrictChanged)
      let url = this.urlService.GetTalukaByDistrictAPI+ argDistrictID;
      this.httpService.get(url,null).subscribe(response => {
        this._TalukaDetails = response;
        },error => {
          console.log("GetTalukaByDistrictAPI error",error);
        });
    }

    /**get all village details base on the selected Taluka */
  GetAllVillageDetails(argTalukaId)
    {
      this.ResetDropDowns(DropDownChangeEnum.TalukaChanged)
      let url = this.urlService.GetVillageByTalukaAPI + argTalukaId;
      this.httpService.get(url,null).subscribe(response => {
        this._VillageDetails = response;
        },error => {
          console.log("GetVillageByTalukaAPI error",error);
        });
    }
  
    /**get all Survey details base on the selected village */
  GetAllSurveyDetails(argVillageId)
    {
      this.ResetDropDowns(DropDownChangeEnum.VillageChanged)
      let url = this.urlService.GetSurveyDetailsByVillageId + argVillageId;
      this.httpService.get(url,null).subscribe(response => {
        this._SurveyDetails = response;
        //this.PassDataToParent();
        },error => {
          console.log("GetVillageByTalukaAPI error",error);
        });
    }


  PopulateCrossingType()
    {
      let url = this.urlService.GetCrossingDropDownsAPI;
      this.httpService.get(url,null).subscribe(response => {
        this._CrossingDetails = response;
        },error => {
          console.log("GetCrossingDropDownsAPI error",error);
        });
    }

  GetAllCrossingsData(argtypeOfCrossing)
    {
      let url = this.urlService.GetAllCrossingsAPI + argtypeOfCrossing;
      this.httpService.get(url,null).subscribe(response => {
        this._CrossingIds = response; 
        },error => {
          console.log("GetAllCrossingsAPI error",error); 
        });
    }

  GetOwnerNamesForSurvey(argSurveyId)
    {
      let url = this.urlService.GetOwnerNamesForSurveyAPI + argSurveyId;
      this.httpService.get(url,null).subscribe(response => {
        this._OwnerDetails = response; 
        },error => {
          console.log("GetAllCrossingsAPI error",error); 
        });
    }

    /**
    * pass data child(filter) component to parent component 
    **/
    PassDataToParent()
      {
        this.filterOutput.emit(this._SearchCriteria);  
        // this.Utility.LogText(this._SearchCriteria);
      }

    /**
     * This fucntion empty the colelction which binds the dropdown for state/district/tehsil/vilage respectivly based onthe
     * argument.
     * @param argSelection This defines what dropdown has changed. Based on this value below dropdowns will be changed
    */
    ResetDropDowns(argSelection : DropDownChangeEnum)
      {
        switch(argSelection)
        {
          case DropDownChangeEnum.StateChanged: 
            this._DistrictDetails = [];
            this._TalukaDetails = [];
            this._VillageDetails = [];
            this._SurveyDetails =[];
            this.ResetSelectedValue(argSelection);
            break;
          case DropDownChangeEnum.DistrictChanged: 
            this._TalukaDetails = [];
            this._VillageDetails = [];
            this._SurveyDetails =[];
            this.ResetSelectedValue(argSelection);
            break;
          case DropDownChangeEnum.TalukaChanged: 
            this._VillageDetails = [];
            this._SurveyDetails =[];
            this.ResetSelectedValue(argSelection);
            break;
          case DropDownChangeEnum.VillageChanged: 
            this._SurveyDetails =[];
            this.ResetSelectedValue(argSelection);
            break;
        }
      }
  
      ResetSelectedValue(argSelection : DropDownChangeEnum)
        {
          switch(argSelection)
          {
              case DropDownChangeEnum.StateChanged:
                this._SearchCriteria.DistrictId = null;
                this._SearchCriteria.TalukaId = null;
                this._SearchCriteria.VillageId = null;
                this._SearchCriteria.SurveyID = null;
                break;
              case DropDownChangeEnum.DistrictChanged:
                this._SearchCriteria.TalukaId = null;
                this._SearchCriteria.VillageId = null;
                this._SearchCriteria.SurveyID = null;
                break;
              case DropDownChangeEnum.TalukaChanged:
                this._SearchCriteria.VillageId = null;
                this._SearchCriteria.SurveyID = null;
                break;
              case DropDownChangeEnum.VillageChanged:
                this._SearchCriteria.SurveyID = null;
                break;
          }
        }
}
