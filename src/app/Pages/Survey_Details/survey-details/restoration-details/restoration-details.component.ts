import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restoration-details',
  templateUrl: './restoration-details.component.html',
  styleUrls: ['./restoration-details.component.css']
})
export class RestorationDetailsComponent implements OnInit {
  _DisabledInputField: boolean = false;
  _AddNewDetails : boolean;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it ?";

  constructor() { }

  ngOnInit(): void {
  }

  AddNewRestorationDetails()
    {

    }


  EditRestorationDetails()
    {

    }


  DeleteRestorationDetails()
    {

    }

    SaveDetails(){
      
    }
}
