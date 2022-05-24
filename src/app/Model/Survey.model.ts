import {BaseResponse, CommonDropdownModel,CommonDocDataModel} from './Base.model';
import { GazetteModel } from './Gazette.model';

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
    ROUHa : string;
    ROUAre : string;
    ROUSqmt : string;
    TotalHa : string;
    TotalAre : string;
    TotalSqmt : string;
    PanchnamaHa : string;
    PanchnamaAre : string;
    PanchnamaSqmt : string;
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
    SurveyFarmerNOCModels : SurveyFarmerNOCModel;
    Gazzates : GazetteModel[];

    constructor(){
      this.Survey = new SurveyModel();
      this.SurveyFarmerNOCModels = new SurveyFarmerNOCModel();
      this.SurveyOwners = [];
      this.LandDetails =[];
      this.Crops = [];
      this.Trees =[];
      this.RestorationDetails = [];
      this.SurveyOwnersDrp =[];
      this.SurveyDocuments =[];
      this.Gazzates = [];
    }
}

  export class NOCRespDataModel extends BaseResponse {
    Result : SurveyFarmerNOCModel;
    constructor(){      
      super();
      this.Result = new SurveyFarmerNOCModel();
    }
  }


export class SurveyFarmerNOCModel
  {
    SurveyFarmerNocId: any;
    SurveyId: any;
    NOCDate: any;
    Reamarks: string;
    NOCGivenBy: string
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

      public CloneOwnerData(argData)
        {
          let l_OwnerModel = new SurveyOwnerModel();
          l_OwnerModel.SurveyOwnerId = argData.SurveyOwnerId;
          l_OwnerModel.SurveyId = argData.SurveyId;
          l_OwnerModel.OwnerName = argData.OwnerName;
          l_OwnerModel.OwnerNamehindi = argData.OwnerNamehindi;
          l_OwnerModel.OwnerNameLocal = argData.OwnerNameLocal;
          l_OwnerModel.OwnerType = argData.OwnerType;
          l_OwnerModel.Address = argData.Address;
          l_OwnerModel.AddressHindi = argData.AddressHindi;
          l_OwnerModel.AddressLocal = argData.AddressLocal;
          l_OwnerModel.OwnerCode = argData.OwnerCode;
          l_OwnerModel.InActive = argData.InActive;
          l_OwnerModel.MinorOwner = argData.MinorOwner;
          return l_OwnerModel;
        }
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
    Ha: string;
    Are: string;
    Sqmt: string;
    SurveyOwnerName : any;
    Compensation : any;

    public CloneLandData(argData)
      {
        let l_LandDataModel = new LandDataModel();
        l_LandDataModel.SurveyLandId = argData.SurveyLandId;
        l_LandDataModel.SurveyId = argData.SurveyId;
        l_LandDataModel.SurveyOwnerId = argData.SurveyOwnerId;
        l_LandDataModel.LandType = argData.LandType;
        l_LandDataModel.Ha = argData.Ha;
        l_LandDataModel.Are = argData.Are;
        l_LandDataModel.Sqmt = argData.Sqmt;
        l_LandDataModel.SurveyOwnerName = argData.SurveyOwnerName;
        l_LandDataModel.Compensation = argData.Compensation;
        return l_LandDataModel;
      }
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
  Ha: string;
  Are: string;
  Sqmt: string;
  CropStatus: string;
  Compensation : any;

  public CloneCropData(argData)
    {
      let l_CropDataModel = new CropDataModel();
      l_CropDataModel.SurveyCropId = argData.SurveyCropId;
      l_CropDataModel.SurveyId = argData.SurveyId;
      l_CropDataModel.SurveyOwnerId = argData.SurveyOwnerId;
      l_CropDataModel.AwardType = argData.AwardType;
      l_CropDataModel.SeasonType = argData.SeasonType;
      l_CropDataModel.CropName = argData.CropName;
      l_CropDataModel.Ha = argData.Ha;
      l_CropDataModel.Are = argData.Are;
      l_CropDataModel.Sqmt = argData.Sqmt;
      l_CropDataModel.CropStatus = argData.CropStatus;
      l_CropDataModel.Compensation = argData.Compensation;
      return l_CropDataModel;
    }
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
    Remarks: string;
    Compensation : any;

    public CloneTreeData(argData)
      {
        let l_TreeModel = new TreeModel();
        l_TreeModel.SurveyTreeId = argData.SurveyTreeId;
        l_TreeModel.SurveyOwnerId = argData.SurveyOwnerId;
        l_TreeModel.SurveyId = argData.SurveyId;
        l_TreeModel.Range = argData.Range;
        l_TreeModel.TreeName = argData.TreeName;
        l_TreeModel.NumberOfTree = argData.NumberOfTree;
        l_TreeModel.AgeYears = argData.AgeYears;
        l_TreeModel.Dia = argData.Dia;
        l_TreeModel.HeightM = argData.HeightM;
        l_TreeModel.Remarks = argData.Remarks;
        l_TreeModel.Compensation = argData.Compensation;
        return l_TreeModel;
      }
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
    RemarksLocal: string;

    public CloneData(argData)
      {
        let l_RestorationDataModel = new RestorationDataModel();
        l_RestorationDataModel.SurveyRestorationId = argData.SurveyRestorationId;
        l_RestorationDataModel.SurveyOwnerId = argData.SurveyOwnerId;
        l_RestorationDataModel.SurveyId = argData.SurveyId;
        l_RestorationDataModel.DamageType = argData.DamageType;
        l_RestorationDataModel.DamageName = argData.DamageName;
        l_RestorationDataModel.LengthM = argData.LengthM;
        l_RestorationDataModel.ApproxValue = argData.ApproxValue;
        l_RestorationDataModel.DiameterInch = argData.DiameterInch;
        l_RestorationDataModel.WidthM = argData.WidthM;
        l_RestorationDataModel.DepthM = argData.DepthM;
        l_RestorationDataModel.HeightM = argData.HeightM;
        l_RestorationDataModel.Description = argData.Description;
        l_RestorationDataModel.Remarks = argData.Remarks;
        l_RestorationDataModel.RemarksLocal = argData.RemarksLocal;
        return l_RestorationDataModel;
      }

}

export class RevenueRespDataModel extends BaseResponse {
  Result : CommonDocDataModel[];
  constructor(){      
    super();
    this.Result = [];
  }
}

export class CompensationModel{
  Compensation : CompensationCol[];
  constructor(){
    this.Compensation = [];
  }
}

export class CompensationCol{
  OwnerID : any;
  PaymentCategory : any;
  Amount : Number;  
}

