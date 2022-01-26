export class ShowUploadedDocModel{
    DisplayDocument : DisplayDocument[];
    constructor() 
    {
        this.DisplayDocument = [];
    }
}
/**pre engineering datatable model */
export class DisplayDocument{
    DocumentName : string;
    DocumentType : any;
}

/**upload document  */
export class UploadDocument {
    ID : any;
    Doctype : string;
    DocumentName : string;
    FileNo : any;
    NoficationNumber : any;
    
 }

export class CustomPagingViewModel{
    ListPageSize : ListPageSize[];
    Paging : Paging;
    PageSizeID: any;
    PageNumber : any;

    constructor() 
    {
        this.ListPageSize = [];
        this.Paging = new Paging();
    }
}

/**pre-Engineering category datamodel */
export class CategoryDataModel{
    Categories :CategoryColl[];

ReadFromString()
    {
    let data = [
            {
                CategoryName :"Project Wise Report",
                CategoryID : 1
            },
            {
                CategoryName :"Aligment Sheet",
                CategoryID : 2
            },
            {
                CategoryName :"Award and Mutation Entry",
                CategoryID : 3
            }
        ];
        this.Categories =  JSON.parse(JSON.stringify(data));
    }
}
export class AddDocuments{
    Documents :Documents[]
    ReadJson()
    {
    let data = [
            {
                DocumentName :"Mutation Entry",
                IsGazette : false,
            },
            {
                DocumentName :"3(1) Notice",
                IsGazette : true,
            },
            {
                DocumentName :"Objection",
                IsGazette : false,
            },
            {
                DocumentName :"Panchnama",
                IsGazette : false,
            },
            {
                DocumentName :"6(1) Notice",
                IsGazette : false,
            },
            {
                DocumentName :"Objection Application",
                IsGazette : false,
            },
            {
                DocumentName :"Panchnama-2",
                IsGazette : false,
            }
        ];
        this.Documents =  JSON.parse(JSON.stringify(data));
    }
}

export class Documents{
    DocumentsName : string;
    IsGazette : boolean;
}

export class CategoryColl{
    CategoryName :string;
    CategoryID : any;
}

export class ListPageSize {
    Disabled: boolean;
    Selected: boolean;
    Text: string;
    Value: any
}
export class Paging {
    OffsetRowNumber: any;
    RowCount: any;
    PageNumber:any;
    LastRowNumInResponse: any;
    TotalNoOfRows: any;
    PagingStatus:string;
    TotalPageNumbers:any;
    NextPageNumber: any;
    PreviousPageNumber:any; 
} 

export class GazetteFormDataModel{
    GazetteFields :GazetteFields;

    constructor(){
        this.GazetteFields = new GazetteFields() ;
    }
}

export class GazetteFields{
    TypeofNotification : string;
    NotificationNumber: any;
    FileNo :any;
    HindiFileNo :any;
    SONumber :any;
    GazetteGeneratedDate :any;
    GazettePublishedDate :any;
    GazettePrintDate :any;
    GazetteReceviedDate :any;
    DispatchDate : any;
    SODate : any;
    EnglishFromPage  :any;
    EnglishToPage :any;
    HindiFromPage :any;
    HindiToPage :any;
}

/**crossing details  */
export class CrossDetailsDataModel{
    CrossDetails :CrossDetails;

    constructor(){
        this.CrossDetails = new CrossDetails()
    }
}

export class CrossDetails{
    CrossingNo :any;
    CrossingName : string;
    CrossingChainageKm : any;;
    CrossingIPTPTo : any;
    CrossingIPTPFrom: any;
    DateOfApplication: any;
    DateOfDemandNote: any;
    DateOfPermission: any;
    Approved:  string;
    NonRefundable : any;
    Refundable: any;
    oneTimeRent : any;
    Description : any;
    CrossingAuthorityName:string;
    CrossingAuthorityAddress : string;

}

/**AGI/Terminals details */
export class AGITerminalsDataModel{
    AGITerminalsDetails : AGITerminalsDetails;

   constructor(){
       this.AGITerminalsDetails = new AGITerminalsDetails();
   }
}
export class AGITerminalsDetails{
    AGIStationNo : any;//searchdropdown
    OwnerName: string; //searchdropdown
    SurveyNo : any;//searchdropdown
    AGITerminalsName : string;
    Chainage : any;
    PlotSizeInMeter:any;
    TypesOfland : string;//classificationofland
    DLCIrrigated :boolean;
    OwnerNameCount :any;
    SubRegisterIrrigated :boolean;
    SubRegisterNonIrrigated : boolean;
    RateExpectedByFarmer: any;
    MapWithDetailsFromTalhati :any;
    Remarks : string;
    ConstructionStartDate : any;
    ConstructionEndDate : any;
    Registry : boolean;
    From7upon12 : boolean;
    From8A : boolean;
    FromNo6: boolean;
    DLCYantri: boolean;
    DILRSurvey : boolean;
    FiveyrsSaledeed:  boolean;
    Notice63AA : boolean;
    Notice65BB: boolean;
    PanchanammaForAVillage : boolean;
    NegociationwithVillage: boolean;
    PanchanammaForMarketValue : boolean;
    MiscDetails : boolean;

}

/**Adhoc Payment Details */
export class AdhocPaymentDataModel{
    AdhocPaymentDetails : AdhocPaymentDetails;

    constructor(){
        this.AdhocPaymentDetails = new AdhocPaymentDetails();
    }
}
export class AdhocPaymentDetails{
    paymentAmountInRs : any;
    AmountInWordEnglish : string;
    PaymentMode : string;
    BankName : string;
    ChequeNo: any;
    ChequeDate : any;
    Paid: boolean;
    PaymentDate : any;
    AmountInLocalWords : string;
    ChequeIssuedTo : string;
    OwnerName : string; //serachdropdown

}