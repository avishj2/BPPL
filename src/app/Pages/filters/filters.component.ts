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
import { GazzateDropDownsDataModel} from 'src/app/Model/Gazette.model';
import {SurveyDocDropDownsDataModel } from 'src/app/Model/SurveyDocument.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})

export class FiltersComponent implements OnInit {
  /** FilterControls for filter menu show/hide */
  @Input() filterControls : FilterControls;
  @Output() filterOutput:EventEmitter<SearchCriteria>= new EventEmitter(); 
  @Output() VillageChanged :EventEmitter<SearchCriteria>= new EventEmitter(); 
  @Output() CrossingChanged :EventEmitter<SearchCriteria>= new EventEmitter(); 
  @Output() ChangedVillage :EventEmitter<SearchCriteria>= new EventEmitter(); 
  @Output() ResetFilterValues :EventEmitter<SearchCriteria>= new EventEmitter(); 
  _DropDownsDataModel : GazzateDropDownsDataModel;
  _SurveyDocDropDownsDataModel : SurveyDocDropDownsDataModel;

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
  _LandTypeDetails : CommonDropdownModel[];
  
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
      this._DropDownsDataModel = new GazzateDropDownsDataModel();
      this._SurveyDocDropDownsDataModel = new SurveyDocDropDownsDataModel();
    }

  ngOnInit() 
    {
      /**get data From parent component */
      this.Utility.LogText(this.filterControls);
      if(this.filterControls.ShowState == true)
      {
        this.PopulateState();
      }
      if(this.filterControls.ShowCrossingTypes == true)
      {
        this.PopulateCrossingType();
      }
      if(this.filterControls.ShowNotificationDD == true)
      {
        this.GetGazzateDropDowns();
      }
      if(this.filterControls.ShowVillageDocTypes == true)
      {
        this.GetSurveyDocumentDropDowns();
      }
    }

  /**API CALL FOR state details */
  PopulateState()
    {
      let url = this.urlService.GetAllStatesAPI; 
      //===== method 2(without callback function)=====
      this.httpService.get(url,null).subscribe(res => {
        this.Utility.LogText2('data response', res);
        this._StateDataModel = res;
        },error => {
          this.Utility.LogText2("error",error);
        });
    }

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
        this.Utility.LogText2('data response', response);
        this._DistrictDetails = response;
        },error => {
          this.Utility.LogText2("error",error);
        });
        this._SearchCriteria.StateName = this.GetLookupState(this._StateDataModel , this._SearchCriteria.StateId)
    }

         /** taluka name*/
    GetLookupState(lookups : StateDetails[], lookUpid: number) : any
      {
        let object = lookups.find(elm=>elm.StateId == lookUpid );
        if(object)
        {
          return object.Name;
        }
        else { 
          return lookUpid;
        }
      }

  /**get all Taluka details base on the selected DistrictId */
  PopulateTaluka(argDistrictID)
    {
      this.ResetDropDowns(DropDownChangeEnum.DistrictChanged);      
      let url = this.urlService.GetTalukaByDistrictAPI+ argDistrictID;
      this.httpService.get(url,null).subscribe(response => {
      this._TalukaDetails = response;
        },error => {
          this.Utility.LogText2("GetTalukaByDistrictAPI error",error);
        });
      this._SearchCriteria.DistrictName = this.GetLookupDistrict(this._DistrictDetails, this._SearchCriteria.DistrictId)     
    }

     /** taluka name*/
    GetLookupDistrict(lookups : DistrictDetails[], lookUpid: number) : any
     {
       let object = lookups.find(elm=>elm.DistrictId == lookUpid );
       if(object)
       {
         return object.DistrictName;
       }
       else { 
         return lookUpid;
       }
     }

    /**get all village details base on the selected Taluka */
  GetAllVillageDetails(argTalukaId)
    {
      this.ResetDropDowns(DropDownChangeEnum.TalukaChanged)
      if(this.filterControls.ShowVillage == true)
        {
        let url = this.urlService.GetVillageByTalukaAPI + argTalukaId;
        this.httpService.get(url,null).subscribe(response => {
          this._VillageDetails = response;
          },error => {
            this.Utility.LogText2("GetVillageByTalukaAPI error",error);
          }); 
        this._SearchCriteria.TalukaName = this.GetLookupTaluka(this._TalukaDetails, this._SearchCriteria.TalukaId)
      }
    }

    /** taluka name*/
    GetLookupTaluka(lookups : TalukaDetails[], lookUpid: number) : any
      {
        let object = lookups.find(elm=>elm.TalukaId == lookUpid );
        if(object)
        {
          return object.TalukaName;
        }
        else { 
          return lookUpid;
        }
      }
  
    /**get all Survey details base on the selected village */
  GetAllSurveyDetails(argVillageId)
    {
      this.ResetDropDowns(DropDownChangeEnum.VillageChanged)
      if(this.filterControls.ShowSurneyNos== true)
        {
          let url = this.urlService.GetSurveyDetailsByVillageId + argVillageId;
          this.httpService.get(url,null).subscribe(response => {
            this._SurveyDetails = response;
            },error => {
              this.Utility.LogText2("GetVillageByTalukaAPI error",error);
            });
        }
      if(this.filterControls.ShowLandTypes == true)
        {
          this.GetLandTypesByVillage(argVillageId);
        }
      this._SearchCriteria.VillageName = this.GetLookupVillage(this._VillageDetails,argVillageId);
      this.ChangedVillage.emit(this._SearchCriteria); 
    }

    /** Village*/
    GetLookupVillage(lookups : VillageDetails[], lookUpid: number) : any
      {
        let object = lookups.find(elm=>elm.VillageId == lookUpid );
        if(object)
        {
          return object.VillageNameEng;// " - " +
        }
        else { 
          return lookUpid;
        }
      }

  PopulateCrossingType()
    {
      let url = this.urlService.GetCrossingDropDownsAPI;
      this.httpService.get(url,null).subscribe(response => {
        this._CrossingDetails = response;
        },error => {
          this.Utility.LogText2("GetCrossingDropDownsAPI error",error);
        });
    }

  GetAllCrossingsData(argtypeOfCrossing)
    {
      this.ResetDropDowns(DropDownChangeEnum.CrossingChanged)
      let url = this.urlService.GetAllCrossingsAPI + argtypeOfCrossing;
      this.httpService.get(url,null).subscribe(response => {
        this._CrossingIds = response; 
        },error => {
          this.Utility.LogText2("GetAllCrossingsAPI error",error); 
        });
      this._SearchCriteria.CrossingID = undefined;
      this._SearchCriteria.CrossingTypeName = this.GetLookupValue(this._CrossingDetails.CrossingTypes,this._SearchCriteria.CrossingType);
      this.CrossingChanged.emit(this._SearchCriteria); 
    }

  GetOwnerNamesForSurvey(argSurveyId)
    {
      let url = this.urlService.GetOwnerNamesForSurveyAPI + argSurveyId;
      this.httpService.get(url,null).subscribe(response => {
        this._OwnerDetails = response; 
        },error => {
          this.Utility.LogText2("GetAllCrossingsAPI error",error); 
        });
      this._SearchCriteria.SurveyName = this.GetLookupValue(this._SurveyDetails, argSurveyId)
    }

  GetLandTypesByVillage(argvillageId)
    {
      let url = this.urlService.GetLandTypesByVillageAPI + argvillageId;
      this.httpService.get(url,null).subscribe(response => {
        this._LandTypeDetails = response; 
        },error => {
          this.Utility.LogText2("GetLandTypesByVillageAPI error",error); 
        });
    }

    GetLookupValue(lookups : CommonDropdownModel[], lookUpid: number) : any
      {
        let object = lookups.find(elm=>elm.Value == lookUpid );
        if(object)
        {
          return object.Text;
        }
        else { 
          return lookUpid;
        }
      }

    OwnerNameChange(event)
      {
        this._SearchCriteria.OwnerName = this.GetLookupValue(this._OwnerDetails, event);
      }

    /**
    * Get type of notification list
    */
    GetGazzateDropDowns()
    {
      let url = this.urlService.GetGazzateDropDownsAPI;
      this.httpService.get(url, null).subscribe(response => {
        this._DropDownsDataModel = response;
        this.Utility.LogText(this._DropDownsDataModel);
      }, error => {
        this.Utility.LogText(error);
      });
    }

      /**Get Survey Document DropDowns values*/
    GetSurveyDocumentDropDowns()
      {
        let url = this.urlService.GetSurveyDocumentDropDowns;
        this.httpService.get(url,null).subscribe(response => {
          this._SurveyDocDropDownsDataModel  = response;
          },error => {
            this.Utility.LogText(error);
          });
      }

    /**
    * pass data child(filter) component to parent component 
    **/
    PassDataToParent()
      {
        this.filterOutput.emit(this._SearchCriteria);  
        this.Utility.LogText(this._SearchCriteria);
      }

      /**This function clear all selected fields */
    resetSelectedField()
      {
        this.ResetDropDowns(DropDownChangeEnum.AllClear);
        this.ResetFilterValues.emit(this._SearchCriteria)
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
          case DropDownChangeEnum.AllClear: 
            this._DistrictDetails = [];
            this._TalukaDetails = [];
            this._VillageDetails = [];
            this._SurveyDetails =[];
            this._OwnerDetails = [];
            this._CrossingIds =[];
            this.ResetSelectedValue(argSelection);
            break;
          case DropDownChangeEnum.StateChanged: 
            this._DistrictDetails = [];
            this._TalukaDetails = [];
            this._VillageDetails = [];
            this._SurveyDetails =[];
            this._OwnerDetails = [];
            this.ResetSelectedValue(argSelection);
            break;
          case DropDownChangeEnum.DistrictChanged: 
            this._TalukaDetails = [];
            this._VillageDetails = [];
            this._SurveyDetails =[];
            this._OwnerDetails = [];
            this.ResetSelectedValue(argSelection);
            break;
          case DropDownChangeEnum.TalukaChanged: 
            this._VillageDetails = [];
            this._SurveyDetails =[];
            this._OwnerDetails = [];
            this.ResetSelectedValue(argSelection);
            break;
          case DropDownChangeEnum.VillageChanged: 
            this._SurveyDetails =[];
            this._OwnerDetails = [];
            this.ResetSelectedValue(argSelection);
            break;
          case DropDownChangeEnum.CrossingChanged:
            this._CrossingIds =[];
            this.ResetSelectedValue(argSelection);
            break;
        }
      }
  
      ResetSelectedValue(argSelection : DropDownChangeEnum)
        {
          switch(argSelection)
          {
            case DropDownChangeEnum.AllClear:
                this._SearchCriteria.StateId = undefined;
                this._SearchCriteria.DistrictId = undefined;
                this._SearchCriteria.TalukaId = undefined;
                this._SearchCriteria.VillageId = undefined;
                this._SearchCriteria.SurveyID = undefined;                
                this._SearchCriteria.CrossingType = undefined;
                this._SearchCriteria.TypeOfNotification = undefined;
                this._SearchCriteria.OwnerID = undefined;
                this._SearchCriteria.OwnerName = undefined;  
                this._SearchCriteria.CrossingID =undefined;    
                this._SearchCriteria.TypeOfLand =  undefined;   
                this._SearchCriteria.ChainageFrom = null;
                this._SearchCriteria.ChainageTo = null;  
                this._SearchCriteria.StateName = null;    
                this._SearchCriteria.TalukaName = null;    
                this._SearchCriteria.VillageName = null;  
                this._SearchCriteria.DistrictName = null;  
                break;
            case DropDownChangeEnum.StateChanged:
              this._SearchCriteria.DistrictId = undefined;
              this._SearchCriteria.TalukaId = undefined;
              this._SearchCriteria.VillageId = undefined;
              this._SearchCriteria.SurveyID = undefined;
              this._SearchCriteria.OwnerID = undefined;
              this._SearchCriteria.OwnerName = undefined;
              break;
            case DropDownChangeEnum.DistrictChanged:
              this._SearchCriteria.TalukaId = undefined;
              this._SearchCriteria.VillageId = undefined;
              this._SearchCriteria.SurveyID = undefined;
              this._SearchCriteria.OwnerID = undefined;
              this._SearchCriteria.OwnerName = undefined;
              break;
            case DropDownChangeEnum.TalukaChanged:
              this._SearchCriteria.VillageId = undefined;
              this._SearchCriteria.SurveyID = undefined;
              this._SearchCriteria.OwnerID = undefined;
              this._SearchCriteria.OwnerName = undefined;
              break;
            case DropDownChangeEnum.VillageChanged:
              this._SearchCriteria.SurveyID = undefined;
              this._SearchCriteria.OwnerID = undefined;
              this._SearchCriteria.OwnerName = undefined;
              break;
            case DropDownChangeEnum.CrossingChanged:
              this._SearchCriteria.CrossingID =undefined;
              break;
          }
        }
}
