import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CrossingRoutingModule} from './crossing-routing.module';
import {CrossingDetailsComponent } from './crossing-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FiltersComponent } from '../../filters/filters.component';


@NgModule({
  imports: [
    CommonModule,
    CrossingRoutingModule,
    FormsModule, NgbModule,
  ],
  declarations: [CrossingDetailsComponent,FiltersComponent],

})
export class CrossingModule { }