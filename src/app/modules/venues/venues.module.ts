import { VenuesContainerComponent } from './container/venues-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: VenuesContainerComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [VenuesContainerComponent],
  providers: [],
})
export class VenuesModule { }
