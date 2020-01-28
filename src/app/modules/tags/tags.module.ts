import { TagsContainerComponent } from './container/tags-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: TagsContainerComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [TagsContainerComponent],
  providers: [],
})
export class TagsModule { }
