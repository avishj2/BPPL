import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AuthGuard } from './dash-board/auth.gurad';
import { DropdownsComponent } from './Pages/dropdowns/dropdowns.component';
import { MasterDetailsComponent } from './Pages/master-details/master-details.component';
import { GazetteDetailsComponent } from './Pages/Add_Edit_Details/gazette-details/gazette-details.component';
import { PreEngineeringComponent } from './Pages/Add_Edit_Details/pre-engineering/pre-engineering.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
    { path: '' , redirectTo: '/login', pathMatch: 'full'},
    {path: 'dashboard', component: DashBoardComponent , canActivate:[AuthGuard], 
     data: { breadcrumb: 'Home'},
    children: [
      {path: 'MasterDetails', component: MasterDetailsComponent,canActivate:[AuthGuard], data: { breadcrumb: 'MasterDetails'}},

      {path: 'GazetteDetails', component: GazetteDetailsComponent,canActivate:[AuthGuard], data: { breadcrumb: ' Gazette Details'}},
      {path: 'PreEngineering', component: PreEngineeringComponent,canActivate:[AuthGuard], data: { breadcrumb: 'Pre-Engineering'}}

    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
