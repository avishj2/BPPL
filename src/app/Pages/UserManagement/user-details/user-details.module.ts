import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";
import { UserDetailsRoutingModule } from './user-details-routing.module';
import { UserDetailsComponent } from './user-details.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    UserDetailsRoutingModule,
    FormsModule,NgbModule,NgxSpinnerModule,
    ConfirmationPopoverModule.forRoot({
        focusButton: 'confirm',
      }),
    DataTablesModule
  ],
  declarations: [UserDetailsComponent]

})
export class UserDetailsModule { }