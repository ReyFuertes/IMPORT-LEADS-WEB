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
import { MatCardModule, MatMenuModule, MatStepperModule } from '@angular/material';

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

const materialModules = [
  MatCardModule,
  MatMenuModule,
  MatStepperModule
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    ...materialModules,
    RouterModule.forChild(routes)
  ],
  exports: [],
  declarations: [
    ContractsContainerComponent,
    ContractCardComponent,
    ContractCardMilestoneComponent,
    ContractDetailPageComponent,
    ContractOverviewPageComponent,
    ContractDetailProductsComponent
  ],
  providers: [],
})
export class ContractsModule { }
