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

        public CloneData(argData)
            {
                let l_LookupGroupModel = new LookupGroupModel();
                l_LookupGroupModel.LookupId = argData.LookupId;
                l_LookupGroupModel.LookupGroupId = argData.LookupGroupId;
                l_LookupGroupModel.lookupName = argData.lookupName;
                l_LookupGroupModel.LookupDesc = argData.LookupDesc;
                return l_LookupGroupModel;
            }
    }

    export class MenuOption {
        Id: any;
        MenuName: string;
        Icon: string;
        Submenu : Submenu[];
    
        constructor()
        {
            this.Submenu = [];
        }
    }

    export class Submenu{
        title: string;
        url:string;
    }

    export class Openlayers{
        VillageLayer : boolean;
        ForestBoundary: boolean;
        KhasaraBoundarybigger: boolean;
        SurveyNoTextBigger: boolean;
        KhasraLayer: boolean;
        ROULayer: boolean;
        CenterLineLayer: boolean;
        CSPointLayer: boolean;
        TPPointLayer: boolean;
        ChainageLayer: boolean;
        CompoundWallLayer: boolean;
        BuildingLayer: boolean;
        PlantationLayer: boolean;
        PondLayer: boolean;
        WatertankLayer: boolean;
        BoreWellLayer: boolean;
        WellLayer: boolean;
        TexthighlightLayer: boolean;
        NeotectonicLayer: boolean;
        GCPPointsLayer: boolean;
        DisasterPointLayer: boolean;

        constructor()
        {
            this.BoreWellLayer = false;
            this.BuildingLayer = false;
            this.CSPointLayer = false;
            this.CenterLineLayer = false;
            this.ChainageLayer = false;
            this.CompoundWallLayer = false;
            this.DisasterPointLayer = false;
            this.ForestBoundary = false;
            this.GCPPointsLayer = false;
            this.KhasaraBoundarybigger = false;
            this.KhasraLayer = false;
            this.NeotectonicLayer = false;
            this.WellLayer = false;
            this.WatertankLayer = false;
            this.VillageLayer = false;
            this.TexthighlightLayer = false;
            this.TPPointLayer = false;
            this.SurveyNoTextBigger = false;
            this.ROULayer = false;
            this.PondLayer = false;
            this.PlantationLayer = false;
        }
    }