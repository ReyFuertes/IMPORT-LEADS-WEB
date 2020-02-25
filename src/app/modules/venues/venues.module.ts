import { InputSwitchModule } from 'primeng/inputswitch';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogModule } from './../dialogs/dialog.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { VenueExpansionListComponent } from './components/venue-expansion-list/venue-expansion-list.component';
import { VenueExpansionPanelComponent } from './components/venue-expansion-panel/venue-expansion-panel.component';
import { VenueOverviewPageComponent } from './components/venue-overview-page/venue-overview-page.component';
import { VenuesContainerComponent } from './container/venues-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule, MatTooltipModule, MatButtonToggleModule, MatListModule, MatFormFieldModule, MatInputModule, MatBadgeModule, MatMenuModule, MatSelectModule, MatButtonModule, MatAutocompleteModule, MatExpansionModule, MatCardModule, MatStepperModule, MatTabsModule, MatDialogModule, MatSlideToggleModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: VenuesContainerComponent,
    children: [
      {
        path: '',
        component: VenueOverviewPageComponent
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
    VenuesContainerComponent,
    VenueOverviewPageComponent,
    VenueExpansionPanelComponent,
    VenueExpansionListComponent
  ],
  providers: [],
})
export class VenuesModule { }
