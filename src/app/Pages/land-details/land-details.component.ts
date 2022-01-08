import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-land-details',
  templateUrl: './land-details.component.html',
  styleUrls: ['./land-details.component.css']
})
export class LandDetailsComponent implements OnInit {
_LandTypes; 
LandTypes = ["Urban/Built-up Land","Agricultural Land","Rangeland","Forest Land","Water Areas","Wetland","Barren Land","Tundra"]

  constructor() { 
    this._LandTypes = this.LandTypes;
  }

  

  ngOnInit(): void {
  }

}
