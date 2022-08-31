import { CommonModule } from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { FiltersComponent } from '../app/Pages/filters/filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule,        
    ],
    declarations: [FiltersComponent],
    exports: [FiltersComponent],
    schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA], /// Added for the form validations.
})

export class SharedModule {
}