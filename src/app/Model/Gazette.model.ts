import {BaseResponse, CommonDropdownModel} from './Base.model';

export class GazetteDetailsDataModel extends BaseResponse {
    Result : GazetteModel;
    constructor(){      
      super();
      this.Result = new GazetteModel();
    }
}
export class GazetteModel{
    Gazzateid: any;
    FileNo:  any;
    HindiFileNo: string;
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
    notificationId : any;
}

export class TypeOfNotificationDataModel{
    LookupId: any;
    LookupGroupId: any;
    lookupName:string;
    LookupDesc: string;
    CreatedDate: any;
}


export class NotificationDetailsDataModel extends BaseResponse {
    Result : NotificationModel;
    constructor(){      
      super();
      this.Result = new NotificationModel();
    }
}

export class NotificationModel{
    NotificationId : any;
    GazzateId: any;
    NottificationName : string;
    NotificationNo: any;
    SONames: string;
    EnglishFromPage: any;
    EnglishToPage: any;
    HindiFromPage: any;
    HindiToPage: any;
    Documents : Documents[];

    constructor()
    {
        this.Documents = [];
    }
}


export class GazzateDropDownsDataModel{
    TypeOfNotifications :CommonDropdownModel[];
    GazzateDocumentTypes:CommonDropdownModel[];
    NotificationDocumentTypes:CommonDropdownModel[];
    AwardSequence:CommonDropdownModel[];

    constructor(){
        this.TypeOfNotifications = [];
        this.GazzateDocumentTypes = [];
        this.NotificationDocumentTypes = [];
        this.AwardSequence = [];
    }

}
