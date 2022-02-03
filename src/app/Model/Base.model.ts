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