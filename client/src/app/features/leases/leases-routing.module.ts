import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaseListComponent } from './lease-list/lease-list.component';
import { LeaseDetailComponent } from './lease-detail/lease-detail.component';
import { LeaseFormComponent } from './lease-form/lease-form.component';

const routes: Routes = [
  { path: '', component: LeaseListComponent },
  { path: 'new', component: LeaseFormComponent },
  { path: ':id', component: LeaseDetailComponent },
  { path: ':id/edit', component: LeaseFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeasesRoutingModule { }
