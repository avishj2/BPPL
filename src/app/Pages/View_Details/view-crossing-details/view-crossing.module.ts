import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../SharedModule';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ViewCrossingDetailsComponent } from './view-crossing-details.component';
import { ViewCrossingDetailsRoutingModule } from './view-crossing-routing.module';
import { ChildViewCrossingComponent } from './child-view-crossing/child-view-crossing.component';

@NgModule({
  imports: [
    CommonModule,
    ViewCrossingDetailsRoutingModule,
    FormsModule,ReactiveFormsModule ,
    SharedModule,
    NgbModule,
    DataTablesModule,
    NgSelectModule,
  ],
  declarations: [ViewCrossingDetailsComponent,ChildViewCrossingComponent],

})
export class ViewCrossingDetailsModule { }