import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../SharedModule';
import { VillageDetailsRoutingModule } from './villagedetails-routing.module';
import {VillageDetailsComponent } from './village-details.component';

@NgModule({
  imports: [
    CommonModule,
    VillageDetailsRoutingModule,
    FormsModule,ReactiveFormsModule ,
    NgbModule,
    DataTablesModule,
    NgSelectModule,
    SharedModule
  ],
  declarations: [VillageDetailsComponent],

})
export class VillageDetailsModule { }