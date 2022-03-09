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



    public GetFormData() : FormData
        {
            let formDataIn = new FormData();
            this.DocumentId = this.DocumentId ? this.DocumentId : 0;
            this.RequestId = this.RequestId ? this.RequestId : null;

            formDataIn.append('DocumentId', JSON.stringify(this.DocumentId));
            formDataIn.append('Lookupid', this.Lookupid);
            if(this.RequestId)
            {
                formDataIn.append('RequestId', JSON.stringify(this.RequestId));
            }
            formDataIn.append('Document', this.Document);

            return formDataIn;
        }

}