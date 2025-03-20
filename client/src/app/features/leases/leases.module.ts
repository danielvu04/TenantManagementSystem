import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeasesRoutingModule } from './leases-routing.module';
import { LeaseListComponent } from './lease-list/lease-list.component';
import { LeaseDetailComponent } from './lease-detail/lease-detail.component';
import { LeaseFormComponent } from './lease-form/lease-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    LeasesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LeaseListComponent,
    LeaseDetailComponent,
    LeaseFormComponent
  ]
})
export class LeasesModule { }
