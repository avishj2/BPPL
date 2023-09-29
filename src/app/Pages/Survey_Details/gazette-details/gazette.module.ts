import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GazetteRoutingModule} from './gazette-routing.module';
import { GazetteDetailsComponent } from './gazette-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    GazetteRoutingModule,
    FormsModule, NgbModule,
  ],
  declarations: [GazetteDetailsComponent]

})
export class GazetteModule { }