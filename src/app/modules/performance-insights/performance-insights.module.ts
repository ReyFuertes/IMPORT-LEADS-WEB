import { PerformanceInsightsComponent } from './container/performance-insights-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: PerformanceInsightsComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [PerformanceInsightsComponent],
  providers: [],
})
export class PerformanceInsightsModule { }
