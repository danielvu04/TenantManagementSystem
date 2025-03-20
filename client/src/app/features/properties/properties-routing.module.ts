import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { PropertyFormComponent } from './property-form/property-form.component';

const routes: Routes = [
  { path: '', component: PropertyListComponent },
  { path: 'new', component: PropertyFormComponent },
  { path: ':id', component: PropertyDetailComponent },
  { path: ':id/edit', component: PropertyFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertiesRoutingModule { }
