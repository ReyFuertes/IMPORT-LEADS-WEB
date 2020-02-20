import { UsersContainerComponent } from './container/users-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: UsersContainerComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [UsersContainerComponent],
  providers: [],
})
export class UsersModule { }
