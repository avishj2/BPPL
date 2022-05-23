import {BaseResponse, CommonDropdownModel,CommonDocDataModel} from './Base.model';

export class SVIPSRespModel extends BaseResponse{
    Result : CommonDropdownModel[];
    constructor(){      
      super();
      this.Result = [];
    }
}
export class SVIPSModel{
    SVIPSDetailsId: any;
    VillageId: Number;
    Chainage: Number;
    Area: string;
    Coordinate: string;
    Remarks: string;
    SVDetailsType: Number;
    Name: string;
    Documents: CommonDocDataModel[];

    constructor(){
        this.Documents = [];
    }
}

export class SVIPSDropDownsModel{
    SVIPSCategories :CommonDropdownModel[];
    SVIPSDocuments : CommonDropdownModel[];

    constructor()
    {
        this.SVIPSCategories = [];
        this.SVIPSDocuments = [];
    }
}