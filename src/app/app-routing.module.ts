import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
    { path: '' , redirectTo: '/login', pathMatch: 'full'},
    {
      path: 'dashboard',
      loadChildren: () => import('./dash-board/dash-board.module').then(x => x.DashBoardModule)
    }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: "ignore"
    //useHash: true,
    ,
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
