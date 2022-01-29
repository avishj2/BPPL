import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule ,NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngb-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BreadCrumbComponent } from 'src/app/dash-board/breadcrumb.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AlertsModule } from 'angular-alert-module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LoginComponent } from './login/login.component';
import { FiltersComponent } from 'src/app/Pages/filters/filters.component';
import { DialogService } from './services/dialog.service';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';


import { TwoDigitDecimaNumberDirective } from './Pages/filters/two-digit-decima-number.directive';
import { MasterDetailsComponent } from './Pages/master-details/master-details.component';
import { LandDetailsComponent } from './Pages/land-details/land-details.component';
import { PreEngineeringComponent } from './Pages/Survey_Details/pre-engineering/pre-engineering.component';
import { GazetteDetailsComponent } from './Pages/Survey_Details/gazette-details/gazette-details.component';
import { VillageDetailsComponent } from './Pages/Survey_Details/village-details/village-details.component';
import { CrossingDetailsComponent } from './Pages/Survey_Details/crossing-details/crossing-details.component';
import { TerminalsDetailsComponent } from './Pages/Survey_Details/terminals-details/terminals-details.component';
import { AdhocPaymentDetailsComponent } from './Pages/Survey_Details/adhoc-payment-details/adhoc-payment-details.component';
import { ViewVillageDetailsComponent } from './Pages/View_Details/view-village-details/view-village-details.component';


@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    BreadCrumbComponent,
    LoginComponent,
    FiltersComponent,
    TwoDigitDecimaNumberDirective,
    MasterDetailsComponent,
    LandDetailsComponent,
    PreEngineeringComponent,
    GazetteDetailsComponent,
    VillageDetailsComponent,
    CrossingDetailsComponent,
    TerminalsDetailsComponent,
    AdhocPaymentDetailsComponent,
    ViewVillageDetailsComponent
  ],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA], /// Added for the form validations.
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModalModule,
    NgbModule,
    DataTablesModule,
    BreadcrumbModule,
    NgSelectModule,
    HttpClientModule,
    AlertsModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      focusButton: 'confirm',
    }),
  ],
  providers: [DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
