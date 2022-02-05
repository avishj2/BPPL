
export class SurveyeModel{
    SurveyNoEng : string;
    SurveyNoLocal: string;
    SurveyNoHindi: string;
    ROUAreaHa: any; 
    CultivaltedNonCultivalted : any;
    ElectricPoles : any;
    TelephonicPoles: any;
    CorridorWidth: any;
    LandType : any;
    PanchanamaDate : any;
    NOCDate : any;
    MortgageDetails : string;
    KhataNumber : any;
    Inactive: boolean;
    InactiveReason: string;
    IsMurabaNo : boolean;
    RevenueUpdated : boolean;
    
    constructor(){

    }
  }


  export class OwnerModel{

  }

  export class LandModel{
      OwnerName : string;
      LandType : string;
      Ha: any;
      Are: any;
      Sqmt: any;
  }
