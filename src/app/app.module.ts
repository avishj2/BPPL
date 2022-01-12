import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule ,NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngb-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BreadCrumbComponent } from 'src/app/dash-board/breadcrumb.component';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LoginComponent } from './login/login.component';
import { DropdownsComponent } from './Pages/dropdowns/dropdowns.component';
import { TwoDigitDecimaNumberDirective } from './Pages/dropdowns/two-digit-decima-number.directive';
import { MasterDetailsComponent } from './Pages/master-details/master-details.component';
import { LandDetailsComponent } from './Pages/land-details/land-details.component';
import { PreEngineeringComponent } from './Pages/Add_Edit_Details/pre-engineering/pre-engineering.component';
import { GazetteDetailsComponent } from './Pages/Add_Edit_Details/gazette-details/gazette-details.component';
import { VillageDetailsComponent } from './Pages/Add_Edit_Details/village-details/village-details.component';
import { AddEditVillagePopupComponent } from './Pages/Add_Edit_Details/village-details/add-edit-village-popup/add-edit-village-popup.component';
import { CrossingDetailsComponent } from './Pages/Add_Edit_Details/crossing-details/crossing-details.component';
import { TerminalsDetailsComponent } from './Pages/Add_Edit_Details/terminals-details/terminals-details.component';
import { AddEditTerminalPopupComponent } from './Pages/Add_Edit_Details/terminals-details/add-edit-terminal-popup/add-edit-terminal-popup.component';
import { AdhocPaymentDetailsComponent } from './Pages/Add_Edit_Details/adhoc-payment-details/adhoc-payment-details.component';
import { AdhocPaymentPopupComponent } from './Pages/Add_Edit_Details/adhoc-payment-details/adhoc-payment-popup/adhoc-payment-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    BreadCrumbComponent,
    LoginComponent,
    DropdownsComponent,
    TwoDigitDecimaNumberDirective,
    MasterDetailsComponent,
    LandDetailsComponent,
    PreEngineeringComponent,
    GazetteDetailsComponent,
    VillageDetailsComponent,
    AddEditVillagePopupComponent,
    CrossingDetailsComponent,
    TerminalsDetailsComponent,
    AddEditTerminalPopupComponent,
    AdhocPaymentDetailsComponent,
    AdhocPaymentPopupComponent
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
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
