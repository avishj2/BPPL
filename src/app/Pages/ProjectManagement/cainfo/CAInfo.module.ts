import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CAInfoRoutingModule } from './CAInfo-routing.module';
import {CAInfoComponent } from './cainfo.component';


@NgModule({
  imports: [
    CommonModule,
    CAInfoRoutingModule,
    FormsModule,NgbModule
  ],
  declarations: [CAInfoComponent]

})
export class CAInfoModule { }