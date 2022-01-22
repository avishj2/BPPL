/**get all states details from api, data model */
export class StateDetails{
    StateId  : any;
    Name : string;
    StateNameHindi : string;
    StateNameGuj :string;
  }  

/**get district details from api, data model */
export class DistrictDetails{
      DistrictId: any;
      StateId: any;
      DistrictName: string;
      DistrictNameHindi: string;
      DistrictNameGuj: string
  }
  
export class TalukaDetails
    {
      DistrictId: any;
      TalukaId: any;
      TalukaName: string;
      TalukaNameHindi: string;
      TalukaNameGuj: string
    }

export class VillageDetails
    {
        VillageId: any;
        TalukaId: any;
        VillageNumber: string;
        RevenueVillageNumber: string;
        NoOfPopulation: any;
        VillageNameEng: string;
        VillageNameLocal: string;
        VillageNameHindi: string;
        Chainages : ChainageDetails;
      
        constructor(){
          this.Chainages = new ChainageDetails();
        }
    }
      
export class ChainageDetails
    {
        VillageId: any;
        VillageChainageId: any;
        ChainageFrom: any;
        ChainageTo: any;
        SurveyAgency: string;
        LengthInKm: any
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