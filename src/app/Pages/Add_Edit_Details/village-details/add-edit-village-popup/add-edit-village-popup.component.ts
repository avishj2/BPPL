import { Component, OnInit, Input} from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { VillageDetailsDataModel ,VillageChainage ,VillageChainageColl} from 'src/app/Pages/Add_Edit_Details/Add_Edit_Details.model';

@Component({
  selector: 'app-add-edit-village-popup',
  templateUrl: './add-edit-village-popup.component.html',
  styleUrls: ['./add-edit-village-popup.component.css']
})
export class AddEditVillagePopupComponent implements OnInit {
  model: NgbDateStruct;
  @Input() public fromParent;
  _modelTitle : string;
  _VillageDetailsDataModel : VillageDetailsDataModel;
  containers = [];
  _AddOrEdit : string;
  _ChainageDetailsArray = [];
  _VillageChainage : VillageChainage[];

  //test
  _VillageChainageColl : VillageChainageColl;

  constructor(
    public activeModal: NgbActiveModal,
    ){ 
      this._VillageDetailsDataModel = new VillageDetailsDataModel();
      /**TEST */
      this._VillageChainageColl = new VillageChainageColl();
      this._VillageChainage = [];
      
    }

  ngOnInit(): void 
  {
      /**get data from parent component */
      this._AddOrEdit =  this.fromParent.Data;
      if(this._AddOrEdit == "Add"){
        this._modelTitle = "Add";
        this._ChainageDetailsArray.push(this._VillageChainage);
      }
      else{
        this._modelTitle = "Edit";
        this._VillageChainageColl.ReadJson();
        this._ChainageDetailsArray = this._VillageChainageColl.VillageChainage;
      }
      
      // this._VillageChainage.push(this._VillageChainage.map())
  }
  /** Submit add/edit village information to db */
  SubmitDetails()
    {
      this._VillageChainageColl.VillageChainage = this._ChainageDetailsArray;
      this._VillageDetailsDataModel.VillageChainage = this._VillageChainageColl.VillageChainage
      console.log(this._VillageDetailsDataModel);
      this.closeModal(this._VillageDetailsDataModel);
    }
  
  AddChainageDetailsDiv() {
    this._ChainageDetailsArray.push(this._VillageDetailsDataModel.VillageChainage);
    console.log("_ChainageDetailsArray",this._ChainageDetailsArray);
    this.closeModal(this._VillageDetailsDataModel);
  }

  /**add ChainageFrom values in array */
  ChangeChainageFrom(position: any, values: any)
  {
    this._VillageDetailsDataModel.VillageChainage[position].ChainageFrom = values;  
    console.log(this._VillageDetailsDataModel.VillageChainage)
  }

  /**add ChainageTo values in array */
  ChangeChainageTo(position: any, values: any)
  {
    this._VillageDetailsDataModel.VillageChainage[position].ChainageTo = values;  
  }

  ChangeSurveyorName(position: any, values: any)
  {
    this._VillageDetailsDataModel.VillageChainage[position].SurveyorName = values;  
  }


  /**close open model cross-arrow icon top-right side */
  closeModal(sendData) 
    {
      this.activeModal.close(sendData);
    } 

}
