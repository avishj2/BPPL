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
export class StateDataModel{
  StateDetails :  StateDetails[];
  
  constructor(){
    this.StateDetails =[];
  }
}
export class StateDetails{
  StateId  : any;
  Name : string;
  StateNameHindi : string;
  StateNameGuj :string;
}  


/**District data model for api  */
export class DistrictDataModel{
  District : District[];

  constructor(){
    this.District =[];
  }
}

export class District{
    DistrictId: any;
    StateId: any;
    DistrictName: string;
    DistrictNameHindi: string;
    DistrictNameGuj: string
}

/**Taluka/tahsil data model for api */
export class TalukaDataModel{
  Taluka : Taluka[];
  constructor(){
    this.Taluka =[];
  }
}

export class Taluka
  {
    DistrictId: any;
    TalukaId: any;
    TalukaName: string;
    TalukaNameHindi: string;
    TalukaNameGuj: string
  }

export class VillageDataModel{
  Village : Village[];

  constructor(){
    this.Village = [];
  }
}

export class Village{
  VillageId: any;
  TalukaId: any;
  VillageNumber: string;
  RevenueVillageNumber: string;
  NoOfPopulation: any;
  VillageNameEng: string;
  VillageNameLocal: string;
  VillageNameHindi: string
}