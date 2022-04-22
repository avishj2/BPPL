import {CommonDropdownModel} from 'src/app/Model/Base.model';

/**get all states details from api, data model */
export class StateDetails{
    StateId  : any;
    Name : string;
    StateNameHindi : string;
    StateNameLocal :string;
  }  

/**get district details from api, data model */
export class DistrictDetails{
      DistrictId: any;
      StateId: any;
      DistrictName: string;
      DistrictNameHindi: string;
      DistrictNameLocal: string
  }
  
export class TalukaDetails
    {
      DistrictId: any;
      TalukaId: any;
      TalukaName: string;
      TalukaNameHindi: string;
      TalukaNameLocal: string
    }

export class VillageDetails
    {
        VillageId: any;
        VillageNameEng: string;
        VillageNameHindi: string;
        VillageNameLocal: string;
        
    }

/**search data model */
export class SearchCriteria
    {
        StateId : any;
        StateName : string;
        DistrictId :any;
        DistrictName : string;
        TalukaId : any;
        TalukaName: string;
        VillageId : any;
        ChainageFrom : any;
        ChainageTo : any;
        SurveyID : any;
        CrossingType : any;
        CrossingID : any;
        OwnerID : any;
        OwnerName : string;
        TypeOfLand : any;
        VillageName : string;
        CrossingTypeName : string;
        SurveyName : string;
        TypeOfNotification : any;
    }
/**
 * Defines the selection from the dropdown.
 */
 export enum DropDownChangeEnum
 {
    StateChanged = 1,
    DistrictChanged = 2,
    TalukaChanged = 3,
    VillageChanged = 4
 }

 /**
  * This obejct will be sent to the filter from calling page and controls will be rendered based 
  * on the state true/false of each control.
  */
 export class FilterControls
 {
     ShowState : boolean;
     ShowDistrict : boolean;
     ShowTaluka : boolean;
     ShowVillage : boolean;
     ShowChainageFrom : boolean;
     ShowChainageTo : boolean;
     ShowSurneyNos : boolean;
     ShowCrossingTypes: boolean;
     ShowCrossingNumber: boolean;
     ShowSearchBtn : boolean;
     ShowOwnerName : boolean;
     ShowLandTypes : boolean;
     ShowNotificationDD : boolean;
 }

 export class CrossingDropdownDataModel{
    CrossingApprovalTypes :CommonDropdownModel[];
    CrossingDocumentTypes : CommonDropdownModel[];
    CrossingTypes : CommonDropdownModel[];
      constructor()
        {
          this.CrossingApprovalTypes =[];
          this.CrossingDocumentTypes =[];
          this.CrossingTypes =[];
        }
  }