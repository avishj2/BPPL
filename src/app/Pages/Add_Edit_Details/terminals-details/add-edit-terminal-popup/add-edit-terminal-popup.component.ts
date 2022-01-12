import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AGITerminalsDataModel} from 'src/app/Pages/Add_Edit_Details/Add_Edit_Details.model';

@Component({
  selector: 'app-add-edit-terminal-popup',
  templateUrl: './add-edit-terminal-popup.component.html',
  styleUrls: ['./add-edit-terminal-popup.component.css']
})
export class AddEditTerminalPopupComponent implements OnInit {
  model: NgbDateStruct;
  @Input() public fromParent;
  _modelTitle : string;
  _AGITerminalsDataModel : AGITerminalsDataModel;
  constructor(public activeModal: NgbActiveModal,
    ){ 
      this._AGITerminalsDataModel = new AGITerminalsDataModel();
    }

  ngOnInit(): void {
    /**get data from parent component */
    let data =  this.fromParent.Data;
    if(data == "Add"){
      this._modelTitle = "Add";
    }
    else{
      this._modelTitle = "Edit";
    }
  }
  SubmitDetails(){

  }
  
/**close open model cross-arrow icon top-right side */
closeModal(sendData) 
  {
    this.activeModal.close(sendData);
  } 
}
