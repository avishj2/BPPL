import {BaseResponse, CommonDropdownModel,CommonDocDataModel} from './Base.model';

export class AdHocPaymentDropDownsModel{
    Banks: CommonDropdownModel[];
    PaymentModes: CommonDropdownModel[];
    AdhocPaymentDocumentTypes: CommonDropdownModel[];

    constructor(){
        this.Banks = [];
        this.PaymentModes = [];
        this.AdhocPaymentDocumentTypes =[];
    }
}
export class AdHocPaymentRespDataModel extends BaseResponse {
    Result : AdHocPaymentModel;
    constructor(){      
      super();
      this.Result = new AdHocPaymentModel();
    }
  }
export class AdHocPaymentModel{
    AdHocPaymentId: Number;
    SurveyId: Number;
    SurveyOwnerId: Number;
    PaymentAmountRs: Number;
    ChequeDate: any;
    AmountInWords: string;
    Paid: boolean;
    PaymentMode: Number;
    Paymentdate: any;
    BankId: Number;
    ChequeNo: string;
    ChequeIssuedTo: string
    Documents : CommonDocDataModel[];

    constructor(){
        this.Documents = [];
    }
}
