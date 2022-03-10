import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css']
})
export class OwnerDetailsComponent implements OnInit {
  _DisabledInputField: boolean = false;
  _AddNewOwner : boolean;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it ?";

  constructor() { }

  ngOnInit(): void {
  
  }


  AddNewOwnerDetails(){

  }

  DeleteOwnerDetails(){

  }
  EditOwnerDetails(){

  }
}
