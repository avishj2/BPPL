import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { APIUtilityService } from '../services/APIUtility.service';
import { ConfigService } from '../services/config.service';
import { UrlService } from '../services/url.service';

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
  _Login_Logo : string;

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private apiUtility : APIUtilityService,
      private configService : ConfigService,
      private urlService : UrlService
    ) { }

  async ngOnInit() {
    await this.configService.LoadJsons();
    this.urlService.setUrl(this.configService.getApiUrl());
    this._returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard';
    this._Login_Logo = this.configService.getLoginLogo();
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
                  console.log(error.error);
                    this._error = error.error.Message;
                   // this.loading = false;
                });
    //this.router.navigateByUrl('dashboard');
    //location.replace("/dashboard");
    // Call api get authenticated .. store token in cokies and then refresh dashboard
  }
}
