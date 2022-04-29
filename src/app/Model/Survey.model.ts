import {BaseResponse, CommonDropdownModel,CommonDocDataModel} from './Base.model';

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
    AwardTypes :CommonDropdownModel[];
    OwnerTypes : CommonDropdownModel[];
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
      this.AwardTypes =[];
      
    }
  }

  export class LAQDataModel extends BaseResponse{
    Result : LAQModel;
    constructor(){      
      super();
      this.Result = new LAQModel();
    }
  }

  export class LAQModel
  {
    Chainage : string;
    LAQData: SurveyResult[]

    constructor(){      
      this.LAQData =[];
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
    JamabandiOwner : string;
  
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
    Trees :TreeModel[];
    RestorationDetails :RestorationDataModel[];
    SurveyOwnersDrp :  CommonDropdownModel[];
    SurveyDocuments : CommonDocDataModel[];


    constructor(){
      this.Survey = new SurveyModel();
      this.SurveyOwners = [];
      this.LandDetails =[];
      this.Crops = [];
      this.Trees =[];
      this.RestorationDetails = [];
      this.SurveyOwnersDrp =[];
      this.SurveyDocuments =[];
    }
}


export class OwnerRespDataModel extends BaseResponse {
  Result : SurveyOwnerModel[];
  constructor(){      
    super();
    this.Result = [];
  }
}

export class SurveyOwnerModel{
      SurveyOwnerId: any;
      SurveyId: any;
      OwnerName: string;
      OwnerNamehindi: string;
      OwnerNameLocal: string;
      OwnerType: any;
      Address: string;
      AddressHindi: string;
      AddressLocal: string;
      OwnerCode: string;
      InActive: boolean;
      MinorOwner: boolean;
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
    SurveyOwnerName : any;
}

export class CropRespDataModel extends BaseResponse {
  Result : CropDataModel[];
  constructor(){      
    super();
    this.Result = [];
  }
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


export class TreeRespDataModel extends BaseResponse {
  Result : TreeModel[];
  constructor(){      
    super();
    this.Result = [];
  }
}

export class TreeModel{
    SurveyTreeId: any;
    SurveyOwnerId: any;
    SurveyId: any;
    Range: any;
    TreeName: any;
    NumberOfTree: any;
    AgeYears: any;
    Dia: any;
    HeightM: any;
    Remarks: string
}


export class RestorationRespDataModel extends BaseResponse {
  Result : RestorationDataModel[];
  constructor(){      
    super();
    this.Result = [];
  }
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

export class RevenueRespDataModel extends BaseResponse {
  Result : CommonDocDataModel[];
  constructor(){      
    super();
    this.Result = [];
  }
}
