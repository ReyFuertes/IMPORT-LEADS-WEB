import { TagsEffects } from './store/tags.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TagsService } from './tags.service';
import { TagExpansionListComponent } from './components/tag-expansion-list/tag-expansion-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatBadgeModule, MatMenuModule, MatSelectModule, MatButtonModule, MatAutocompleteModule, MatExpansionModule, MatCardModule, MatStepperModule, MatTabsModule, MatDialogModule, MatSlideToggleModule, MatTooltipModule } from '@angular/material';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from './../dialogs/dialog.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TagOverviewPageComponent } from './components/tag-overview-page/tag-overview-page.component';
import { TagExpansionPanelComponent } from './components/tag-expansion-panel/tag-expansion-panel.component';
import { TagsContainerComponent } from './container/tags-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagsReducer } from './store/tags.reducer';

const routes: Routes = [
  {
    path: '',
    component: TagsContainerComponent,
    children: [
      {
        path: '',
        component: TagOverviewPageComponent
      }
    ]
  }
];

const primeNgModules = [
  InputSwitchModule
];

const materialModules = [
  MatIconModule,
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
  MatSlideToggleModule,
  MatTooltipModule
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
    RouterModule.forChild(routes),
    StoreModule.forFeature('tag', TagsReducer),
    EffectsModule.forFeature([TagsEffects])
  ],
  exports: [],
  declarations: [
    TagsContainerComponent,
    TagExpansionPanelComponent,
    TagOverviewPageComponent,
    TagExpansionListComponent
  ],
  providers: [
    TagsService
  ],
})
export class TagsModule { }
