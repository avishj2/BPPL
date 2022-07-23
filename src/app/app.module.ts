import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule ,NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngb-modal';
import { NgbModule ,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BreadCrumbComponent } from 'src/app/dash-board/breadcrumb.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertsModule } from 'angular-alert-module';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSpinnerModule } from "ngx-spinner";
// import { HttpService } from 'src/app/services/http.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LoginComponent } from './login/login.component';
import { FiltersComponent } from 'src/app/Pages/filters/filters.component';
import { DialogService } from './services/dialog.service';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { TwoDigitDecimaNumberDirective } from './Pages/filters/two-digit-decima-number.directive';
import { MasterDetailsComponent } from './Pages/master-details/master-details.component';
import { SurveyDocumentsComponent } from './Pages/Survey_Details/survey-documents/survey-documents.component';
import { GazetteDetailsComponent } from './Pages/Survey_Details/gazette-details/gazette-details.component';
import { VillageDetailsComponent } from './Pages/Survey_Details/village-details/village-details.component';
import { CrossingDetailsComponent } from './Pages/Survey_Details/crossing-details/crossing-details.component';
import { TerminalsDetailsComponent } from './Pages/Survey_Details/terminals-details/terminals-details.component';
import { AdhocPaymentDetailsComponent } from './Pages/Survey_Details/adhoc-payment-details/adhoc-payment-details.component';
import { ViewVillageDetailsComponent } from './Pages/View_Details/view-village-details/view-village-details.component';
import { SurveyDetailsComponent } from './Pages/Survey_Details/survey-details/survey-details.component';
import { CropDetailsComponent } from './Pages/Survey_Details/survey-details/crop-details/crop-details.component';
import { TreeDetailsComponent } from './Pages/Survey_Details/survey-details/tree-details/tree-details.component';
import { OwnerDetailsComponent } from './Pages/Survey_Details/survey-details/owner-details/owner-details.component';
import { RevenueFormComponent } from './Pages/Survey_Details/survey-details/revenue-form/revenue-form.component';
import { RestorationDetailsComponent } from './Pages/Survey_Details/survey-details/restoration-details/restoration-details.component';
import { GazetteNoticeDetailsComponent } from './Pages/Survey_Details/survey-details/gazette-notice-details/gazette-notice-details.component';
import { LandDetailsComponent } from './Pages/Survey_Details/survey-details/land-details/land-details.component';
import { CropRatesComponent } from './Pages/Survey_Details/crop-rates/crop-rates.component';
import { LandRatesComponent } from './Pages/Survey_Details/land-rates/land-rates.component';
import { ViewCrossingDetailsComponent } from './Pages/View_Details/view-crossing-details/view-crossing-details.component';
import { ChildViewCrossingComponent } from './Pages/View_Details/view-crossing-details/child-view-crossing/child-view-crossing.component';
import { ViewAlignmentReportsComponent } from './Pages/View_Details/view-alignment-reports/view-alignment-reports.component';
import { ViewProjectReportsComponent } from './Pages/View_Details/view-project-reports/view-project-reports.component';
import { ViewAwardReportsComponent } from './Pages/View_Details/view-award-reports/view-award-reports.component';
import { ViewSurveyTabsComponent } from './Pages/View_Details/view-survey-tabs/view-survey-tabs.component';
import { ViewLandDetailsComponent } from './Pages/View_Details/view-survey-tabs/view-land-details/view-land-details.component';
import { ViewTreeDetailsComponent } from './Pages/View_Details/view-survey-tabs/view-tree-details/view-tree-details.component';
import { ViewCropDetailsComponent } from './Pages/View_Details/view-survey-tabs/view-crop-details/view-crop-details.component';
import { ViewOwnerDetailsComponent } from './Pages/View_Details/view-survey-tabs/view-owner-details/view-owner-details.component';
import { ViewCompensationDetailsComponent } from './Pages/View_Details/view-survey-tabs/view-compensation-details/view-compensation-details.component';
import { ViewRevenueFormsComponent } from './Pages/View_Details/view-survey-tabs/view-revenue-forms/view-revenue-forms.component';
import { ViewRestorationComponent } from './Pages/View_Details/view-survey-tabs/view-restoration/view-restoration.component';
import { LAQPermanentComponent } from './Pages/View_Details/laqpermanent/laqpermanent.component';
import { AddAdhocdetailsComponent } from './Pages/Survey_Details/adhoc-payment-details/add-adhocdetails/add-adhocdetails.component';
import { ProjectPageComponent } from './Pages/ProjectManagement/project-page/project-page.component';
import { CAInfoComponent } from './Pages/ProjectManagement/cainfo/cainfo.component';
import { RegionDetailsComponent } from './Pages/ProjectManagement/region-details/region-details.component';
import { ViewGazetteComponent } from './Pages/View_Details/view-gazette/view-gazette.component';
import { CompensationComponent } from './Pages/Survey_Details/survey-details/compensation/compensation.component';
import { ViewMapComponent } from './Pages/View_Details/view-map/view-map.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { ConfigurationComponent } from './Pages/Survey_Details/configuration/configuration.component';
import { LegalDocumentsComponent } from './Pages/Survey_Details/legal-documents/legal-documents.component';
import { FarmerNocDetailsComponent } from './Pages/Survey_Details/survey-details/farmer-noc-details/farmer-noc-details.component';
import { ViewFarmerNocComponent } from './Pages/View_Details/view-survey-tabs/view-farmer-noc/view-farmer-noc.component';
import { SOMappingComponent } from './Pages/Survey_Details/somapping/somapping.component';
import { SVIPSDetailsComponent } from './Pages/Survey_Details/svipsdetails/svipsdetails.component';
import { ViewSVIPSDetailsComponent } from './Pages/View_Details/view-svipsdetails/view-svipsdetails.component';
import { UserDetailsComponent } from './Pages/UserManagement/user-details/user-details.component';
import { ArcGISMapComponent } from './Pages/View_Details/arc-gismap/arc-gismap.component';

// export function ConfigLoader(configService: ConfigService) {  
//   return () => configService.load(environment.Menu); 
// }

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
    SurveyDocumentsComponent,
    GazetteDetailsComponent,
    VillageDetailsComponent,
    CrossingDetailsComponent,
    TerminalsDetailsComponent,
    AdhocPaymentDetailsComponent,
    ViewVillageDetailsComponent,
    SurveyDetailsComponent,
    CropDetailsComponent,
    TreeDetailsComponent,
    OwnerDetailsComponent,
    RevenueFormComponent,
    RestorationDetailsComponent,
    GazetteNoticeDetailsComponent,
    CropRatesComponent,
    LandRatesComponent,
    ViewCrossingDetailsComponent,
    ChildViewCrossingComponent,
    ViewAlignmentReportsComponent,
    ViewProjectReportsComponent,
    ViewAwardReportsComponent,
    ViewSurveyTabsComponent,
    ViewLandDetailsComponent,
    ViewTreeDetailsComponent,
    ViewCropDetailsComponent,
    ViewOwnerDetailsComponent,
    ViewCompensationDetailsComponent,
    ViewRevenueFormsComponent,
    ViewRestorationComponent,
    LAQPermanentComponent,
    AddAdhocdetailsComponent,
    ProjectPageComponent,
    CAInfoComponent,
    RegionDetailsComponent,
    ViewGazetteComponent,
    CompensationComponent,
    ViewMapComponent,
    ConfigurationComponent,
    LegalDocumentsComponent,
    FarmerNocDetailsComponent,
    ViewFarmerNocComponent,
    SOMappingComponent,
    SVIPSDetailsComponent,
    ViewSVIPSDetailsComponent,
    UserDetailsComponent,
    ArcGISMapComponent,
    
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
    BreadcrumbModule,
    NgSelectModule,
    HttpClientModule,
    AlertsModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      focusButton: 'confirm',
    }),
    NgMultiSelectDropDownModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [DialogService,NgbActiveModal,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
