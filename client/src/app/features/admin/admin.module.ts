import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PropertyManagementComponent } from './property-management/property-management.component';
import { TenantManagementComponent } from './tenant-management/tenant-management.component';
import { MaintenanceManagementComponent } from './maintenance-management/maintenance-management.component';
import { PaymentManagementComponent } from './payment-management/payment-management.component';

@NgModule({
  declarations: [
    // No standalone components should be declared here
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    // Import standalone components here
    AdminDashboardComponent,
    PropertyManagementComponent,
    TenantManagementComponent,
    MaintenanceManagementComponent,
    PaymentManagementComponent
  ]
})
export class AdminModule { } 