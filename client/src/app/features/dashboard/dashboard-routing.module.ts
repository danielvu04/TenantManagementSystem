import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { TenantDashboardComponent } from './tenant-dashboard/tenant-dashboard.component';
import { LandlordDashboardComponent } from './landlord-dashboard/landlord-dashboard.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeDashboardComponent
  },
  {
    path: 'tenant',
    component: TenantDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['tenant'] }
  },
  {
    path: 'landlord',
    component: LandlordDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['landlord'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
