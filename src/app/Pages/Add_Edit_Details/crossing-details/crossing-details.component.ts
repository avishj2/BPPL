import { Component, OnInit } from '@angular/core';
import { CrossDetailsDataModel } from 'src/app/Pages/Add_Edit_Details/Add_Edit_Details.model';

@Component({
  selector: 'app-crossing-details',
  templateUrl: './crossing-details.component.html',
  styleUrls: ['./crossing-details.component.css']
})
export class CrossingDetailsComponent implements OnInit {
_CrossDetailsDataModel : CrossDetailsDataModel;

  constructor() { 
    this._CrossDetailsDataModel = new CrossDetailsDataModel();
   }

  ngOnInit(): void {
    this._CrossDetailsDataModel.CrossDetails
  }

}
