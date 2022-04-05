import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AuthGuard } from './dash-board/auth.gurad';
import { MasterDetailsComponent } from './Pages/master-details/master-details.component';
import { GazetteDetailsComponent } from 'src/app/Pages/Survey_Details/gazette-details/gazette-details.component';
import { SurveyDocumentsComponent } from './Pages/Survey_Details/survey-documents/survey-documents.component';
import { VillageDetailsComponent } from './Pages/Survey_Details/village-details/village-details.component';
import { CrossingDetailsComponent } from './Pages/Survey_Details/crossing-details/crossing-details.component';
import { TerminalsDetailsComponent } from './Pages/Survey_Details/terminals-details/terminals-details.component';
import { AdhocPaymentDetailsComponent } from './Pages/Survey_Details/adhoc-payment-details/adhoc-payment-details.component';
import { ViewVillageDetailsComponent } from './Pages/View_Details/view-village-details/view-village-details.component';
import { TestLoginComponent } from './test-login/test-login.component';
import { SurveyDetailsComponent } from './Pages/Survey_Details/survey-details/survey-details.component';
import { CropRatesComponent } from './Pages/Survey_Details/crop-rates/crop-rates.component';
import { LandRatesComponent } from './Pages/Survey_Details/land-rates/land-rates.component';
import { ViewCrossingDetailsComponent } from './Pages/View_Details/view-crossing-details/view-crossing-details.component';
import { ViewAlignmentReportsComponent } from './Pages/View_Details/view-alignment-reports/view-alignment-reports.component';
import { ViewProjectReportsComponent } from './Pages/View_Details/view-project-reports/view-project-reports.component';
import { ViewAwardReportsComponent } from './Pages/View_Details/view-award-reports/view-award-reports.component';
import { ViewSurveyTabsComponent } from './Pages/View_Details/view-survey-tabs/view-survey-tabs.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
    { path: '' , redirectTo: '/login', pathMatch: 'full'},
    // {path: 'login', component: TestLoginComponent},
    // { path: '' , redirectTo: '/login', pathMatch: 'full'},
    {path: 'dashboard', component: DashBoardComponent , canActivate:[AuthGuard], 
     data: { breadcrumb: 'Home'},
    children: [
      {path: 'MasterDetails', component: MasterDetailsComponent,canActivate:[AuthGuard], data: { 
        breadcrumb: 'Project Management / MasterDetails'}},
      
      /**Add-Edit details section components */
      {path: 'VillageDetails', component: VillageDetailsComponent,canActivate:[AuthGuard], data: { breadcrumb: 'Survey Details / Village Details'}},
      {path: 'GazetteDetails', component: GazetteDetailsComponent,canActivate:[AuthGuard], data: { breadcrumb: 'Survey Details / Gazette Details'}},
      {path: 'CrossingDetails', component: CrossingDetailsComponent,canActivate:[AuthGuard], data: { breadcrumb: 'Survey Details / Crossing Details'}},
      {path: 'AGI_Terminals', component: TerminalsDetailsComponent,canActivate:[AuthGuard], data: { breadcrumb: ' Survey Details / AGI/Terminals Details'}},
      {path: 'SurveyDocuments', component: SurveyDocumentsComponent,canActivate:[AuthGuard], data: { breadcrumb: 'Survey Details / Survey-Documents'}},
      {path: 'Adhoc_Payment', component: AdhocPaymentDetailsComponent,canActivate:[AuthGuard], data: { breadcrumb: ' Survey Details / Adhoc Payment Details'}},
      {path: 'SurveyDetails', component: SurveyDetailsComponent,canActivate:[AuthGuard], data: { breadcrumb: ' Survey Details / Survey Number'}},
      {path: 'CropRates', component: CropRatesComponent,canActivate:[AuthGuard], data: { breadcrumb: 'Survey Details / Crop Rates'}},
      {path: 'LandRates', component: LandRatesComponent, canActivate:[AuthGuard], data: { breadcrumb: 'Survey Details / Crop Rates'}},
      /**View details section components */
      {path: 'VeiwVillageDetails', component: ViewVillageDetailsComponent, canActivate:[AuthGuard], data: { breadcrumb: 'Survey Analysis / Village Details'}},
      {path: 'ViewCrossingDetails', component: ViewCrossingDetailsComponent, canActivate:[AuthGuard], data: { breadcrumb: 'Survey Analysis / View Crossing Details'}},
      {path: 'ViewAlignmentReports', component: ViewAlignmentReportsComponent, canActivate:[AuthGuard], data: { breadcrumb: 'Survey Analysis / View Alignment Reports'}},
      {path: 'ViewProjectReports', component: ViewProjectReportsComponent, canActivate:[AuthGuard], data: { breadcrumb: 'Survey Analysis / View Project Reports'}},
      {path: 'ViewAwardReports', component: ViewAwardReportsComponent, canActivate:[AuthGuard], data: { breadcrumb: 'Survey Analysis / View Award Reports'}},
      {path: 'ViewSurveyTabs', component: ViewSurveyTabsComponent, canActivate:[AuthGuard], data: { breadcrumb: 'Survey Analysis /View Survey Details'}},

    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
