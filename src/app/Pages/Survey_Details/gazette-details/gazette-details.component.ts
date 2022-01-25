import { Component, OnInit } from '@angular/core';
import { GazetteFormDataModel } from '../Survey_Details.model';

@Component({
  selector: 'app-gazette-details',
  templateUrl: './gazette-details.component.html',
  styleUrls: ['./gazette-details.component.css']
})
export class GazetteDetailsComponent implements OnInit {
  _GazetteFormDataModel : GazetteFormDataModel;
  
  constructor() 
    { 
      this._GazetteFormDataModel = new GazetteFormDataModel();
    }

  ngOnInit(): void {

  }

  submit(){
    console.log("GazetteFields",this._GazetteFormDataModel.GazetteFields)
  }

}
