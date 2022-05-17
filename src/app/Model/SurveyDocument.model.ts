import {BaseResponse, CommonDropdownModel,CommonDocDataModel} from './Base.model';


export class SurveyDocDropDownsDataModel{
    AlignmentSheetTypes : CommonDropdownModel[];
    ProjectWiseReportTypes :CommonDropdownModel[];
    VillageLevelDocumentsTypes :CommonDropdownModel[];

    constructor(){
        this.AlignmentSheetTypes =[];
        this.ProjectWiseReportTypes = [];
        this.VillageLevelDocumentsTypes = [];
    }
}

export class CommonReportsDataModel{
    DocumentId: any;
    RequestId: any;
    LookupGroupId: any;
    Lookupid: any;
    FileName: string;
    FileNameWithGuid: string;
    FilePath: string;
    Description: string;
    FromChainage: any;
    ToChainage: any;
    Document: File
}


export class LegalDataModel extends BaseResponse {
    Result : CommonDocDataModel[];
    constructor(){      
      super();
      this.Result = [];
    }
  }

