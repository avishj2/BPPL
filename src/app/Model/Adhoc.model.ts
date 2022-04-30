import {BaseResponse, CommonDropdownModel,CommonDocDataModel} from './Base.model';

export class AdHocPaymentDropDownsModel{
    Banks: CommonDropdownModel[];
    PaymentModes: CommonDropdownModel[];
    AdhocPaymentDocumentTypes: CommonDropdownModel[];
    PaymentCategories : CommonDropdownModel[];

    constructor(){
        this.Banks = [];
        this.PaymentModes = [];
        this.AdhocPaymentDocumentTypes =[];
        this.PaymentCategories =[];
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
    ChequeIssuedTo: string;
    PaymentCategory : any;
    Documents : CommonDocDataModel[];

    constructor(){
        this.Documents = [];
    }
}
