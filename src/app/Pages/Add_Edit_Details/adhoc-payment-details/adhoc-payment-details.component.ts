import { Component, OnInit } from '@angular/core';
import { AdhocPaymentDataModel} from 'src/app/Pages/Add_Edit_Details/Add_Edit_Details.model';
import { ModelServiceService } from 'src/app/services/model-service.service';
import {  NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AdhocPaymentPopupComponent } from '../adhoc-payment-details/adhoc-payment-popup/adhoc-payment-popup.component';

@Component({
  selector: 'app-adhoc-payment-details',
  templateUrl: './adhoc-payment-details.component.html',
  styleUrls: ['./adhoc-payment-details.component.css']
})

export class AdhocPaymentDetailsComponent implements OnInit {
_AdhocPaymentDataModel : AdhocPaymentDataModel;
DisableInputField : boolean = true;

  constructor(
    public modelServiceService : ModelServiceService
  ) 
    {
      this._AdhocPaymentDataModel = new AdhocPaymentDataModel();
    }

  ngOnInit(): void {

  }

  /**open Edit Adhoc payment info popup model */
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
         Data :  "Edit"
      }

    /**open pop-up model using model service function */
    this.modelServiceService.ShowPopUP(AdhocPaymentPopupComponent,ngbModalOptions,dataForChildPopUp,
    null,null);  
  }

  /**open add Adhoc payment info popup model */
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
    this.modelServiceService.ShowPopUP(AdhocPaymentPopupComponent,ngbModalOptions,dataForChildPopUp,
    null,null);  
  }

}
