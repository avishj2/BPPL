import { AfterViewInit, Component, OnDestroy, OnInit,Input,Output, ViewChild ,QueryList, ViewChildren} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-view-village-details',
  templateUrl: './view-village-details.component.html',
  styleUrls: ['./view-village-details.component.css']
})
export class ViewVillageDetailsComponent implements OnInit {
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;

  dtOptions: DataTables.Settings[] = [];

  displayToConsole(): void {
    this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
      dtElement.dtInstance.then((dtInstance: any) => {
        console.log(`The DataTable ${index} instance ID is: ${dtInstance.table().node().id}`);
      });
    });
    // this.secondapi();
  }

  ngOnInit(): void {
    this.dtOptions[0] = this.buildDtOptions('https://angular-datatables-demo-server.herokuapp.com/');
    this.dtOptions[1] = this.buildDtOptions('https://angular-datatables-demo-server.herokuapp.com/');
  }

  private buildDtOptions(url: string): DataTables.Settings {
    return {
      ajax: url,
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'First name',
        data: 'firstName'
      }, {
        title: 'Last name',
        data: 'lastName'
      }]
    };
  }

  secondapi(){
    this.dtOptions[1] = this.buildDtOptions('https://angular-datatables-demo-server.herokuapp.com/');
  }
}

