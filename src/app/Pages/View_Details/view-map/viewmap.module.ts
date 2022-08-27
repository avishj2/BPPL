import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../SharedModule';
import { ViewMapRoutingModule } from './viewmap-routing.module';
import { ViewMapComponent } from './view-map.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    ViewMapRoutingModule,
    FormsModule,ReactiveFormsModule ,
    SharedModule,
    NgbModule,
    DataTablesModule,
    NgSelectModule,
  ],
  declarations: [ViewMapComponent],

})
export class ViewMapModule { }