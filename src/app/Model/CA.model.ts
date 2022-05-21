import {BaseResponse, CommonDropdownModel,CommonDocDataModel} from './Base.model';

export class CADropdownModel{
    CADropDown : CommonDropdownModel[];
    CADropDownDocumentTypes : CommonDropdownModel[];
    constructor()
    {
        this.CADropDown = [];
        this.CADropDownDocumentTypes = [];
    }
}
export class CADataRespDataModel extends BaseResponse {
    Result : CADataModel;
    constructor(){      
      super();
      this.Result = new CADataModel();
    }
  }
export class CADataModel{
    CADetailsId: any;
    CAName: string;
    CANameHindi: string;
    CANameLocal: string;
    AddressEng: string;
    AddressHindi: string;
    AddressLocal: string;
    PinCode: string;
    StartDate: any;
    EndDate: any;
    NotificationNo: string;
    GazzateNo: string;
    GazzateDate: any;
    CaApplicationDate: any;
    InActiveStatus: boolean;
    Documents : CommonDocDataModel[];

    constructor(){
        this.Documents = [];
    }
}