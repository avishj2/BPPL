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
  VillageId: any;
  TalukaId: any;
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
    VillageId: any;
    VillageChainageId: any;
    ChainageFrom: any;
    ChainageTo: any;
    SurveyAgency : string;
    LengthInKm : any;
  }

/**AddOrUpdateVillageChainage Response dataModel */
  export class AddOrUpdateVillageChainageResponseModel extends BaseResponse{
      Result : VillageChainageModel;

        constructor(){
          super();
          this.Result = new VillageChainageModel();
        }
  }