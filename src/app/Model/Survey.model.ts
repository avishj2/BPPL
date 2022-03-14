import {BaseResponse, CommonDropdownModel} from './Base.model';

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
      LandType : any;
      Ha: any;
      Are: any;
      Sqmt: any;
  }

  export class ChildControlModel{
    ShowLand : boolean;
    ShowTree : boolean;
    ShowOwner : boolean;
    ShowRestoration : boolean;
    ShowCrop : boolean;
    ShowRevenue : boolean;
    ShowAssignPuch : boolean;
    ShowCompensation : boolean;
    ShowGazetteNotice : boolean;
  }

  export class SurveyDropDownsDataModel {
    SurveyLandTypes : CommonDropdownModel[];
    CultivateLandTypes: CommonDropdownModel[];
    SeasonNameTypes: CommonDropdownModel[];
    CropNames: CommonDropdownModel[];
    RevenueFormTypes: CommonDropdownModel[];
    DamageTypes: CommonDropdownModel[];
    DamageNames: CommonDropdownModel[];
    LandClassifications: CommonDropdownModel[];
    TreeNames: CommonDropdownModel[];
    TreeRanges: CommonDropdownModel[];
    SurveyID :Number;
    
    constructor() {
      this.CropNames =[];
      this.CultivateLandTypes =[];
      this.DamageNames =[];
      this.DamageTypes =[];
      this.LandClassifications=[];
      this.RevenueFormTypes =[];
      this.SeasonNameTypes=[];
      this.SurveyLandTypes = [];
      this.TreeNames=[];
      this.TreeRanges =[];
      
    }
  }

export class SurveyResponeDataModel extends BaseResponse {
    Result : SurveyModel;
    constructor(){      
      super();
      this.Result = new SurveyModel();
    }
}

export class SurveyModel
  {
    SurveyId : Number;
    SurveyNo : string;
    SurveyNoHindi : string;
    SurveyNoLocal : string;
    ElectricPoles : any;
    LandType : any;
    PanchnamaDate : any;
    NOCDate : any;
    TelephonePoles : Number;
    CorridorWidth : Number;
    CultivatedType :Number;
    MortgageDetails :string ;
    KhataNo :string ;
    InActive :boolean;
    InactiveReason :string ;
    RevRecUpdated :boolean ;
    ROUHa : any;
    ROUAre : any;
    ROUSqmt : any;
    TotalHa : any;
    TotalAre : any;
    TotalSqmt : any;
    PanchnamaHa : any;
    PanchnamaAre : any;
    PanchnamaSqmt : any;
    IsMurabaNo :boolean;
    VillageId : any;
  
}
export class AllSurveyDetailsDataModel extends BaseResponse {
    Result : SurveyResult;
    constructor(){      
      super();
      this.Result = new SurveyResult();
    }
}


export class SurveyResult{
    Survey :SurveyModel;
    SurveyOwners :SurveyOwnerModel[];
    LandDetails :LandDataModel[];
    Crops :CropDataModel[];
    Trees :RestorationDataModel[];
    RestorationDetails :RestorationDataModel[];
    constructor(){
      this.Survey = new SurveyModel();
      this.SurveyOwners = [];
      this.LandDetails =[];
      this.Crops = [];
      this.Trees =[];
      this.RestorationDetails = [];
    }
}


  export class SurveyOwnerModel{
      surveyOwnerId: any;
      surveyId: any;
      ownerName: string;
      ownerNamehindi: string;
      ownerNameLocal: string;
      ownerType: any;
      address: string;
      addressHindi: string;
      addressLocal: string;
      ownerCode: string;
      inActive: boolean;
      minorOwner: boolean;
  }

  export class LandRespDataModel extends BaseResponse {
    Result : LandDataModel[];
    constructor(){      
      super();
      this.Result = [];
    }
}
    

  export class LandDataModel{
    SurveyLandId: any;
    SurveyId: any;
    SurveyOwnerId: any;
    LandType: any;
    Ha: any;
    Are: any;
    Sqmt: any;
}

export class CropDataModel{
  SurveyCropId: any;
  SurveyId: any;
  SurveyOwnerId: any;
  AwardType: any;
  SeasonType: any;
  CropName: any;
  Ha: any;
  Are: any;
  Sqmt: any;
  CropStatus: string
}

export class TreeModel {
    SurveyTreeId: any;
    SurveyOwnerId: any;
    SurveyId: any;
    Range: any;
    TreeName: any;
    NumberOfTree: any;
    AgeYears: any;
    GirthCMS: any;
    HeightM: any;
    Remarks: string
}

export class RestorationDataModel{
    SurveyRestorationId: any;
    SurveyOwnerId: any;
    SurveyId: any;
    DamageType: any;
    DamageName: any;
    LengthM: any;
    ApproxValue: string;
    DiameterInch: any;
    WidthM: any;
    DepthM: any;
    HeightM: any;
    Description: string;
    Remarks: string;
    RemarksLocal: string

}