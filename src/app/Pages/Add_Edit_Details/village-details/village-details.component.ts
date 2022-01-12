import { Component,AfterViewInit, OnInit,ViewChild } from '@angular/core';
import {  NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ModelServiceService } from 'src/app/services/model-service.service';
import { AddEditVillagePopupComponent } from './add-edit-village-popup/add-edit-village-popup.component';
import { VillageDetailsDataModel} from '../Add_Edit_Details.model';

@Component({
  selector: 'app-village-details',
  templateUrl: './village-details.component.html',
  styleUrls: ['./village-details.component.css']
})
export class VillageDetailsComponent implements AfterViewInit, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
_VillageDetailsDataModel : VillageDetailsDataModel;
  constructor(
    public modelServiceService : ModelServiceService,
    ){ 
      this._VillageDetailsDataModel = new VillageDetailsDataModel()
    }

  ngOnInit(): void 
    {
      this.dtOptions = 
        {
          pagingType: 'full_numbers',
          pageLength: 10,
        };
    }

  ngAfterViewInit(): void 
  {
    this.dtTrigger.next();
  }

  /**OPEN Edit village details Popup Model 
    * show process button 
    */
  OpenAddPopupModel()
   {
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
     this.modelServiceService.ShowPopUP(AddEditVillagePopupComponent,ngbModalOptions,dataForChildPopUp,
     null,null);  
   }

    /**OPEN Add/Edit village details Popup Model 
    * show process button 
    */
  OpenEditPopupModel()
    {
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
          //AttendanceRectificationData: argClickedObject,
          Data : "Edit"
        }
 
      /**open pop-up model using model service function */
      this.modelServiceService.ShowPopUP(AddEditVillagePopupComponent,ngbModalOptions,dataForChildPopUp,
        this.PopupReturn.bind(this),null);  
    }


    /**
   * Handles return object from the Village  model popup.
   * @param argResult 
   */
  PopupReturn(argResult)
  {
    console.log("dgiusa")
    if(argResult !="dismiss")
    {
      this._VillageDetailsDataModel.VillageDetails = argResult.VillageDetails;
     this._VillageDetailsDataModel.VillageChainage.push(argResult.VillageChainage);
      
    }
  }

  getTableData() {
    let headers: string[] = [];
    // this._VillageDetailsDataModel.VillageChainage = this._tableData
    if(this._VillageDetailsDataModel.VillageChainage) {
      this._VillageDetailsDataModel.VillageChainage.forEach((value) => 
      {
        Object.keys(value).forEach((key) => {
          if(!headers.find((header) => header == key)){
            headers.push(key)
          }
        })
      })
    }
    return headers;
  }
}
