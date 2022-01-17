import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AuthGuard } from './dash-board/auth.gurad';
import { DropdownsComponent } from './Pages/dropdowns/dropdowns.component';
import { MasterDetailsComponent } from './Pages/master-details/master-details.component';
import { GazetteDetailsComponent } from './Pages/Add_Edit_Details/gazette-details/gazette-details.component';
import { PreEngineeringComponent } from './Pages/Add_Edit_Details/pre-engineering/pre-engineering.component';
import { VillageDetailsComponent } from './Pages/Add_Edit_Details/village-details/village-details.component';
import { CrossingDetailsComponent } from './Pages/Add_Edit_Details/crossing-details/crossing-details.component';
import { TerminalsDetailsComponent } from './Pages/Add_Edit_Details/terminals-details/terminals-details.component';
import { AdhocPaymentDetailsComponent } from './Pages/Add_Edit_Details/adhoc-payment-details/adhoc-payment-details.component';
import { ViewVillageDetailsComponent } from './Pages/View_Details/view-village-details/view-village-details.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
    { path: '' , redirectTo: '/login', pathMatch: 'full'},
    {path: 'dashboard', component: DashBoardComponent , canActivate:[AuthGuard], 
     data: { breadcrumb: 'Home'},
    children: [
      {path: 'MasterDetails', component: MasterDetailsComponent,canActivate:[AuthGuard], data: { 
        breadcrumb: 'Project Management / MasterDetails'}},
      
      /**Add-Edit details section components */
      {path: 'VillageDetails', component: VillageDetailsComponent,canActivate:[AuthGuard], data: { breadcrumb: ' Add-Edit Details / Village Details'}},
      {path: 'CrossingDetails', component: CrossingDetailsComponent,canActivate:[AuthGuard], data: { breadcrumb: ' Add-Edit Details / Crossing Details'}},
      {path: 'AGI_Terminals', component: TerminalsDetailsComponent,canActivate:[AuthGuard], data: { breadcrumb: ' Add-Edit Details / AGI/Terminals Details'}},
      {path: 'Adhoc_Payment', component: AdhocPaymentDetailsComponent,canActivate:[AuthGuard], data: { breadcrumb: ' Add-Edit Details / Adhoc Payment Details'}},
      {path: 'GazetteDetails', component: GazetteDetailsComponent,canActivate:[AuthGuard], data: { breadcrumb: ' Add-Edit Details / Gazette Details'}},
      {path: 'PreEngineering', component: PreEngineeringComponent,canActivate:[AuthGuard], data: { breadcrumb: 'Add-Edit Details / Pre-Engineering'}},
       /**View details section components */
       {path: 'VeiwVillageDetails', component: ViewVillageDetailsComponent, canActivate:[AuthGuard], data: { breadcrumb: 'View Details / Village Details'}},

    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
