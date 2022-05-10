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
    AwardSeqId : any;
    SONames : string;
    Documents : GazzetteDocuments[];

    constructor(){
        this.Documents = [];
    }

    
}

export class GazzetteDocuments{
    FileName : string;
    FilePath : string;
    DocumentId : any;
    GazzateId : any;
    Lookupid : any;
    NotificationId : any;
    FileNameWithGuid : string;
    Document : File

    public GetFormData() : FormData
    {
        let formDataIn = new FormData();
        this.DocumentId = this.DocumentId ? this.DocumentId : 0;
        this.NotificationId = this.NotificationId ? this.NotificationId : null;

        formDataIn.append('DocumentId', JSON.stringify(this.DocumentId));
        formDataIn.append('GazzateId', JSON.stringify(this.GazzateId));
        formDataIn.append('Lookupid', this.Lookupid);
        if(this.NotificationId)
        {
           formDataIn.append('NotificationId', JSON.stringify(this.NotificationId));
        }
        formDataIn.append('Document', this.Document);

        return formDataIn;
    }
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
    EnglishFromPage: any;
    EnglishToPage: any;
    HindiFromPage: any;
    HindiToPage: any;
    Documents : GazzetteDocuments[];

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
