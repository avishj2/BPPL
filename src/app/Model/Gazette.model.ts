import {BaseResponse} from './Base.model';

export class GazetteDetailsDataModel extends BaseResponse {
    Result : GazetteModel;
    constructor(){      
      super();
      this.Result = new GazetteModel();
    }
}
export class GazetteModel{
    Gazzateid: any;
    NotificationNo: any;
    FileNo:  any;
    HindiFileNo: string;
    SoNo: 0;
    TypeOfNotification: any;
    GazzateGeneratedDate: any;
    DispatchDate: any;
    SODate: any;
    GazzatePublishedDate: any;
    GazzatePrintedDate: any;
    GazzateRecievedDate: any;
    EnglishFromPage: any;
    EnglishToPage: any;
    HindiFromPage: any;
    HindiToPage: any;

    Villages : any[];
    Documents : Documents[];

    constructor(){
        this.Villages =[];
        this.Documents = [];

    }
}

export class Documents{
    fileName : string;
    filePath : string;
    documentId : any;
    gazzateId : any;
    lookupid : any;
}

export class NotificationTypeDataModel{
    LookupId: any;
    LookupGroupId: any;
    lookupName:string;
    LookupDesc: string;
    CreatedDate: any;
}

export class CommonDropdownModel{
    Value: any;
    Text: string;
    Selected: boolean;
}

