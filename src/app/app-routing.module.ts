import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AuthGuard } from './dash-board/auth.gurad';
import { FiltersComponent } from 'src/app/Pages/filters/filters.component';
import { MasterDetailsComponent } from './Pages/master-details/master-details.component';
import { GazetteDetailsComponent } from 'src/app/Pages/Survey_Details/gazette-details/gazette-details.component';
import { PreEngineeringComponent } from './Pages/Survey_Details/pre-engineering/pre-engineering.component';
import { VillageDetailsComponent } from './Pages/Survey_Details/village-details/village-details.component';
import { CrossingDetailsComponent } from './Pages/Survey_Details/crossing-details/crossing-details.component';
import { TerminalsDetailsComponent } from './Pages/Survey_Details/terminals-details/terminals-details.component';
import { AdhocPaymentDetailsComponent } from './Pages/Survey_Details/adhoc-payment-details/adhoc-payment-details.component';
import { ViewVillageDetailsComponent } from './Pages/View_Details/view-village-details/view-village-details.component';
import { TestLoginComponent } from './test-login/test-login.component';

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
      {path: 'PreEngineering', component: PreEngineeringComponent,canActivate:[AuthGuard], data: { breadcrumb: 'Survey Details / Pre-Engineering'}},
      {path: 'Adhoc_Payment', component: AdhocPaymentDetailsComponent,canActivate:[AuthGuard], data: { breadcrumb: ' Survey Details / Adhoc Payment Details'}},
       /**View details section components */
       {path: 'VeiwVillageDetails', component: ViewVillageDetailsComponent, canActivate:[AuthGuard], data: { breadcrumb: 'Survey Analysis / Village Details'}},

    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
