import { UsersContainerComponent } from './container/users-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogModule } from './../dialogs/dialog.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { UserOverviewPageComponent } from './components/user-overview-page/user-overview-page.component';
import { UserExpansionPanelComponent } from './components/user-expansion-panel/user-expansion-panel.component';
import { MatIconModule, MatTooltipModule, MatButtonToggleModule, MatListModule, MatFormFieldModule, MatInputModule, MatBadgeModule, MatMenuModule, MatSelectModule, MatButtonModule, MatAutocompleteModule, MatExpansionModule, MatCardModule, MatStepperModule, MatTabsModule, MatDialogModule, MatSlideToggleModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: UsersContainerComponent,
    children: [
      {
        path: '',
        component: UserOverviewPageComponent
      }
    ]
  }
];

const primeNgModules = [
  InputSwitchModule
];

const materialModules = [
  MatIconModule,
  MatTooltipModule,
  MatButtonToggleModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatBadgeModule,
  MatMenuModule,
  MatSelectModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatExpansionModule,
  DragDropModule,
  MatCardModule,
  MatMenuModule,
  MatStepperModule,
  MatTabsModule,
  MatButtonModule,
  MatDialogModule,
  MatSlideToggleModule
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ...primeNgModules,
    ...materialModules,
    DialogModule,
    RouterModule.forChild(routes)
  ],
  exports: [],
  declarations: [
    UsersContainerComponent,
    UserOverviewPageComponent,
    UserExpansionPanelComponent
  ],
  providers: [],
})
export class UsersModule { }
