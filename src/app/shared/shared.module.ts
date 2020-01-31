import { DragDropModule } from '@angular/cdk/drag-drop';
import { TextareaComponent } from './components/textarea/textarea.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { InputSelectComponent } from './components/input-select/input-select.component';
import { PillComponent } from './components/pill/pill.component';
import { SortComponent } from './components/sort/sort.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TopNavComponent } from './components/topnav/topnav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { MatListModule, MatFormFieldModule, MatInputModule, MatBadgeModule, MatMenuModule, MatSelectModule, MatButtonModule, MatAutocompleteModule, MatExpansionModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const materialModules = [
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatBadgeModule,
  MatMenuModule,
  MatSelectModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatExpansionModule,
  DragDropModule
];

const sharedComponents = [
  SidebarComponent,
  TopNavComponent,
  SortComponent,
  PillComponent,
  InputSelectComponent,
  InputComponent,
  ButtonComponent,
  ExpansionPanelComponent,
  TextareaComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ...materialModules,
    RouterModule
  ],
  exports: [...sharedComponents],
  declarations: [...sharedComponents],
  providers: [],
})
export class SharedModule { }
