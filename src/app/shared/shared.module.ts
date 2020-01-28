import { SortComponent } from './components/sort/sort.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TopNavComponent } from './components/topnav/topnav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { MatListModule, MatFormFieldModule, MatInputModule, MatBadgeModule, MatMenuModule, MatSelectModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const materialModules = [
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatBadgeModule,
  MatMenuModule,
  MatSelectModule
];

const sharedComponents = [
  SidebarComponent,
  TopNavComponent,
  SortComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ...materialModules
  ],
  exports: [...sharedComponents],
  declarations: [...sharedComponents],
  providers: [],
})
export class SharedModule { }
