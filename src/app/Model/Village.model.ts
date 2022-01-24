import {BaseResponse} from './Base.model';

/**AddOrUpdateVillage data model */
export class VillageResponseModel extends BaseResponse{
    Result : VillageModel;
    constructor(){      
      super();
      this.Result = new VillageModel();
    }
}

export class VillageModel{
  VillageId: number;
  TalukaId: number;
  VillageNumber: string;
  RevenueVillageNumber: string;
  NoOfPopulation: any;
  VillageNameEng: string;
  VillageNameLocal: string;
  VillageNameHindi: string
  Chainages : VillageChainageModel[];

  constructor(){
    this.Chainages = [];
  }
}

export class VillageChainageModel{
    VillageId: number;
    VillageChainageId: number;
    ChainageFrom: number;
    ChainageTo: number;
    SurveyAgency : string;
    LengthInKm : number;
  }

/**AddOrUpdateVillageChainage Response dataModel */
  export class AddOrUpdateVillageChainageResponseModel extends BaseResponse{
      Result : VillageChainageModel[];

        constructor(){
          super();
          this.Result = [];
        }
  }