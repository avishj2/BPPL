import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../SharedModule';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    FormsModule,ReactiveFormsModule ,
    SharedModule,
    NgbModule,
    DataTablesModule,
    NgSelectModule,
  ],
  declarations: [ConfigurationComponent],

})
export class ConfigurationModule { }