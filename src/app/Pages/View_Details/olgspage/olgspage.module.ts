import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../SharedModule';
import { OLGSPageRoutingModule } from './olgspage-routing.module';
import { OLGSPageComponent } from './olgspage.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { PopupPageComponent } from './popup-page/popup-page.component';

@NgModule({
  imports: [
    CommonModule,
    OLGSPageRoutingModule,
    FormsModule,ReactiveFormsModule ,
    SharedModule,
    NgbModule,
    DataTablesModule,
    NgSelectModule,
  ],
  declarations: [OLGSPageComponent, PopupPageComponent],

})
export class OLGSPageModule { }