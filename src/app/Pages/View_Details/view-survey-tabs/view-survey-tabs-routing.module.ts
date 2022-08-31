import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewSurveyTabsComponent } from './view-survey-tabs.component';

const routes: Routes = [
  {
    path: '',
    component: ViewSurveyTabsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewSurveyRoutingModule { }