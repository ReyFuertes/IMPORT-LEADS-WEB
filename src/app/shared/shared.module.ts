import { PopoverMenuComponent } from './components/popover-menu/popover-menu.component';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { DropdownSelectComponent } from './components/dropdown-select/dropdown-select.component';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { UploadBoxComponent } from './components/upload-box/upload-box.component';
import { QuillEditorComponent } from './components/quill-editor/quill-editor.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TextareaComponent } from './components/textarea/textarea.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { InputSelectComponent } from './components/input-select/input-select.component';
import { PillComponent } from './components/pill/pill.component';
import { SortComponent } from './components/sort/sort.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TopNavComponent } from './components/topnav/topnav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { MatListModule, MatFormFieldModule, MatInputModule, MatBadgeModule, MatMenuModule, MatSelectModule, MatButtonModule, MatAutocompleteModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';

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
  DragDropModule,
  MatDatepickerModule,
  MatNativeDateModule
];

const primeNgModules = [
  AccordionModule,
  CalendarModule
];

const sharedComponents = [
  SidebarComponent,
  TopNavComponent,
  SortComponent,
  PillComponent,
  InputSelectComponent,
  InputComponent,
  ButtonComponent,
  TextareaComponent,
  QuillEditorComponent,
  UploadBoxComponent,
  DropdownSelectComponent,
  DropdownSelectComponent,
  DatepickerComponent,
  PopoverMenuComponent
];

const directives = [
  NumberOnlyDirective
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ...materialModules,
    ...primeNgModules,
    RouterModule,
    QuillModule.forRoot()
  ],
  exports: [...sharedComponents, ...directives],
  declarations: [...sharedComponents, ...directives],
  providers: [],
})
export class SharedModule { }
