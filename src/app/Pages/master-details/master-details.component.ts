import { AfterViewInit, Component, OnDestroy, OnInit,Input,Output, ViewChild } from '@angular/core';
import {TableDataModel } from './master.model';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-master-details',
  templateUrl: './master-details.component.html',
  styleUrls: ['./master-details.component.scss'],
})

export class MasterDetailsComponent implements AfterViewInit,OnDestroy, OnInit {
  /**data table properties  */
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  _showTabs : boolean;
  _tableData;
  // @Input() DropdownValues;
  SampleData : any[] = 
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

  _TableDataModel : TableDataModel;
  IsDtInitialized: boolean = false;
  constructor() {
    this._tableData = this.SampleData;
    this._TableDataModel = new TableDataModel()
   }

  ngOnInit(): void {
    this.dtOptions = 
      {
        pagingType: 'full_numbers',
        pageLength: 10,//onpage load loaded 5 rows, datatable bydefault shows 10 rows
      };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTriggers to rerender again
     this.dtTrigger.next();
    });
  }
  
  showHideTabs()
    {
      this._showTabs = false;
    }

    /**if SurveyNumber is not null tabs shows
     * otherwise hide it
   */
    GetChildData(data){  
      if(data != null && data != undefined) {
        this._showTabs = true;
      }  
      else{
          this._showTabs = false;
        }
      
  }  

  
  getTableData() {
    let headers: string[] = [];
    this._TableDataModel.TableData = this._tableData
    if(this._TableDataModel.TableData) {
      this._TableDataModel.TableData.forEach((value) => 
      {
        Object.keys(value).forEach((key) => {
          if(!headers.find((header) => header == key)){
            headers.push(key)
          }
        })
      })
    }
    // console.log(JSON.stringify(this._tableData));
    // console.log(this._tableData);
    //console.log("_TableDataModel",JSON.stringify(this._TableDataModel))
    return headers;
  }


  Datatable(){
    /**initialized my datatable */
  //   if (this.IsDtInitialized) 
  //   {
  //     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => 
  //     {
  //       dtInstance.destroy();
  //       this.dtTrigger.next();
  //     });
  //   }
  // else
  //   {
  //     this.IsDtInitialized = true;
  //     this.dtTrigger.next();
  //   }
  }
  

}
