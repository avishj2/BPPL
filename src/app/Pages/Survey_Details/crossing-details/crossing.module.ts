import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CrossingRoutingModule} from './crossing-routing.module';
import {CrossingDetailsComponent } from './crossing-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FiltersComponent } from '../../filters/filters.component';
import { SharedModule } from '../../../SharedModule';

@NgModule({
  imports: [
    CommonModule,
    CrossingRoutingModule,
    FormsModule, NgbModule,SharedModule
  ],
  declarations: [CrossingDetailsComponent],
})
export class CrossingModule { }