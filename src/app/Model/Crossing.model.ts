import {GazzetteDocuments} from './Gazette.model'
import {BaseResponse, CommonDropdownModel,CommonDocDataModel} from './Base.model';

export class CrossingDetailsDataModel extends BaseResponse {
    Result : CrossingModel;
    constructor(){      
      super();
      this.Result = new CrossingModel();
    }
}

export class CrossingModel{
    CrossingId: any;
    CrossingNo: string;
    CrossingName: string;
    CrossingChainage: any;
    CrossingIpTpStart: string;
    CrossingIpTpEnd: string;
    DateOfApplication: any;
    DateofPermission: any;
    CrossingApproval: any;
    NonRefundable: any;
    Refundable: any;
    OneTimeRent: string;
    Description: string;
    AuthorityName: string;
    AuthorityAddress: string;
    TypeOfCrossing: any;
    Documents: CommonDocDataModel[];

    constructor(){
        this.Documents = [];
    }
}
