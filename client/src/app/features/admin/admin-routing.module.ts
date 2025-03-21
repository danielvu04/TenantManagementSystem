import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PropertyManagementComponent } from './property-management/property-management.component';
import { TenantManagementComponent } from './tenant-management/tenant-management.component';
import { MaintenanceManagementComponent } from './maintenance-management/maintenance-management.component';
import { PaymentManagementComponent } from './payment-management/payment-management.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: AdminDashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'properties', 
    component: PropertyManagementComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'tenants', 
    component: TenantManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'maintenance',
    component: MaintenanceManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payments',
    component: PaymentManagementComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { } 