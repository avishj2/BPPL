import { Injectable } from '@angular/core';
import MenuData from 'src/assets/Dashboard/menu.json';
import { MenuOption } from 'src/app/Model/Base.model';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  private config: MenuOption[] ;
  private apiUrl: any;

  constructor(private httpservice : HttpService) {
  }


  getConfiguration(): MenuOption[] {
    return MenuData; //this.config;
  }

  getApiUrl(): string {
    return this.apiUrl.url;
  }

  async LoadJsons(): Promise<any> { 

    //this.config = await this.httpservice.get(environment.Menu,null).toPromise();// .map(res => res.json())
    this.apiUrl = await this.httpservice.get(environment.Url,null).toPromise();// .map(res => res.json())    
  } 
}