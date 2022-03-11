import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule ,NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngb-modal';
import { NgbModule ,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BreadCrumbComponent } from 'src/app/dash-board/breadcrumb.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AlertsModule } from 'angular-alert-module';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LoginComponent } from './login/login.component';
import { FiltersComponent } from 'src/app/Pages/filters/filters.component';
import { DialogService } from './services/dialog.service';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { TwoDigitDecimaNumberDirective } from './Pages/filters/two-digit-decima-number.directive';
import { MasterDetailsComponent } from './Pages/master-details/master-details.component';
import { PreEngineeringComponent } from './Pages/Survey_Details/pre-engineering/pre-engineering.component';
import { GazetteDetailsComponent } from './Pages/Survey_Details/gazette-details/gazette-details.component';
import { VillageDetailsComponent } from './Pages/Survey_Details/village-details/village-details.component';
import { CrossingDetailsComponent } from './Pages/Survey_Details/crossing-details/crossing-details.component';
import { TerminalsDetailsComponent } from './Pages/Survey_Details/terminals-details/terminals-details.component';
import { AdhocPaymentDetailsComponent } from './Pages/Survey_Details/adhoc-payment-details/adhoc-payment-details.component';
import { ViewVillageDetailsComponent } from './Pages/View_Details/view-village-details/view-village-details.component';
import { TestLoginComponent } from './test-login/test-login.component';
import { SurveyDetailsComponent } from './Pages/Survey_Details/survey-details/survey-details.component';
import { CropDetailsComponent } from './Pages/Survey_Details/survey-details/crop-details/crop-details.component';
import { TreeDetailsComponent } from './Pages/Survey_Details/survey-details/tree-details/tree-details.component';
import { OwnerDetailsComponent } from './Pages/Survey_Details/survey-details/owner-details/owner-details.component';
import { RevenueFormComponent } from './Pages/Survey_Details/survey-details/revenue-form/revenue-form.component';
import { RestorationDetailsComponent } from './Pages/Survey_Details/survey-details/restoration-details/restoration-details.component';
import { GazetteNoticeDetailsComponent } from './Pages/Survey_Details/survey-details/gazette-notice-details/gazette-notice-details.component';
import { LandDetailsComponent } from './Pages/Survey_Details/survey-details/land-details/land-details.component';

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
    ViewVillageDetailsComponent,
    TestLoginComponent,
    SurveyDetailsComponent,
    CropDetailsComponent,
    TreeDetailsComponent,
    OwnerDetailsComponent,
    RevenueFormComponent,
    RestorationDetailsComponent,
    GazetteNoticeDetailsComponent
  ],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA], /// Added for the form validations.
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [DialogService,NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
