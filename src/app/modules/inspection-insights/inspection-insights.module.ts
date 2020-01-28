import { NgModule } from '@angular/core';
import { InspectionInsightsContainerComponent } from './container/inspection-insights-container.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: InspectionInsightsContainerComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [InspectionInsightsContainerComponent],
  providers: [],
})
export class InspectionInsightsModule { }
