import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';


export const routes: Routes = [
{ path: '', pathMatch: 'full', redirectTo: 'dashboard' },
{ path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
{ path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },


{ path: 'simulation', canActivate: [authGuard], loadComponent: () => import('./features/projects/simulation/simulation.component').then(m => m.SimulationComponent) },


{ path: 'materials', canActivate: [authGuard], loadComponent: () => import('./features/materials/materials-list/materials-list.component').then(m => m.MaterialsListComponent) },
{ path: 'materials/new', canActivate: [authGuard], loadComponent: () => import('./features/materials/materials-form/materials-form.component').then(m => m.MaterialsFormComponent) },
{ path: 'materials/:id', canActivate: [authGuard], loadComponent: () => import('./features/materials/materials-form/materials-form.component').then(m => m.MaterialsFormComponent) },


{ path: 'properties', canActivate: [authGuard], loadComponent: () => import('./features/properties/properties-list/properties-list.component').then(m => m.PropertiesListComponent) },
{ path: 'properties/new', canActivate: [authGuard], loadComponent: () => import('./features/properties/properties-form/properties-form.component').then(m => m.PropertiesFormComponent) },
{ path: 'properties/:id', canActivate: [authGuard], loadComponent: () => import('./features/properties/properties-form/properties-form.component').then(m => m.PropertiesFormComponent) },


{ path: '**', redirectTo: 'dashboard' }
]
