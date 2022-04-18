import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(
      private router: Router,
    ) { }

  ngOnInit(): void {
  }


  Submit(){
    // this.utilityHttp.doLogin(this._login);
    //this.storage.set('loginDetails',{}); 
    localStorage.setItem('loginDetails', JSON.stringify({}));
    // this.router.navigate(['/dashboard']); 
    this.router.navigateByUrl('dashboard');
    //location.replace("/dashboard");
    // Call api get authenticated .. store token in cokies and then refresh dashboard
  }
}
