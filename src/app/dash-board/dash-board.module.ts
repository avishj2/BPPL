import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board.component';
import { FormsModule } from '@angular/forms';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    FormsModule,NgbModule,NgxSpinnerModule,
    DataTablesModule
  ],
  declarations: [DashBoardComponent]

})
export class DashBoardModule { }