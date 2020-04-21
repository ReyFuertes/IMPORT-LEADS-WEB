import { ProductsSubListComponent } from './components/products-sub-list/products-sub-list.component';
import { ProductListComponent } from './components/products-list/product-list.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ProductsContainerComponent } from './container/products-container.component';
import { ImagesService } from './../../services/images.service';
import { UploadService } from './../../services/upload.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogModule } from './../dialogs/dialog.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatCheckboxModule, MatCardModule, MatMenuModule, MatStepperModule, MatTabsModule, MatButtonModule, MatDialogModule, MatListModule, MatFormFieldModule, MatInputModule, MatBadgeModule, MatSelectModule, MatAutocompleteModule, MatExpansionModule, MatSlideToggleModule } from '@angular/material';
import { ConfirmDialogModule } from 'primeng/confirmdialog';;
import { SidebarModule } from 'primeng/sidebar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  {
    path: '',
    component: ProductsContainerComponent,
    children: [
      {
        path: '',
        component: ProductsPageComponent
      },
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
    // StoreModule.forFeature('product', reducers),
    // EffectsModule.forFeature([ContractsEffects, ProductsEffects])
  ],
  exports: [],
  declarations: [
    ProductsContainerComponent,
    ProductsPageComponent,
    ProductListComponent,
    ProductsSubListComponent
  ],
  providers: [
  ],
})
export class ProductsModule { }
