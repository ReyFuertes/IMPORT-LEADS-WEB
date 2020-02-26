import { InspectionCommentDialogComponent } from './components/inspection-comments/inspection-comments-dialog.component';
import { BriefDialogComponent } from './components/brief/brief-dialog.component';
import { AQLDialogComponent } from './components/aql/aql-dialog.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContractAddDialogComponent } from './components/contracts/contract-add-dialog.component';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatButtonModule, MatListModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { VenuesAddDialogComponent } from './components/venues/venues-add-dialog.component';

const dialogComponents = [
  ContractAddDialogComponent,
  AQLDialogComponent,
  BriefDialogComponent,
  InspectionCommentDialogComponent,
  VenuesAddDialogComponent
];

const materialModules = [
  MatButtonModule,
  MatDialogModule,
  MatListModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ...materialModules,
    SharedModule,
    FlexLayoutModule
  ],
  exports: [...dialogComponents],
  declarations: [...dialogComponents],
  entryComponents: [...dialogComponents],
  providers: [],
})
export class DialogModule { }
