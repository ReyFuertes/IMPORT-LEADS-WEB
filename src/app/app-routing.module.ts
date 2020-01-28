import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    children: [
      { path: 'contracts', loadChildren: () => import('./modules/contracts/contracts.module').then(m => m.ContractsModule) },
      { path: 'inspection-insights', loadChildren: () => import('./modules/inspection-insights/inspection-insights.module').then(m => m.InspectionInsightsModule) },
      { path: 'inspections', loadChildren: () => import('./modules/inspections/inspections.module').then(m => m.InspectionModule) },
      { path: 'performance-insights', loadChildren: () => import('./modules/performance-insights/performance-insights.module').then(m => m.PerformanceInsightsModule) },
      { path: 'tags', loadChildren: () => import('./modules/tags/tags.module').then(m => m.TagsModule) },
      { path: 'templates', loadChildren: () => import('./modules/templates/templates.module').then(m => m.TemplatesModule) },
      { path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule) },
      { path: 'venues', loadChildren: () => import('./modules/venues/venues.module').then(m => m.VenuesModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
