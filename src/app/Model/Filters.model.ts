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
        DistrictId :any;
        TalukaId : any;
        VillageId : any;
        ChainageFrom : any;
        ChainageTo : any;
        SurveyNumber : any;
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