export class BaseResponse
{
    StatusCode: any;
    Message: string;
    ValidationFailed: true;
    TotalCount: any;
}

export class CommonDropdownModel{
    Value: any;
    Text: string;
    Selected: boolean;
}

export class CommonDocDataModel{
    DocumentId: any;
    RequestId: any;
    LookupGroupId: any;
    Lookupid: any;
    FileName: string;
    FileNameWithGuid: string;
    FilePath: string;
    Document: File;

    Description: string;
    FromChainage: any;
    ToChainage: any;



    public GetFormData() : FormData
        {
            let formDataIn = new FormData();
            this.DocumentId = this.DocumentId ? this.DocumentId : 0;
            this.RequestId = this.RequestId ? this.RequestId : null;
            // this.LookupGroupId = this.LookupGroupId ? this.LookupGroupId : 0;

            formDataIn.append('DocumentId', JSON.stringify(this.DocumentId));
            formDataIn.append('Lookupid', this.Lookupid);
            
            if(this.RequestId)
            {
                formDataIn.append('RequestId', JSON.stringify(this.RequestId));
            }
            formDataIn.append('Document', this.Document);
            //formDataIn.append('LookupGroupId', this.LookupGroupId);
            formDataIn.append('Description', this.Description);
            formDataIn.append('FromChainage', this.FromChainage);
            formDataIn.append('ToChainage', this.ToChainage);

            return formDataIn;
        }

}

export class User {
    Id: number;
    Username: string;
    Password: string;
    FirstName: string;
    LastName: string;
    Token?: string;
}

export class LookupGroupRespModel extends BaseResponse {
    Result : LookupGroupModel[];
    constructor(){      
      super();
      this.Result = [];
    }
}

export class LookupGroupModel
    {
        LookupId: Number;
        LookupGroupId:  Number;
        lookupName: string;
        LookupDesc: string;
    }