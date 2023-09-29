import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AlignmentTestRoutingModule} from './alignmentsheettest-routing.module';
import {AlignmentsheettestComponent} from './alignmentsheettest.component';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../SharedModule';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    
    AlignmentTestRoutingModule,
    FormsModule,ReactiveFormsModule ,
    MatTableModule,
    
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    //below modules are there in parent file
    //SharedModule
    //BrowserModule, 
    //BrowserAnimationsModule,
    
    
  ],
  declarations: [AlignmentsheettestComponent],
  schemas :[CUSTOM_ELEMENTS_SCHEMA] 
})
export class AlignmentTestModule { }