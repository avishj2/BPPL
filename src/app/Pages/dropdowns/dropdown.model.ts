export class DropdownDataModel{
  Jurisdiction : any;
  Section : any;
  ChainageTo : any;
  ChainageFrom : any;
  State : any;
  District : any;
  Taluka : any;
  Village : any;
  SurveyNumber : any;

  constructor(){

  }
}
// ========================================================================================
/**get all states details from api, data model */
export class StateDetails{
  StateId  : any;
  Name : string;
  StateNameHindi : string;
  StateNameGuj :string;
}  


/**District data model for api  */
// export class DistrictDataModel{
//   District : DistrictDetails[];

//   constructor(){
//     this.District =[];
//   }
// }

export class DistrictDetails{
    DistrictId: any;
    StateId: any;
    DistrictName: string;
    DistrictNameHindi: string;
    DistrictNameGuj: string
}

/**Taluka/tahsil data model for api */
// export class TalukaDataModel{
//   Taluka : TalukaDetails[];
//   constructor(){
//     this.Taluka =[];
//   }
// }

export class TalukaDetails
  {
    DistrictId: any;
    TalukaId: any;
    TalukaName: string;
    TalukaNameHindi: string;
    TalukaNameGuj: string
  }

// export class VillageDataModel{
//   Village : VillageDetails[];

//   constructor(){
//     this.Village = [];
//   }
// }

export class VillageDetails{
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

export class ChainageDetails{
  VillageId: any;
  VillageChainageId: any;
  ChainageFrom: any;
  ChainageTo: any;
  SurveyAgency: string;
  LengthInKm: any
}

export class SearchCriteria{
  StateId : any;
  DistrictId :any;
  TalukaId : any;
  VillageId : any;
  ChainageFrom : any;
  ChainageTo : any;
}