import { AfterViewInit, Component, OnDestroy, OnInit,Input,Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ShowUploadedDocModel ,CategoryDataModel,AddDocuments} from '../Add_Edit_Details.model';

@Component({
  selector: 'app-pre-engineering',
  templateUrl: './pre-engineering.component.html',
  styleUrls: ['./pre-engineering.component.css']
})

export class PreEngineeringComponent implements AfterViewInit, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  _ShowUploadedDocModel : ShowUploadedDocModel;
  _CategoryDataModel :CategoryDataModel;
  _CategoryID : any;
  _AddDocuments : AddDocuments;
  _IsGazette : boolean; //
  constructor(){
    this._ShowUploadedDocModel = new ShowUploadedDocModel();
    this._CategoryDataModel = new CategoryDataModel()
    this._AddDocuments = new AddDocuments();
   }

  ngOnInit(): void {
    this._CategoryDataModel.ReadFromString()
    this._AddDocuments.ReadJson();
    this.dtOptions = 
      {
        pagingType: 'full_numbers',
        pageLength: 10,//onpage load loaded 5 rows, datatable bydefault shows 10 rows
      };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  /**In Input Box add only numbric values */
  NumberOnly(event): boolean 
  {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  openDocument(){
    let url = "http://www.africau.edu/images/default/sample.pdf";
    window.open(url);
  }
}
