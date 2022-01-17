import { Component,AfterViewInit, OnInit,ViewChild } from '@angular/core';
import {  NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ModelServiceService } from 'src/app/services/model-service.service';
import { AGITerminalsDataModel} from 'src/app/Pages/Add_Edit_Details/Add_Edit_Details.model';
import { AddEditTerminalPopupComponent } from './add-edit-terminal-popup/add-edit-terminal-popup.component';

@Component({
  selector: 'app-terminals-details',
  templateUrl: './terminals-details.component.html',
  styleUrls: ['./terminals-details.component.css']
})
export class TerminalsDetailsComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: any = {};
  datatable: any;
  DisableInputField : boolean = true;
  _AGITerminalsDataModel : AGITerminalsDataModel;

  constructor(public modelServiceService : ModelServiceService,)
    {
      this._AGITerminalsDataModel = new AGITerminalsDataModel();
    }
  

  ngOnInit(): void {
    // this._AGITerminalsDataModel.AGITerminalsDetails
    this.dtOptions = 
      {
        pagingType: 'full_numbers',
        pageLength: 10,//onpage load loaded 5 rows, datatable bydefault shows 10 rows
      };
  }
  
  OpenAddPopupModel(){
    /**NgbModalOptions  add some option in ngbmodel  */
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',//outside click to not close pop-up model
      keyboard : false,
      size: 'lg'
    };
    /**pass data to child popup model */
    let Data 
    let dataForChildPopUp = 
      {
         Data :  "Add"
      }

    /**open pop-up model using model service function */
    this.modelServiceService.ShowPopUP(AddEditTerminalPopupComponent,ngbModalOptions,dataForChildPopUp,
    null,null);  
  }
  OpenEditPopupModel(){
     /**NgbModalOptions  add some option in ngbmodel  */
     let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
      size: 'lg'
    };
    /**pass data to child popup model */
    let Data 
    let dataForChildPopUp = 
      {
         Data :  "Edit"
      }

    /**open pop-up model using model service function */
    this.modelServiceService.ShowPopUP(AddEditTerminalPopupComponent,ngbModalOptions,dataForChildPopUp,
    null,null);  
  }

}
