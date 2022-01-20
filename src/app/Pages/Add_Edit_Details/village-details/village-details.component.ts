import { Component,AfterViewInit, OnInit,ViewChild } from '@angular/core';
import {  NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ModelServiceService } from 'src/app/services/model-service.service';
import { AddEditVillagePopupComponent } from './add-edit-village-popup/add-edit-village-popup.component';
import { VillageDetailsDataModel,VillageChainage ,AddOrUpdateVillageDataModel} from '../Add_Edit_Details.model';
import { StateDetails,DistrictDetails,TalukaDetails,VillageDetails} from 'src/app/Pages/dropdowns/dropdown.model';

@Component({
  selector: 'app-village-details',
  templateUrl: './village-details.component.html',
  styleUrls: ['./village-details.component.css']
})
export class VillageDetailsComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  // dtOptions: any = {};
  dtOptions: DataTables.Settings = {};
  datatable: any;

  _VillageDetailsDataModel : VillageDetailsDataModel;
  DisableInputField : boolean = true;
  
  _AddOrUpdateVillageDataModel : AddOrUpdateVillageDataModel;
  constructor(
    public modelServiceService : ModelServiceService,
    ){ 
      this._VillageDetailsDataModel = new VillageDetailsDataModel();
      this._AddOrUpdateVillageDataModel = new AddOrUpdateVillageDataModel();
      
    }

  ngOnInit(): void 
    {
      this.dtOptions = 
        {
          pagingType: 'full_numbers',
          pageLength: 10,
        };
      // if data table value is null on page load that time its gives error
      //that's why used this sample data
      this._VillageDetailsDataModel.VillageChainage = [
        {
          "SNo": 1,
          "ChainageFrom": 543,
          "ChainageTo": 326,
          "SurveyorName": "gdfhgdfh"
      }];
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
    if(argResult !="dismiss")
    {
      this._VillageDetailsDataModel.VillageDetails  = argResult.VillageDetails;
      this._VillageDetailsDataModel.VillageChainage = argResult.VillageChainage;
      console.log(this._VillageDetailsDataModel.VillageChainage);
      this.rerenderDataTable()
      
      
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
