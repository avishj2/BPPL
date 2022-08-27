import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../SharedModule';
import { ViewGazetteRoutingModule } from './view-gazette-routing.module';
import { ViewGazetteComponent } from './view-gazette.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    ViewGazetteRoutingModule,
    FormsModule,ReactiveFormsModule ,
    SharedModule,
    NgbModule,
    DataTablesModule,
    NgSelectModule,
  ],
  declarations: [ViewGazetteComponent],

})
export class ViewGazetteModule { }