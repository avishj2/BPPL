export class TableDataModel {
    TableData : TableDataColl[];
    
    constructor() 
      {
        this.TableData =[];  
      }
}

export class TableDataColl{
  CrossingType : string;//string;
  NoOfCrossing :any;
  DemandNodeNot: any;
  DemandNode: any;
  ExecutionOfAggrement:any;
  ReceiptOfFinal:any;
  RefundableAmount:any;
  NonRefundableAmount:any;


}
export class sampleData{
    SampleData : TableDataColl[];
    CustomPagingViewModel : CustomPagingViewModel;

    constructor(){
        this.SampleData = []
        this.CustomPagingViewModel = new CustomPagingViewModel();
    }
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

export class ListPageSize{
    Disabled: boolean;
    Selected: boolean;
    Text: string;
    Value: any
}
export class Paging{
    OffsetRowNumber: any;
    RowCount: any;
    PageNumber:any;
    LastRowNumInResponse: any;
    TotalNoOfRows: any;
    PagingStatus:string;//string;
    TotalPageNumbers:any;
    NextPageNumber: any;
    PreviousPageNumber:any;
     
} 

var SampleData = 
[ 	
	{
		CrossingType: "Canals",
		NoOfCrossing: "3",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "2",
		RefundableAmount :"565543.5",
		NonRefundableAmount: "5"
	}, 
	{
		CrossingType: "Foregin Pipeline",
		NoOfCrossing: "4",
		DemandNodeNot: "0",
		DemandNode: "1",
		ExecutionOfAggrement :"4",
		ReceiptOfFinal: "5",
		RefundableAmount :"434.44",
		NonRefundableAmount: "564375.05"
	}, 
	{
		CrossingType: "other Crossing",
		NoOfCrossing: "1",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "2",
		RefundableAmount :"424.43",
		NonRefundableAmount: "5"
	},
	{
		CrossingType: "Protected Forest",
		NoOfCrossing: "3",
		DemandNodeNot: "0",
		DemandNode: "2",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "4",
		RefundableAmount :"564375.05",
		NonRefundableAmount: "4442.05"
		
	},
	{
	
		CrossingType: "Railways",
		NoOfCrossing: "4",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "2",
		RefundableAmount :"43423.33",
		NonRefundableAmount: "5"
	},
	{
		CrossingType: "Rivers",
		NoOfCrossing: "2",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "3",
		RefundableAmount :"544.76",
		NonRefundableAmount: "2444.05"
	},
	{
		CrossingType: "Social Forest",
		NoOfCrossing: "1",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "4",
		RefundableAmount :"4324.4",
		NonRefundableAmount: "544.76"
	},
	{
		CrossingType: "State Highway",
		NoOfCrossing: "1",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "3",
		RefundableAmount :"4343.34",
		NonRefundableAmount: "54324.54"
	},{
		CrossingType: "Canals",
		NoOfCrossing: "3",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "2",
		RefundableAmount :"565543.5",
		NonRefundableAmount: "5"
	}, 
	{
		CrossingType: "Foregin Pipeline",
		NoOfCrossing: "4",
		DemandNodeNot: "0",
		DemandNode: "1",
		ExecutionOfAggrement :"4",
		ReceiptOfFinal: "5",
		RefundableAmount :"434.44",
		NonRefundableAmount: "564375.05"
	}, 
	{
		CrossingType: "other Crossing",
		NoOfCrossing: "1",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "2",
		RefundableAmount :"424.43",
		NonRefundableAmount: "5"
	},
	{
		CrossingType: "Protected Forest",
		NoOfCrossing: "3",
		DemandNodeNot: "0",
		DemandNode: "2",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "4",
		RefundableAmount :"564375.05",
		NonRefundableAmount: "4442.05"
		
	},
	{
	
		CrossingType: "Railways",
		NoOfCrossing: "4",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "2",
		RefundableAmount :"43423.33",
		NonRefundableAmount: "5"
	},
	{
		CrossingType: "Rivers",
		NoOfCrossing: "2",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "3",
		RefundableAmount :"544.76",
		NonRefundableAmount: "2444.05"
	},
	{
		CrossingType: "Social Forest",
		NoOfCrossing: "1",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "4",
		RefundableAmount :"4324.4",
		NonRefundableAmount: "544.76"
	},
	{
		CrossingType: "State Highway",
		NoOfCrossing: "1",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "3",
		RefundableAmount :"4343.34",
		NonRefundableAmount: "54324.54"
	},
    {
		CrossingType: "Canals",
		NoOfCrossing: "3",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "2",
		RefundableAmount :"565543.5",
		NonRefundableAmount: "5"
	}, 
	{
		CrossingType: "Foregin Pipeline",
		NoOfCrossing: "4",
		DemandNodeNot: "0",
		DemandNode: "1",
		ExecutionOfAggrement :"4",
		ReceiptOfFinal: "5",
		RefundableAmount :"434.44",
		NonRefundableAmount: "564375.05"
	}, 
	{
		CrossingType: "other Crossing",
		NoOfCrossing: "1",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "2",
		RefundableAmount :"424.43",
		NonRefundableAmount: "5"
	},
	{
		CrossingType: "Protected Forest",
		NoOfCrossing: "3",
		DemandNodeNot: "0",
		DemandNode: "2",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "4",
		RefundableAmount :"564375.05",
		NonRefundableAmount: "4442.05"
		
	},
	{
	
		CrossingType: "Railways",
		NoOfCrossing: "4",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "2",
		RefundableAmount :"43423.33",
		NonRefundableAmount: "5"
	},
	{
		CrossingType: "Rivers",
		NoOfCrossing: "2",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "3",
		RefundableAmount :"544.76",
		NonRefundableAmount: "2444.05"
	},
	{
		CrossingType: "Social Forest",
		NoOfCrossing: "1",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "4",
		RefundableAmount :"4324.4",
		NonRefundableAmount: "544.76"
	},
	{
		CrossingType: "State Highway",
		NoOfCrossing: "1",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "3",
		RefundableAmount :"4343.34",
		NonRefundableAmount: "54324.54"
	},
    {
		CrossingType: "Foregin Pipeline",
		NoOfCrossing: "4",
		DemandNodeNot: "0",
		DemandNode: "1",
		ExecutionOfAggrement :"4",
		ReceiptOfFinal: "5",
		RefundableAmount :"434.44",
		NonRefundableAmount: "564375.05"
	}, 
	{
		CrossingType: "other Crossing",
		NoOfCrossing: "1",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "2",
		RefundableAmount :"424.43",
		NonRefundableAmount: "5"
	},
	{
		CrossingType: "Protected Forest",
		NoOfCrossing: "3",
		DemandNodeNot: "0",
		DemandNode: "2",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "4",
		RefundableAmount :"564375.05",
		NonRefundableAmount: "4442.05"
		
	},
	{
	
		CrossingType: "Railways",
		NoOfCrossing: "4",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "2",
		RefundableAmount :"43423.33",
		NonRefundableAmount: "5"
	},
	{
		CrossingType: "Rivers",
		NoOfCrossing: "2",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "3",
		RefundableAmount :"544.76",
		NonRefundableAmount: "2444.05"
	},
	{
		CrossingType: "Social Forest",
		NoOfCrossing: "1",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "4",
		RefundableAmount :"4324.4",
		NonRefundableAmount: "544.76"
	},
	{
		CrossingType: "State Highway",
		NoOfCrossing: "1",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "3",
		RefundableAmount :"4343.34",
		NonRefundableAmount: "54324.54"
	},{
		CrossingType: "Canals",
		NoOfCrossing: "3",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "2",
		RefundableAmount :"565543.5",
		NonRefundableAmount: "5"
	}, 
	{
		CrossingType: "Foregin Pipeline",
		NoOfCrossing: "4",
		DemandNodeNot: "0",
		DemandNode: "1",
		ExecutionOfAggrement :"4",
		ReceiptOfFinal: "5",
		RefundableAmount :"434.44",
		NonRefundableAmount: "564375.05"
	}, 
	{
		CrossingType: "other Crossing",
		NoOfCrossing: "1",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "2",
		RefundableAmount :"424.43",
		NonRefundableAmount: "5"
	},
	{
		CrossingType: "Protected Forest",
		NoOfCrossing: "3",
		DemandNodeNot: "0",
		DemandNode: "2",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "4",
		RefundableAmount :"564375.05",
		NonRefundableAmount: "4442.05"
		
	},
	{
	
		CrossingType: "Railways",
		NoOfCrossing: "4",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "2",
		RefundableAmount :"43423.33",
		NonRefundableAmount: "5"
	},
	{
		CrossingType: "Rivers",
		NoOfCrossing: "2",
		DemandNodeNot: "0",
		DemandNode: "0",
		ExecutionOfAggrement: "0",
		ReceiptOfFinal: "3",
		RefundableAmount :"544.76",
		NonRefundableAmount: "2444.05"
	},
]