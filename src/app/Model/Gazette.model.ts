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
    SoNo: any;
    TypeOfNotification: any;
    GazzateGeneratedDate: any;
    DispatchDate: any;
    GazzatePublishedDate: any;
    GazzatePrintedDate: any;
    GazzateRecievedDate: any;
    EnglishFromPage: any;
    EnglishToPage: any;
    HindiFromPage: any;
    HindiToPage: any;

    Documents : Documents[];

    constructor(){
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

export class TypeOfNotificationDataModel{
    LookupId: any;
    LookupGroupId: any;
    lookupName:string;
    LookupDesc: string;
    CreatedDate: any;
}

export class NotificationModel{
    Gazzateid: any;
    GazetteFileNo : any;
    NotificationNo: any;
    SoNo: any;
    EnglishFromPage: any;
    EnglishToPage: any;
    HindiFromPage: any;
    HindiToPage: any;
    Documents : Documents[];

    constructor(){
        this.Documents = [];
    }
}