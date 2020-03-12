import { InspectionRunCommentDialogComponent } from './components/inspection-run-comment/inspection-run-comment-dialog.component';
import { ContractSpecTitleDialogComponent } from './components/contract-spec-title/contract-spec-title-dialog.component';
import { ContractProductSpecDialogComponent } from './components/contract-product-spec/contract-product-spec-dialog.component';
import { InspectionCommentDialogComponent } from './components/inspection-comments/inspection-comments-dialog.component';
import { BriefDialogComponent } from './components/brief/brief-dialog.component';
import { AQLDialogComponent } from './components/aql/aql-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContractAddDialogComponent } from './components/contracts/contract-add-dialog.component';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatButtonModule, MatListModule, MatCheckboxModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { VenuesAddDialogComponent } from './components/venues/venues-add-dialog.component';
import { UserAddDialogComponent } from './components/users/user-add-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContractTemplateDialogComponent } from './components/contract-template/contract-template-dialog.component';
import { ContractSelectDialogComponent } from './components/contract-select/contract-select-dialog.component';
import { TagsDialogComponent } from './components/tags/tags-dialog.component';
import { TagsQuestionDialogComponent } from './components/tags-question/tags-question-dialog.component';

const dialogComponents = [
  ContractAddDialogComponent,
  AQLDialogComponent,
  BriefDialogComponent,
  InspectionCommentDialogComponent,
  VenuesAddDialogComponent,
  UserAddDialogComponent,
  ContractProductSpecDialogComponent,
  ContractSpecTitleDialogComponent,
  InspectionRunCommentDialogComponent,
  ContractTemplateDialogComponent,
  ContractSelectDialogComponent,
  TagsDialogComponent,
  TagsQuestionDialogComponent
];

const materialModules = [
  MatButtonModule,
  MatDialogModule,
  MatListModule,
  MatCheckboxModule,
  DragDropModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
