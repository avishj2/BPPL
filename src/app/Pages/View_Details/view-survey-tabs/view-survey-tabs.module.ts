import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../SharedModule';
import { ViewSurveyRoutingModule } from './view-survey-tabs-routing.module';
import { ViewSurveyTabsComponent } from './view-survey-tabs.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ViewFarmerNocComponent } from './view-farmer-noc/view-farmer-noc.component';
import { ViewLandDetailsComponent } from './view-land-details/view-land-details.component';
import { ViewTreeDetailsComponent } from './view-tree-details/view-tree-details.component';
import { ViewCropDetailsComponent } from './view-crop-details/view-crop-details.component';
import { ViewOwnerDetailsComponent } from './view-owner-details/view-owner-details.component';
import { ViewCompensationDetailsComponent } from './view-compensation-details/view-compensation-details.component';
import { ViewRevenueFormsComponent } from './view-revenue-forms/view-revenue-forms.component';
import { ViewRestorationComponent } from './view-restoration/view-restoration.component';

@NgModule({
  imports: [
    CommonModule,
    ViewSurveyRoutingModule,
    FormsModule,ReactiveFormsModule ,
    SharedModule,
    NgbModule,
    DataTablesModule,
    NgSelectModule,
  ],
  declarations: [ViewSurveyTabsComponent,
    ViewFarmerNocComponent,
    ViewLandDetailsComponent,
    ViewTreeDetailsComponent,
    ViewCropDetailsComponent,
    ViewOwnerDetailsComponent,
    ViewCompensationDetailsComponent,
    ViewRevenueFormsComponent,
    ViewRestorationComponent,
  ],

})
export class ViewSurveyTabsModule { }