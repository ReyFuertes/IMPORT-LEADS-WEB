import { AddEditState } from './generic.model';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
export class GenericAddEditComponent<T> {
  public entity: T;
  public form: FormGroup;
  @Input()
  public state: AddEditState;
  constructor() { }
  public save: (entity: T) => Observable<void>;
}
