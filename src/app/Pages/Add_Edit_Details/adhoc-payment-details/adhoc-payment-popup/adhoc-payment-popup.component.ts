import { Component, OnInit ,Input} from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AGITerminalsDataModel} from 'src/app/Pages/Add_Edit_Details/Add_Edit_Details.model';
import { AdhocPaymentDataModel} from 'src/app/Pages/Add_Edit_Details/Add_Edit_Details.model';


@Component({
  selector: 'app-adhoc-payment-popup',
  templateUrl: './adhoc-payment-popup.component.html',
  styleUrls: ['./adhoc-payment-popup.component.css']
})
export class AdhocPaymentPopupComponent implements OnInit {
  model: NgbDateStruct;
  @Input() public fromParent;
  _modelTitle : string;
  _AdhocPaymentDataModel : AdhocPaymentDataModel;

  constructor(public activeModal: NgbActiveModal) 
  { 
    this._AdhocPaymentDataModel = new AdhocPaymentDataModel();
  }

  ngOnInit(): void 
    {
      /**get data from parent component */
      let data =  this.fromParent.Data;
      if(data == "Add"){
        this._modelTitle = "Add";
      }
      else{
        this._modelTitle = "Edit";
      }
    }

  SubmitDetails()
    {


    }

    /**close open model cross-arrow icon top-right side */
    closeModal(sendData) 
    {
      this.activeModal.close(sendData);
    } 

}
