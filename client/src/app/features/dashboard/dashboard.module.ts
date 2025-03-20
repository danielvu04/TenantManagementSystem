import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { TenantDashboardComponent } from './tenant-dashboard/tenant-dashboard.component';
import { LandlordDashboardComponent } from './landlord-dashboard/landlord-dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HomeDashboardComponent,
    TenantDashboardComponent,
    LandlordDashboardComponent
  ]
})
export class DashboardModule { }
