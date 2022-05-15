import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { APIUtilityService } from '../services/APIUtility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public _userName : string;
  public _password : string;
  _returnUrl: string;
  _error = '';

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private apiUtility : APIUtilityService
    ) { }

  ngOnInit(): void {
    this._returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard';

  }


  Submit(){
    if(!this._userName || !this._password)
    {
       this._error = "Username and password is mendatory !";
       return;
    }

    this.apiUtility.login(this._userName,this._password)
    .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this._returnUrl]);
                },
                error => {
                    this._error = error.error.Message;
                   // this.loading = false;
                });;
    //this.router.navigateByUrl('dashboard');
    //location.replace("/dashboard");
    // Call api get authenticated .. store token in cokies and then refresh dashboard
  }
}
