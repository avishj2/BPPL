import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectRoutingModule } from './project-routing.module';
import {ProjectPageComponent } from './project-page.component';


@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    NgbModule
  ],
  declarations: [ProjectPageComponent]

})
export class ProjectPageModule { }