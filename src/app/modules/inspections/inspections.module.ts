import { DialogModule } from './../dialogs/dialog.module';
import { InspectionQualityRequirementComponent } from './components/inspection-quality-requirement/inspection-quality-requirement.component';
import { InspectionRunPageComponent } from './components/inspection-run-page/inspection-run-page.component';
import { InspectionPanelDetailComponent } from './components/inspection-panel-detail/inspection-panel-detail.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InspectionExpansionPanelComponent } from './components/inspection-expansion-panel/inspection-expansion-panel.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { InspectionPageComponent } from './components/inspection-page/inspection-page.component';
import { NgModule } from '@angular/core';
import { InspectionsContainerComponent } from './container/inspections-container.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule, MatButtonModule, MatListModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatSelectModule, MatExpansionModule, MatCardModule, MatDialogModule, MatSlideToggleModule, MatTooltipModule, MatTableModule, MatRadioModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: InspectionsContainerComponent,
    children: [
      {
        path: '',
        component: InspectionPageComponent
      },
      {
        path: 'run-template',
        component: InspectionRunPageComponent
      }
    ]
  }
];

const materialModules = [
  MatTabsModule,
  MatButtonModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatButtonModule,
  MatExpansionModule,
  DragDropModule,
  MatCardModule,
  MatMenuModule,
  MatTabsModule,
  MatButtonModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatTableModule,
  MatRadioModule
];
const primeNgModules = [];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DialogModule,
    ...materialModules,
    ...primeNgModules,
    RouterModule.forChild(routes)
  ],
  exports: [],
  declarations: [
    InspectionsContainerComponent,
    InspectionPageComponent,
    InspectionExpansionPanelComponent,
    InspectionPanelDetailComponent,
    InspectionRunPageComponent,
    InspectionQualityRequirementComponent
  ],
  providers: [],
})
export class InspectionModule { }
