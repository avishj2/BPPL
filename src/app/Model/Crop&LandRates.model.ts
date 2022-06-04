import {BaseResponse, CommonDropdownModel,CommonDocDataModel} from './Base.model';

export class CropDropDownsModel{
    CropNames : CommonDropdownModel[];
    SeasonTypes : CommonDropdownModel[];
    CropDocuments : CommonDropdownModel[];

    constructor(){
        this.CropNames = [];
        this.SeasonTypes = [];
        this.CropDocuments = [];
    }
}
export class LandDropDownsModel{
  CropNames : CommonDropdownModel[];
  SeasonTypes : CommonDropdownModel[];
  MeasureUnits : CommonDropdownModel[];
  LandDocuments : CommonDropdownModel[];

  constructor(){
      this.CropNames = [];
      this.SeasonTypes = [];
      this.MeasureUnits = [];
      this.LandDocuments = [];
  }
}

export class CropsRateRespDataModel extends BaseResponse {
    Result : CropsRateModel[];
    constructor(){      
      super();
      this.Result = [];
    }
  }


  export class CropandDocDetailsModel{
    Crops : CropsRateModel[];
    Documents : CommonDocDataModel[];

    constructor(){      
      this.Crops = [];
      this.Documents = [];
    }
  }
  
export class CropsRateModel{
    CropId: Number;
    VillageId: Number;
    TehsilId : Number;
    CropLookupId: Number;
    SeasonId: Number;
    YieldInQuintalMinPH: Number;
    YieldInQuintalMaxPH: Number;
    MinPrice: Number;
    MaxPrice: Number;
    AvgPrice: Number;


    public CloneData(argData)
      {
        let l_CropsRateModel = new CropsRateModel();
        l_CropsRateModel.CropId = argData.CropId;
        l_CropsRateModel.VillageId = argData.VillageId;
        l_CropsRateModel.CropLookupId = argData.CropLookupId;
        l_CropsRateModel.SeasonId = argData.SeasonId;
        l_CropsRateModel.YieldInQuintalMinPH = argData.YieldInQuintalMinPH;
        l_CropsRateModel.YieldInQuintalMaxPH = argData.YieldInQuintalMaxPH;
        l_CropsRateModel.MinPrice = argData.MinPrice;
        l_CropsRateModel.MaxPrice = argData.MaxPrice;
        l_CropsRateModel.AvgPrice = argData.AvgPrice;
        return l_CropsRateModel;      
      }
}

//LAND RATES DATA MODELS
export class LandandDocDetailsModel{
  Lands : LandRatesModel[];
  Documents : CommonDocDataModel[];
  
  constructor(){      
    this.Lands = [];
    this.Documents = [];
  }
}

export class LandRespModel extends BaseResponse {
    Result : LandRatesModel[];

    constructor(){      
      super();
      this.Result = [];
    }
}

export class LandRatesModel{
  LandId: Number;
  VillageId: Number;
  SurveyId: string;
  TypeOfLand: Number;
  ReservePriceHa: Number;
  SaleDeedPriceHa: Number;
  CAPriceHa: Number;
  MarketRateDate: any;
  CARemarks: string;
  MeasureUnit : any;

  public CloneData(argData)
    {
      let l_LandRatesModel = new LandRatesModel();
      l_LandRatesModel.LandId = argData.LandId;
      l_LandRatesModel.VillageId = argData.VillageId;
      l_LandRatesModel.SurveyId = argData.SurveyId;
      l_LandRatesModel.TypeOfLand = argData.TypeOfLand;
      l_LandRatesModel.ReservePriceHa = argData.ReservePriceHa;
      l_LandRatesModel.SaleDeedPriceHa = argData.SaleDeedPriceHa;
      l_LandRatesModel.CAPriceHa = argData.CAPriceHa;
      l_LandRatesModel.MarketRateDate = argData.MarketRateDate;
      l_LandRatesModel.CARemarks = argData.CARemarks;
      l_LandRatesModel.MeasureUnit = argData.MeasureUnit;
      return l_LandRatesModel;
    }
}

