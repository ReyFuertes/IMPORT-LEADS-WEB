import { NgModule } from '@angular/core';
import { InspectionsContainerComponent } from './container/inspections-container.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: InspectionsContainerComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [InspectionsContainerComponent],
  providers: [],
})
export class InspectionModule { }
