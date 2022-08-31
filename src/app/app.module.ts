import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule ,NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngb-modal';
import { NgbModule ,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { BreadCrumbComponent } from 'src/app/dash-board/breadcrumb.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertsModule } from 'angular-alert-module';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DialogService } from './services/dialog.service';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { TwoDigitDecimaNumberDirective } from './Pages/filters/two-digit-decima-number.directive';
import { MasterDetailsComponent } from './Pages/master-details/master-details.component';
import { TerminalsDetailsComponent } from './Pages/Survey_Details/terminals-details/terminals-details.component';
import { AddAdhocdetailsComponent } from './Pages/Survey_Details/adhoc-payment-details/add-adhocdetails/add-adhocdetails.component';
import { RegionDetailsComponent } from './Pages/ProjectManagement/region-details/region-details.component';
import { HttpInterceptorService } from './services/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    BreadCrumbComponent,
    LoginComponent,
    TwoDigitDecimaNumberDirective,
    MasterDetailsComponent,
    TerminalsDetailsComponent,
    AddAdhocdetailsComponent,
    RegionDetailsComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA], /// Added for the form validations.
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    ModalModule,
    NgbModule,
    DataTablesModule,
    NgSelectModule,
    HttpClientModule,
    AlertsModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      focusButton: 'confirm',
    }),
    NgMultiSelectDropDownModule.forRoot(),
    NgxSpinnerModule,
  ],
  providers: [DialogService,NgbActiveModal,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
