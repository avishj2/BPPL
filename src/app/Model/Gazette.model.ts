import {BaseResponse} from './Base.model';

export class GazetteDetailsDataModel extends BaseResponse {
    Result : GazetteDetails;
    constructor(){      
      super();
      this.Result = new GazetteDetails();
    }
}

export class GazetteDetails{
    gazzateid: any;
    notificationNo: string;
    fileNo: string;
    hindiFileNo: string;
    soNo: any;
    typeOfNotification: any;
    gazzateGeneratedDate: any;
    dispatchDate: any;
    soDate: any;
    gazzatePublishedDate: any;
    gazzatePrintedDate: any;
    gazzateRecievedDate: any;
    englishFromPage: any;
    englishToPage: any;
    hindiFromPage: any;
    hindiToPage: any;
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

