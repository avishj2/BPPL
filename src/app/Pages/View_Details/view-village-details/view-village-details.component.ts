import { AfterViewInit, Component, OnDestroy, OnInit,Input,Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-view-village-details',
  templateUrl: './view-village-details.component.html',
  styleUrls: ['./view-village-details.component.css']
})
export class ViewVillageDetailsComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: any = {};
  datatable: any;
  
constructor() {
    
   }

  ngOnInit(): void {
    this.dtOptions = 
      {
        pagingType: 'full_numbers',
        pageLength: 10,//onpage load loaded 5 rows, datatable bydefault shows 10 rows
      };
  }

  ngAfterViewInit(): void 
    {
      this.dtTrigger.next();
    }

  ngOnDestroy(): void 
    {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }

  /**After add chainage details refresh datatable  */
  rerenderDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  GetVillageData(){
    // let headers: string[] = [];
    // if(this._VillageDetailsDataModel.VillageChainage) {
    //   this._VillageDetailsDataModel.VillageChainage.forEach((value) => 
    //   {
    //     Object.keys(value).forEach((key) => {
    //       if(!headers.find((header) => header == key)){
    //         headers.push(key)
    //       }
    //     })
    //   })
    // }
    // return headers;
  }
}
