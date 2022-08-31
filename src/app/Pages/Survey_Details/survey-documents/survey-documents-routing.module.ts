import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SurveyDocumentsComponent } from './survey-documents.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyDocumentsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyDocumentsRoutingModule { }