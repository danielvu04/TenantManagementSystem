import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceListComponent } from './maintenance-list/maintenance-list.component';
import { MaintenanceDetailComponent } from './maintenance-detail/maintenance-detail.component';
import { MaintenanceFormComponent } from './maintenance-form/maintenance-form.component';

const routes: Routes = [
  { path: '', component: MaintenanceListComponent },
  { path: 'new', component: MaintenanceFormComponent },
  { path: ':id', component: MaintenanceDetailComponent },
  { path: ':id/edit', component: MaintenanceFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
