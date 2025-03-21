import { Routes } from '@angular/router';
import { HomeDashboardComponent } from './features/dashboard/home-dashboard/home-dashboard.component';
import { TenantDashboardComponent } from './features/dashboard/tenant-dashboard/tenant-dashboard.component';
import { LandlordDashboardComponent } from './features/dashboard/landlord-dashboard/landlord-dashboard.component';
import { PropertyListComponent } from './features/properties/property-list/property-list.component';
import { PropertyDetailComponent } from './features/properties/property-detail/property-detail.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeDashboardComponent 
  },
  { 
    path: 'dashboard', 
    children: [
      { 
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full' 
      },
      { 
        path: 'home', 
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
    ]
  },
  {
    path: 'properties',
    children: [
      {
        path: '',
        component: PropertyListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: PropertyDetailComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES) 
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'landlord'] }
  },
  { 
    path: 'leases', 
    loadChildren: () => import('./features/leases/leases.module').then(m => m.LeasesModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'payments', 
    loadChildren: () => import('./features/payments/payments.module').then(m => m.PaymentsModule),
    canActivate: [AuthGuard] 
  },
  { 
    path: 'maintenance', 
    loadChildren: () => import('./features/maintenance/maintenance.module').then(m => m.MaintenanceModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];
