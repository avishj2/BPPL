import { Component } from '@angular/core';
import { User } from './Model/Base.model';
import { APIUtilityService } from './services/APIUtility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NoticeDistributionwebsite';
  currentUser: User;
  /**
   *
   */
  constructor(private apiUtilityService: APIUtilityService) {    
    this.apiUtilityService.currentUser.subscribe(x => this.currentUser = x);
  }
}
