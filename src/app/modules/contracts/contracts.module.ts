import { ContractCategoryEffects } from './store/effects/category.effects';
import { ContractCategoryService } from './services/category.service';
import { ContractProductCategoryTableComponent } from './components/contract-product-category-table/contract-product-category-table.component';
import { ProductsEffects } from './../products/store/products.effects';
import { ContractProductsEffects } from './store/effects/products.effects';
import { ContractProductService } from './services/products.service';
import { ImagesService } from './../../services/images.service';
import { UploadService } from './../../services/upload.service';
import { ContractsEffects } from './store/effects/contracts.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ContractsService } from './services/contracts.service';
import { ContractProductCategoryComponent } from './components/contract-product-category/contract-product-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContractRightContentComponent } from './components/contract-right-content/contract-right-content.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContractExpansionPanelComponent } from './components/contract-expansion-panel/contract-expansion-panel.component';
import { DialogModule } from './../dialogs/dialog.module';
import { ContractAddComponent } from './components/contract-add/contract-add.component';
import { ContractDetailProductsComponent } from './components/contract-detail-products/contract-detail-products.component';
import { ContractOverviewPageComponent } from './components/contract-overview-page/contract-overview-page.component';
import { ContractDetailPageComponent } from './components/contract-detail-page/contract-detail-page.component';
import { ContractCardMilestoneComponent } from './components/contract-card-milestone/contract-card-milestone.component';
import { ContractCardComponent } from './components/contract-card/contract-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContractsContainerComponent } from './container/contracts-container.component';
import { CommonModule } from '@angular/common';
import {
  MatIconModule, MatCheckboxModule, MatCardModule, MatMenuModule, MatStepperModule, MatTabsModule, MatButtonModule, MatDialogModule, MatListModule, MatFormFieldModule, MatInputModule, MatBadgeModule, MatSelectModule, MatAutocompleteModule, MatExpansionModule, MatSlideToggleModule,
  MatTableModule
} from '@angular/material';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ContractProductCategoryTitleComponent } from './components/contract-product-category-title/contract-product-category-title.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { reducers } from './store/reducers';

const routes: Routes = [
  {
    path: '',
    component: ContractsContainerComponent,
    children: [
      {
        path: '',
        component: ContractOverviewPageComponent
      },
      {
        path: ':id/detail',
        component: ContractDetailPageComponent
      }
    ]
  }
];

const primeNgModules = [
  SidebarModule,
  InputSwitchModule,
  ConfirmDialogModule,
  OverlayPanelModule
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
  MatCheckboxModule,
  MatTooltipModule,
  ScrollingModule,
  MatTableModule
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
    StoreModule.forFeature('contractsModule', reducers),
    EffectsModule.forFeature([ContractsEffects, ContractProductsEffects, ProductsEffects, ContractCategoryEffects])
  ],
  exports: [],
  declarations: [
    ContractsContainerComponent,
    ContractCardComponent,
    ContractCardMilestoneComponent,
    ContractDetailPageComponent,
    ContractOverviewPageComponent,
    ContractDetailProductsComponent,
    ContractAddComponent,
    ContractExpansionPanelComponent,
    ContractRightContentComponent,
    ContractProductCategoryComponent,
    ContractProductCategoryTitleComponent,
    ContractProductCategoryTableComponent
  ],
  providers: [
    ConfirmationService,
    ContractsService,
    UploadService,
    ImagesService,
    ContractProductService,
    ContractCategoryService
  ],
})
export class ContractsModule { }
