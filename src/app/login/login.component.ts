import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(
      private router: Router,
      public storage: StorageService
    ) { }

  ngOnInit(): void {
  }


  Submit(){
    // this.utilityHttp.doLogin(this._login);
    this.storage.set('loginDetails',{}); 
    this.router.navigate(['/dashboard']); 
  }
}
