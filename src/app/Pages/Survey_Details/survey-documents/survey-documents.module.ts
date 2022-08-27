import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {LegalDocumentsComponent } from '../legal-documents/legal-documents.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../SharedModule';
import { SurveyDocumentsRoutingModule } from './survey-documents-routing.module';
import { SurveyDocumentsComponent } from './survey-documents.component';

@NgModule({
  imports: [
    CommonModule,
    SurveyDocumentsRoutingModule,
    FormsModule,ReactiveFormsModule ,
    NgbModule,
    DataTablesModule,
    NgSelectModule,
    SharedModule
  ],
  declarations: [SurveyDocumentsComponent,LegalDocumentsComponent],

})
export class SurveyDocumentsModule { }