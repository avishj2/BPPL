import {BaseResponse, CommonDropdownModel,CommonDocDataModel} from './Base.model';

export class CropDropDownsModel{
    CropNames : CommonDropdownModel[];
    SeasonTypes : CommonDropdownModel[];

    constructor(){
        this.CropNames = [];
        this.SeasonTypes = [];
    }
}
export class LandDropDownsModel{
  CropNames : CommonDropdownModel[];
  SeasonTypes : CommonDropdownModel[];
  MeasureUnits : CommonDropdownModel[];

  constructor(){
      this.CropNames = [];
      this.SeasonTypes = [];
      this.MeasureUnits = [];
  }
}

export class CropsRateRespDataModel extends BaseResponse {
    Result : CropsRateModel[];
    constructor(){      
      super();
      this.Result = [];
    }
  }

  
export class CropsRateModel{
    CropId: Number;
    VillageId: Number;
    CropLookupId: Number;
    SeasonId: Number;
    YieldInQuintalMinPH: Number;
    YieldInQuintalMaxPH: Number;
    MinPrice: Number;
    MaxPrice: Number;
    AvgPrice: Number;
}

//LAND RATES DATA MODELS
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
  SurveyId: Number;
  TypeOfLand: Number;
  ReservePriceHa: Number;
  SaleDeedPriceHa: Number;
  CAPriceHa: Number;
  MarketRateDate: any;
  CARemarks: string;
  MeasureUnit : any;
}