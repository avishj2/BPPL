import {BaseResponse, CommonDropdownModel,CommonDocDataModel} from './Base.model';


export class SurveyDocDropDownsDataModel{
    AlignmentSheetTypes : CommonDropdownModel[];
    ProjectWiseReportTypes :CommonDropdownModel[];

    constructor(){
        this.AlignmentSheetTypes =[];
        this.ProjectWiseReportTypes = [];
    }
}

export class ProjectReportsDataModel{
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