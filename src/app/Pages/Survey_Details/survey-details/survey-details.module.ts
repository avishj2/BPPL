import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule ,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../SharedModule';
import { SurveyDetailsRoutingModule } from './survey-details-routing.module';
import { SurveyDetailsComponent } from './survey-details.component';

import { CropDetailsComponent } from './crop-details/crop-details.component';
import { TreeDetailsComponent } from './tree-details/tree-details.component';
import { OwnerDetailsComponent } from './owner-details/owner-details.component';
import { RevenueFormComponent } from './revenue-form/revenue-form.component';
import { RestorationDetailsComponent } from './restoration-details/restoration-details.component';
import { GazetteNoticeDetailsComponent } from './gazette-notice-details/gazette-notice-details.component';
import { LandDetailsComponent } from './land-details/land-details.component';
import { CompensationComponent } from './compensation/compensation.component';
import { FarmerNocDetailsComponent } from './farmer-noc-details/farmer-noc-details.component';


@NgModule({
  imports: [
    CommonModule,
    SurveyDetailsRoutingModule,
    FormsModule,ReactiveFormsModule ,
    NgbModule,
    DataTablesModule,
    NgSelectModule,
    SharedModule
  ],
  declarations: [
    SurveyDetailsComponent,
    CropDetailsComponent,
    TreeDetailsComponent,
    OwnerDetailsComponent,
    RevenueFormComponent,
    RestorationDetailsComponent,
    GazetteNoticeDetailsComponent,
    LandDetailsComponent,
    CompensationComponent,
    FarmerNocDetailsComponent
],

})
export class SurveyDetailsModule { }