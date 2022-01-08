import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule ,NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngb-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BreadCrumbComponent } from 'src/app/dash-board/breadcrumb.component';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LoginComponent } from './login/login.component';
import { DropdownsComponent } from './Pages/dropdowns/dropdowns.component';
import { TwoDigitDecimaNumberDirective } from './Pages/dropdowns/two-digit-decima-number.directive';
import { MasterDetailsComponent } from './Pages/master-details/master-details.component';
import { LandDetailsComponent } from './Pages/land-details/land-details.component';
import { PreEngineeringComponent } from './Pages/Add_Edit_Details/pre-engineering/pre-engineering.component';
import { GazetteDetailsComponent } from './Pages/Add_Edit_Details/gazette-details/gazette-details.component';


@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    BreadCrumbComponent,
    LoginComponent,
    DropdownsComponent,
    TwoDigitDecimaNumberDirective,
    MasterDetailsComponent,
    LandDetailsComponent,
    PreEngineeringComponent,
    GazetteDetailsComponent
  ],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA], /// Added for the form validations.
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModalModule,
    NgbModule,
    DataTablesModule,
    BreadcrumbModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
