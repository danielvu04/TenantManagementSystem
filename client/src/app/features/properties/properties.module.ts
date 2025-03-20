import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { PropertyFormComponent } from './property-form/property-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PropertyListComponent,
    PropertyDetailComponent,
    PropertyFormComponent
  ]
})
export class PropertiesModule { }
