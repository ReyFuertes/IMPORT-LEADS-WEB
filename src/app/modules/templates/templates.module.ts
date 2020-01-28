import { TemplatesContainerComponent } from './container/templates-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: TemplatesContainerComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [TemplatesContainerComponent],
  providers: [],
})
export class TemplatesModule { }
