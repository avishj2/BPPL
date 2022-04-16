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
    ChainageTo: any;
    SurveyAgency : string;
    LengthInKm : number;
    IsEdit:boolean;
  }

/**AddOrUpdateVillageChainage Response dataModel */
  export class VillageChainageResModel extends BaseResponse{
      Result : VillageChainageModel[];

        constructor(){
          super();
          this.Result = [];
        }
  }

/***VIEW Village details data models */
export class VillageSummaryReqModel
  {
    StartChainage : Number;
    EndChainage :Number;
    TalukaId : number;
  }


export class VillagesModel{
  Villages : Villages[];
  constructor()
    {
      this.Villages = [];
    }
}

export class Villages
  {
    VillageName: string;
    ChainageFromTo: string;
    LengthInKms: Number;
    TotalSurveyNos: Number;
    TotalPanchnamaOwners: Number;
    TotalCompensationPaid: Number
  }