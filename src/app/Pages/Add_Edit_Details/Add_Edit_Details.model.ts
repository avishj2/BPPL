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