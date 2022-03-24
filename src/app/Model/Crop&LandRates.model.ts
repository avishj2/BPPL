import {BaseResponse, CommonDropdownModel,CommonDocDataModel} from './Base.model';

export class CropDropDownsModel{
    CropNames : CommonDropdownModel[];
    SeasonTypes : CommonDropdownModel[];

    constructor(){
        this.CropNames = [];
        this.SeasonTypes = [];
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