import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { StateDetails,DistrictDetails,TalukaDetails,VillageDetails,SearchCriteria, DropDownChangeEnum, FilterControls} from 'src/app/Model/Filters.model';
import { UtilityService } from 'src/app/services/utility.service';
import {DropdownDataModel} from './filters.model';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import {from} from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})

export class FiltersComponent implements OnInit {
  /** FilterControls for filter menu show/hide */
  @Input() filterControls : FilterControls;
  @Output() filterOutput:EventEmitter<SearchCriteria>= new EventEmitter(); 
 
  //api models
  _StateDataModel : StateDetails[];
  _DistrictDetails : DistrictDetails[];
  _TalukaDetails : TalukaDetails[];
  _VillageDetails : VillageDetails[];
  _SearchCriteria : SearchCriteria;
 
  DropdownData = [
    { id : 27 , name  : "Ajmer" },
    { id : 84 , name  : "Alwar" },
    { id : 24 , name  : "Banswara" },
    { id : 274 , name  : "Baran" },
    { id : 14 , name  : "Barmer" },
    { id : 34 , name  : "Bharatpur" },
    { id : 28 , name  : "Bhilwara" },
    { id : 29 , name  : "Bikaner" }
  ];

  constructor(
    public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,
    )
    {
      this._SearchCriteria = new SearchCriteria();
    }

  ngOnInit() 
    {
      this.PopulateState();
      /**get data From parent component */
      this.Utility.LogText(this.filterControls)
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
            this.ResetSelectedValue(argSelection);
            break;
          case DropDownChangeEnum.DistrictChanged: 
            this._TalukaDetails = [];
            this._VillageDetails = [];
            this.ResetSelectedValue(argSelection);
            break;
          case DropDownChangeEnum.TalukaChanged: 
            this._VillageDetails = [];
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
                break;
              case DropDownChangeEnum.DistrictChanged:
                this._SearchCriteria.TalukaId = null;
                this._SearchCriteria.VillageId = null;
                break;
              case DropDownChangeEnum.TalukaChanged:
                this._SearchCriteria.VillageId = null;
                break;
          }
        }
}
