
/**Request datamodel for village details*/
export class VillageRequestModel{
    VillageId: any;
    TalukaId: any;
    VillageNumber: string;
    RevenueVillageNumber: string;
    NoOfPopulation: any;
    VillageNameEng: string;
    VillageNameLocal: string;
    VillageNameHindi: string;
    CreatedDate:  any;
    UpdatedDate: any;
    CreatedBy: string;
    UpdatedBy: string;
    IsEditable : boolean;
}

/**AddOrUpdateVillage data model */
export class VillageResponseModel{
    StatusCode: any;
    Message: string;
    ValidationFailed: true;
    TotalCount: any;
    Result : VillageResultClass;

    constructor(){
      this.Result = new VillageResultClass();
    }
}

export class VillageResultClass{
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
  }
