import { Injectable } from '@angular/core';
import MenuData from 'src/assets/Dashboard/menu.json';

import CenterLine from 'src/assets/GeoJson/Center_line.json';
import CSPoint from 'src/assets/GeoJson/CS_POINT.json';
import KhasrBoundry from 'src/assets/GeoJson/Khasra_boundary.json';
import ROW from 'src/assets/GeoJson/ROW.json';
import VIllageBoundry from 'src/assets/GeoJson/Village_boundary.json';
import TPPoint from 'src/assets/GeoJson/TP.json';
import Chainage from 'src/assets/GeoJson/Chainage.json';
import Borewell from 'src/assets/GeoJson/Borewell.json';
import Building from 'src/assets/GeoJson/Building.json';
import Compound_Wall from 'src/assets/GeoJson/Compound_wall.json';
import Plantation from 'src/assets/GeoJson/Plantation.json';
import Pond from 'src/assets/GeoJson/Pond.json';
import Text_highlight from 'src/assets/GeoJson/Text_highlight.json';
import Water_Tank from 'src/assets/GeoJson/Water_Tank.json';
import Well from 'src/assets/GeoJson/Well.json';

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

  getCenterLine(): any {
    return CenterLine; //this.config;
  }
  getCSPoint(): any {
    return CSPoint; //this.config;
  }
  getKhasrBoundry(): any {
    return KhasrBoundry; //this.config;
  }
  getROW(): any {
    return ROW; //this.config;
  }
  getVIllageBoundry(): any {
    return VIllageBoundry; //this.config;
  }

  getTPPoint(): any{
    return TPPoint;
  }

  getChainage(): any{
    return Chainage;
  }

  getBorewell(): any{
    return Borewell;
  }

  getBuilding(): any{
    return Building;
  }

  getCompound_Wall(): any{
    return Compound_Wall;
  }

  getPlantation(): any{
    return Plantation;
  }

  getPond(): any{
    return Pond;
  }

  getTexthightlight(): any{
    return Text_highlight;
  }

  getWaterTank(): any{
    return Water_Tank;
  }

  getWell(): any{
    return Well;
  }

  getApiUrl(): string {
    return this.apiUrl.url;
  }

  getLoginLogo(): string {
    return this.apiUrl.login_logo; 
  }

  async LoadJsons(): Promise<any> { 

    //this.config = await this.httpservice.get(environment.Menu,null).toPromise();// .map(res => res.json())
    this.apiUrl = await this.httpservice.get(environment.Url,null).toPromise();// .map(res => res.json())    
  } 
}